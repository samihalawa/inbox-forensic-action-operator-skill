#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'SKILL.md',
  'agents/openai.yaml',
  'references/audit-recipes.md',
  'references/core-evidence-model.md',
  'references/mutation-idempotency.md',
  'references/overlays/opportunity.md',
  'references/adapters/email.md',
  'references/adapters/crm.md',
  'references/adapters/meetings.md',
  'references/adapters/whatsapp.md',
  'references/adapters/forms.md',
  'tests/acceptance-scenarios.md',
  'tests/live-acceptance.md',
];
const supersededFiles = [
  'references/channel-runbooks.md',
  'references/state-and-action-model.md',
  'references/execution-safety.md',
  'references/recovery-and-acceptance-tests.md',
];
const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}
for (const file of supersededFiles) {
  if (existsSync(join(root, file))) errors.push(`Superseded runtime file still exists: ${file}`);
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    if (entry === '.git') continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

const textExtensions = new Set(['.md', '.yaml', '.yml', '.mjs', '.js', '.json']);
const publicTextFiles = walk(root).filter((path) => textExtensions.has(extname(path)));
const relativeName = (path) => path.slice(root.length + 1);
const contents = Object.fromEntries(publicTextFiles.map((path) => [relativeName(path), readFileSync(path, 'utf8')]));
const skill = contents['SKILL.md'] ?? '';

if (!/^---\n[\s\S]*?\n---\n/.test(skill)) errors.push('SKILL.md frontmatter is missing or malformed');
if (!/^name: inbox-forensic-action-operator-skill$/m.test(skill)) errors.push('Unexpected skill name');
if (!/^version: \d+\.\d+\.\d+$/m.test(skill)) errors.push('Version must use semantic versioning');
if (!/^description: This skill should be used /m.test(skill)) errors.push('Description must state when the skill should be used');

const skillWords = skill.trim().split(/\s+/).length;
if (skillWords > 1200) errors.push(`SKILL.md exceeds 1200 words: ${skillWords}`);

const metadata = contents['agents/openai.yaml'] ?? '';
if (!metadata.includes('$inbox-forensic-action-operator-skill')) errors.push('Agent metadata does not invoke the skill by name');
const defaultPrompt = metadata.match(/default_prompt:\s*"([^"]*)"/)?.[1] ?? '';
if (!defaultPrompt) errors.push('Agent metadata default_prompt is missing');
if (defaultPrompt.split(/\s+/).filter(Boolean).length > 40) errors.push('Agent metadata default_prompt exceeds 40 words');

let markdownLinks = 0;
for (const [file, content] of Object.entries(contents)) {
  if (!file.endsWith('.md')) continue;
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    markdownLinks += 1;
    const link = match[1];
    if (/^(?:https?:|#)/.test(link)) continue;
    if (link.startsWith('/') || link.startsWith('~')) {
      errors.push(`${file} uses a non-portable link: ${link}`);
      continue;
    }
    if (!existsSync(resolve(root, dirname(file), link))) errors.push(`Broken relative link in ${file}: ${link}`);
  }
}

const secretPatterns = [
  ['basic-auth URL', /https?:\/\/[^\s/:]+:[^\s@]+@/i],
  ['assigned credential', /\b(?:api[_ -]?key|token|password|secret)\s*[:=]\s*["']?[^\s<>{}\[\]]+/i],
  ['authorization header value', /\bauthorization\s*:\s*(?:basic|bearer)\s+(?!\[REDACTED_SECRET\])["']?[A-Za-z0-9+/_=.-]{8,}/i],
  ['common token prefix', /\b(?:gh[opsu]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{16,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/],
  ['auth or session assignment', /\b[A-Z0-9_]*(?:AUTH|TOKEN|SESSION|COOKIE|PASSWORD|PASS|SECRET|KEY)[A-Z0-9_]*\s*[:=]\s*(?!["']?\[REDACTED_SECRET\])["']?[^\s"'<>]{8,}/],
  ['cookie header value', /\bcookie\s*:\s*(?!\[REDACTED_SECRET\])[^\s<>{}\[\]]{8,}/i],
  ['PEM private key', /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/],
];
for (const [file, content] of Object.entries(contents)) {
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(content)) errors.push(`Possible reusable ${label} found in ${file}`);
  }
}

const fixture = contents['tests/acceptance-scenarios.md'] ?? '';
const header = '| ID | Recipe | Authority | Input | Expected route | Coverage | Expected state | Failure origin | Forbidden promotion | Proof remaining |';
if (!fixture.includes(header)) errors.push('Acceptance scenario table header is missing or malformed');
const rows = fixture.split('\n').filter((line) => line !== header && /^\| [A-Z0-9-]+ \|/.test(line));
const scenarios = rows.map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
const ids = scenarios.map((row) => row[0]);
if (new Set(ids).size !== ids.length) errors.push('Acceptance scenario IDs must be unique');
for (const row of scenarios) {
  if (row.length !== 10 || row.some((cell) => !cell)) errors.push(`Scenario row is incomplete: ${row[0] ?? 'unknown'}`);
}

const requiredScenarioIds = [
  'ROUTE-COVERAGE', 'ROUTE-ENTITY-STATUS', 'ROUTE-ATTENTION', 'ROUTE-DELIVERY', 'ROUTE-RECOVERY',
  'ADAPTER-STOP', 'ADJACENT-WINDOW-FREEZE', 'ADJACENT-WINDOW-MERGE', 'PARTIAL-UNION',
  'DOTENV-NAMED-KEYS', 'MAIL-IDENTITY-BINDING', 'MAIL-CURSORLESS-ENUMERATION', 'MAIL-DRAFT-NOT-SENT',
  'MAIL-SEND-PROOF', 'CLOSE-AUDIT-ALLOWLIST', 'CLOSE-FAILURE-TAXONOMY', 'BROWSER-OF-MANY',
  'BROWSER-AUTH-SEPARATION', 'GOWA-CURRENT-DEVICES', 'GOWA-RAW-JID', 'GOWA-ACTUAL-OFFSET',
  'GOWA-DEFICIT-BACKFILL', 'GOWA-RECENCY-CONTRADICTION', 'GOWA-CROSS-DEVICE-DEDUPE',
  'GOWA-MEDIA-SEMANTICS', 'MEETING-SELF-REPORT', 'MEETING-PROVIDER-PROOF', 'PROVIDER-ALERT',
  'FAILURE-ORIGIN', 'AUDIT-NO-MUTATION', 'AMBIGUOUS-MUTATION', 'LIVE-SEND-CONFIRMATION',
  'EXTERNAL-MUTATION-CONFIRMATION', 'MAIL-HALF-OPEN-DST', 'MAIL-ID-NAMESPACE', 'MAIL-THREAD-CAP',
  'MAIL-BOUNCE-LAYER', 'MEETING-CANCELLATION', 'MEETING-INTERVAL-BINDING', 'ATTACHMENT-GATE',
  'FORM-STATE-LAYERS', 'OPPORTUNITY-NO-INFERENCE', 'CRM-OBJECT-IDENTITY', 'INCIDENT-GROUPING',
  'NUMBER-TYPE-ASOF', 'SUCCESS-FAILURE-ASYMMETRY', 'CHANNEL-ESCALATION', 'SECRET-NONPERSISTENCE',
];
for (const id of requiredScenarioIds) {
  if (!ids.includes(id)) errors.push(`Missing acceptance scenario ID: ${id}`);
}

const coverageValues = new Set(['full', 'partial', 'sampled', 'missing', 'blocked']);
const failureOrigins = new Set(['none', 'skill', 'provider/source', 'route/environment', 'unresolved']);
const recipeValues = new Set(['coverage', 'entity-status', 'attention', 'delivery', 'recovery']);
const authorityValues = new Set(['audit', 'organize', 'draft', 'send', 'execute']);
for (const [id, recipe, authority, , expectedRoute, coverage, expectedState, failureOrigin] of scenarios) {
  if (!recipeValues.has(recipe)) errors.push(`Invalid recipe in ${id}: ${recipe}`);
  if (!authorityValues.has(authority)) errors.push(`Invalid authority in ${id}: ${authority}`);
  if (!coverageValues.has(coverage)) errors.push(`Invalid coverage in ${id}: ${coverage}`);
  if (!failureOrigins.has(failureOrigin)) errors.push(`Invalid failure origin in ${id}: ${failureOrigin}`);
  if (coverage !== 'full' && /\b(?:all|global(?:ly)?|complete coverage|coverage complete|globally complete)\b/i.test(expectedState)) errors.push(`${id} promotes incomplete coverage`);
  const forbiddenAuditOperation = /\b(?:login|reauth(?:enticate|entication)?|oauth(?:-| )?link|connection ensure|(?:connection|workspace) creat(?:e|ion)|default(?:-| )?workspace change|browser(?:-| )?profile creat(?:e|ion)|qr pair(?:ing)?|(?:create|update) draft|send|book|submit|write)\b/i;
  if (authority === 'audit' && forbiddenAuditOperation.test(expectedRoute)) errors.push(`${id} expects a forbidden audit mutation`);
}

const scenarioById = new Map(scenarios.map((row) => [row[0], row]));
const criticalExpectations = [
  ['PARTIAL-UNION', 5, 'partial'],
  ['MAIL-DRAFT-NOT-SENT', 6, 'drafted'],
  ['CLOSE-AUDIT-ALLOWLIST', 5, 'blocked'],
  ['BROWSER-OF-MANY', 5, 'partial'],
  ['GOWA-ACTUAL-OFFSET', 5, 'partial'],
  ['MEETING-SELF-REPORT', 6, 'user_reported_completed'],
  ['PROVIDER-ALERT', 6, 'provider_alert_observed'],
  ['AUDIT-NO-MUTATION', 6, 'no mutation'],
];
for (const [id, column, expected] of criticalExpectations) {
  if (scenarioById.get(id)?.[column] !== expected) errors.push(`${id} must preserve ${expected}`);
}

if (errors.length) {
  console.error('Package validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Package structural validation passed: ${requiredFiles.length} runtime/test files, ${markdownLinks} links, ${scenarios.length} scenarios, ${skillWords} core words`);
