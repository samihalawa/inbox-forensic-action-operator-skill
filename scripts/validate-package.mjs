#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'SKILL.md',
  'AGENTS_positions.md',
  'agents/openai.yaml',
  'references/channel-runbooks.md',
  'references/state-and-action-model.md',
  'references/execution-safety.md',
  'references/recovery-and-acceptance-tests.md',
];

const errors = [];
for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

const files = requiredFiles.filter((file) => existsSync(join(root, file)));
const contents = Object.fromEntries(
  files.map((file) => [file, readFileSync(join(root, file), 'utf8')]),
);
const skill = contents['SKILL.md'] ?? '';
const corpus = Object.values(contents).join('\n');

if (!/^---\n[\s\S]*?\n---\n/.test(skill)) errors.push('SKILL.md frontmatter is missing or malformed');
if (!/^name: inbox-forensic-action-operator-skill$/m.test(skill)) errors.push('Unexpected skill name');
if (!/^version: \d+\.\d+\.\d+$/m.test(skill)) errors.push('Version must use semantic versioning');
if (!/^description: This skill should be used /m.test(skill)) errors.push('Description must state when the skill should be used');

const wordCount = skill.trim().split(/\s+/).length;
if (wordCount > 2800) errors.push(`SKILL.md is too large for progressive disclosure: ${wordCount} words`);

const markdownLinks = [];
for (const [file, content] of Object.entries(contents)) {
  if (!file.endsWith('.md')) continue;
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const link = match[1];
    markdownLinks.push(`${file}:${link}`);
    if (/^(?:https?:|skill:|#)/.test(link)) continue;
    if (link.startsWith('/') || link.startsWith('~')) {
      errors.push(`${file} uses a non-portable link: ${link}`);
      continue;
    }
    if (!existsSync(resolve(root, dirname(file), link))) {
      errors.push(`Broken relative link in ${file}: ${link}`);
    }
  }
}

const privatePatterns = [
  ['/Users path', /\/Users\/[A-Za-z0-9._-]+\//],
  ['email address', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['phone-like number', /(?:\+|\b)\d{10,15}\b/],
  ['UUID or conversation identifier', /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i],
  ['conversation URI', /chatgpt-conversation:\/\/|conversationId\s*[:=]/i],
  ['basic-auth URL', /https?:\/\/[^\s/:]+:[^\s@]+@/i],
  ['assigned credential', /\b(?:api[_ -]?key|token|password|secret)\s*[:=]\s*["']?[^\s<>{}\[\]]+/i],
  ['authorization header value', /\bauthorization\s*:\s*(?:basic|bearer)\s+(?!\[REDACTED_SECRET\])["']?[A-Za-z0-9+/_=.-]{8,}/i],
  ['common token prefix', /\b(?:gh[opsu]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{16,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/],
  ['auth or session assignment', /\b[A-Z0-9_]*(?:AUTH|TOKEN|SESSION|COOKIE|PASSWORD|PASS|SECRET|KEY)[A-Z0-9_]*\s*=\s*(?!["']?\[REDACTED_SECRET\])["']?[^\s"'<>]{8,}/i],
  ['cookie header value', /\bcookie\s*:\s*(?!\[REDACTED_SECRET\])[^\s<>{}\[\]]{8,}/i],
  ['PEM private key', /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/],
];
for (const [label, pattern] of privatePatterns) {
  if (pattern.test(corpus)) errors.push(`Possible private ${label} found in public skill content`);
}

const requiredConcepts = [
  ['coverage vocabulary', 'SKILL.md', /full.*partial.*sampled.*missing.*blocked/s],
  ['event versus sync time', 'references/state-and-action-model.md', /occurred_at.*observed_at/s],
  ['follow-up due', 'references/state-and-action-model.md', /follow-up due/],
  ['idempotency', 'references/execution-safety.md', /Idempotency/],
  ['ambiguous-result recovery', 'references/execution-safety.md', /ambiguous response.*Do not retry immediately.*Re-read the target system.*Retry only when/s],
  ['delayed bounce', 'references/execution-safety.md', /delayed bounce/],
  ['attachment verification', 'references/execution-safety.md', /Attachment Gate/],
  ['same-layer proof', 'references/execution-safety.md', /same-layer/],
  ['live-send confirmation', 'references/execution-safety.md', /explicit final confirmation/],
  ['all-device GOWA discovery', 'references/channel-runbooks.md', /inventory every `logged_in` device before deciding relevance/],
  ['self-generated automation suppression', 'references/state-and-action-model.md', /self-generated automation/],
  ['pre-triage classifier', 'references/state-and-action-model.md', /Actionable_Conversation.*Transactional_Receipt.*System_Alert.*Marketing/s],
  ['success failure asymmetry', 'references/state-and-action-model.md', /success\/failure asymmetry.*success or completion confirmation.*decline, failure/s],
  ['priority not urgency copy', 'references/state-and-action-model.md', /Do not rank on urgency-sounding wording alone.*current user priorities.*deadline proximity/s],
  ['channel escalation ladder', 'references/state-and-action-model.md', /email -> WhatsApp -> phone/],
  ['stale warm cold drafts', 'references/channel-runbooks.md', /stale.*3\+ days.*warm.*cold/s],
  ['expected missing mail', 'references/channel-runbooks.md', /expected verification.*never arrived.*spam\/trash.*provider dashboards/s],
  ['crm object model', 'references/channel-runbooks.md', /account\/company as Lead.*person as Contact.*Opportunity.*Task.*Activity\/Note/s],
  ['crm action view', 'references/channel-runbooks.md', /Action Now.*Waiting.*Scheduled.*Closed.*large accurate backlog/s],
  ['numeric claim discipline', 'references/execution-safety.md', /numeric claim.*actual, projection, GMV, revenue.*as-of date/s],
  ['sender brand claim routing', 'references/execution-safety.md', /brand\/account identity.*restrict claims.*another sender persona/s],
  ['campaign draft only', 'references/execution-safety.md', /outbound campaigns.*draft mode.*prioritize reply handling.*send volume/s],
  ['grouped storm count', 'references/state-and-action-model.md', /compact count such as `x12`/],
  ['warm draft rank', 'references/state-and-action-model.md', /stale draft.*named human.*warm-human rank/s],
  ['account identity coverage', 'references/channel-runbooks.md', /exact address.*multi-account coverage|account selector.*every relevant mailbox/s],
  ['chronological search ordering', 'references/channel-runbooks.md', /Most relevant.*Most recent/s],
  ['absolute time-boundary verification', 'references/channel-runbooks.md', /half-open.*IANA timezone.*DST.*post-filter/s],
  ['pagination total reconciliation', 'references/channel-runbooks.md', /declared total.*returned records|returned count.*declared total/s],
  ['thread default-limit detection', 'references/channel-runbooks.md', /default returned-count cap.*returned\/declared counts.*oldest\/newest boundaries/s],
  ['rich versus ID namespace', 'references/channel-runbooks.md', /message IDs or thread IDs.*Normalize both routes to one namespace/s],
  ['recording interval partition', 'references/channel-runbooks.md', /Partition anomalously long recordings/],
  ['unbound recording fallback', 'references/channel-runbooks.md', /keep state-changing material unbound.*Never guess an entity interval/s],
  ['participant-bound attendance', 'references/channel-runbooks.md', /participant-bound attendance.*Empty recordings.*no-show/s],
  ['semantic match provenance', 'references/channel-runbooks.md', /pasted prompt.*OCR.*entity evidence/s],
  ['all-JID-domain discovery', 'references/channel-runbooks.md', /Preserve every JID domain/],
  ['GOWA recency hydration check', 'references/channel-runbooks.md', /Validate recency against hydrated message timestamps/],
  ['GOWA collision-safe dedupe', 'references/channel-runbooks.md', /provider message ID plus raw chat\/JID.*content\/time.*never sole merge proof/s],
  ['optional sibling-skill fallback', 'references/channel-runbooks.md', /when installed.*absence of the sibling skill is not proof/s],
  ['secret example rejection', 'references/channel-runbooks.md', /Never copy literal authorization headers or credentials/],
];
for (const [label, file, pattern] of requiredConcepts) {
  if (!pattern.test(contents[file] ?? '')) errors.push(`Missing operational invariant in ${file}: ${label}`);
}

const agentYaml = contents['agents/openai.yaml'] ?? '';
if (!agentYaml.includes('$inbox-forensic-action-operator-skill')) {
  errors.push('agents/openai.yaml does not invoke the skill by name');
}
if (corpus.includes('delivered/no bounce yet')) {
  errors.push('False delivery state found: no bounce observed is not delivery');
}
if (/unless the same current user message supplies/i.test(corpus)) {
  errors.push('Live-send confirmation contains an unsafe bypass');
}
if (/mutual acceptance\/hire/i.test(corpus)) {
  errors.push('Mutual acceptance and hire are collapsed into one outcome state');
}

const acceptanceTests = contents['references/recovery-and-acceptance-tests.md'] ?? '';
const acceptanceSection = acceptanceTests
  .split('## Acceptance Scenarios\n')[1]
  ?.split('\n## ')[0] ?? '';
const scenarioMatches = [...acceptanceSection.matchAll(/^(\d+)\.\s+(.+)$/gm)];
const scenarioNumbers = scenarioMatches.map((match) => Number(match[1]));
const scenarioTexts = scenarioMatches.map((match) => match[2].trim());
const scenarioCount = scenarioMatches.length;
if (scenarioCount < 63) errors.push(`Too few acceptance scenarios: ${scenarioCount}`);
if (scenarioNumbers.some((number, index) => number !== index + 1)) {
  errors.push('Acceptance scenario numbers must be unique, contiguous, and start at 1');
}
if (new Set(scenarioTexts).size !== scenarioTexts.length) {
  errors.push('Acceptance scenario text must be unique');
}

const requiredScenarioIds = [
  'MAIL-AUTH-ROUTE', 'MAIL-ACCOUNT-IDENTITY', 'TIME-HALF-OPEN-DST',
  'MAIL-CHRONO-PAGES', 'THREAD-DEFAULT-CAP', 'MAIL-ID-NAMESPACE',
  'MEETING-INTERVAL-CONTAMINATION', 'MEETING-SEMANTIC-PROVENANCE',
  'MEETING-EVENT-VS-OBSERVED', 'MEETING-SCHEDULED-NOT-ATTENDED',
  'GOWA-ALL-DEVICES', 'GOWA-PAGINATION-MISMATCH', 'GOWA-HYDRATED-RECENCY',
  'GOWA-RAW-JID-DEDUPE', 'PUBLIC-CREDENTIAL-REJECTION', 'MEETING-NO-SHOW',
  'MEETING-UNBOUND-MATERIAL', 'OPTIONAL-SIBLING-SKILL', 'MESSAGE-ID-COLLISION',
  'SECRET-SHAPES', 'SCENARIO-INTEGRITY',
  'SUCCESS-FAILURE-ASYMMETRY', 'STALE-WARM-DRAFT', 'STALE-COLD-BATCH',
  'EXPECTED-MAIL-MISSING', 'PRIORITY-NOT-URGENCY-COPY', 'CHANNEL-ESCALATION-LADDER',
  'NUMBER-TYPE-ASOF', 'CRM-OBJECT-MODEL', 'CRM-ACTION-VIEW',
  'TYPO-CORRECTION-EXECUTION',
  'WARM-DRAFT-RANK', 'GROUPED-STORM-COUNT', 'BRAND-NUMBER-CLAIM',
  'CAMPAIGN-DRAFT-ONLY',
];
const scenarioIds = [...acceptanceSection.matchAll(/^\d+\.\s+`\[([A-Z0-9-]+)\]`/gm)].map((match) => match[1]);
if (new Set(scenarioIds).size !== scenarioIds.length) errors.push('Acceptance scenario IDs must be unique');
for (const id of requiredScenarioIds) {
  if (!scenarioIds.includes(id)) errors.push(`Missing acceptance scenario ID: ${id}`);
}

if (errors.length) {
  console.error('Package validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Package structural validation passed: ${files.length} files, ${markdownLinks.length} links, ${scenarioCount} scenarios, ${wordCount} core words`);
