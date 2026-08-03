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
  ['basic-auth URL', /https?:\/\/[^\s/:]+:[^\s@]+@/i],
  ['assigned credential', /\b(?:api[_ -]?key|token|password|secret)\s*[:=]\s*["']?[^\s<>{}\[\]]+/i],
];
for (const [label, pattern] of privatePatterns) {
  if (pattern.test(corpus)) errors.push(`Possible private ${label} found in public skill content`);
}

const requiredConcepts = [
  ['coverage vocabulary', /full.*partial.*sampled.*missing.*blocked/s],
  ['event versus sync time', /event time.*sync|occurred_at.*observed_at/s],
  ['follow-up due', /follow-up due/],
  ['idempotency', /Idempotency/],
  ['ambiguous-result recovery', /ambiguous.*before retry/s],
  ['delayed bounce', /delayed.*bounce/s],
  ['attachment verification', /Attachment Gate/],
  ['same-layer proof', /same-layer proof/],
  ['live-send confirmation', /explicit final confirmation/],
  ['all-device GOWA discovery', /every relevant `logged_in` device/],
  ['self-generated automation suppression', /self-generated automation/],
];
for (const [label, pattern] of requiredConcepts) {
  if (!pattern.test(corpus)) errors.push(`Missing operational invariant: ${label}`);
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
const scenarioCount = (acceptanceSection.match(/^\d+\. /gm) ?? []).length;
if (scenarioCount < 28) errors.push(`Too few acceptance scenarios: ${scenarioCount}`);

if (errors.length) {
  console.error('Package validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Package validation passed: ${files.length} files, ${markdownLinks.length} links, ${scenarioCount} scenarios, ${wordCount} core words`);
