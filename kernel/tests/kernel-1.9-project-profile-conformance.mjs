import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const digest = value => createHash('sha256').update(value).digest('hex');

const candidateDir = join(kernelRoot, 'boot', 'candidates', '1.9');
const project = readFileSync(join(candidateDir, 'MBP_PROJECT_KERNEL.md'), 'utf8');
const reference = readFileSync(join(candidateDir, 'MBP_PROJECT_REFERENCE_GUIDE.md'), 'utf8');
const manifest = JSON.parse(readFileSync(join(candidateDir, 'profiles.json'), 'utf8'));
const registry = JSON.parse(read('registry/boot-profiles-1.9.json'));
const relationTypes = JSON.parse(read('registry/relation-types-1.6.json')).types.map(item => item.type);
const fieldCatalog = JSON.parse(read('schema/capsule-fields-v3.11.json'));
const cases = JSON.parse(read('tests/project-boot-cases-1.9.json'));

assert.equal(digest(project), manifest.artifacts.PROJECT.sha256);
assert.equal(digest(reference), manifest.artifacts.PROJECT_REFERENCE.sha256);
assert.ok(project.length <= registry.project_contract.character_limit);
assert.ok(registry.project_contract.character_limit - project.length >= 500, 'PROJECT must retain at least 500 characters of headroom');
assert.equal(manifest.project_contract.character_count, project.length);
assert.equal(manifest.project_contract.reference_required_for_boot, false);
assert.match(project, /PROFILE: PROJECT/u);
assert.match(project, /ACTIVATION: PROJECT_DIRECT/u);
assert.match(project, /AUTHORIZED_TERMINAL: KERNEL_READY/u);
assert.doesNotMatch(project, /GUIDE_EXPECTED_SHA256|BOOTSTRAP_READY|Stage B —/u);
assert.match(reference, /PROFILE: PROJECT_REFERENCE/u);
assert.match(reference, /ACTIVATION: REFERENCE_ONLY/u);
assert.match(reference, /STANDALONE_AUTHORITY: false/u);
assert.doesNotMatch(reference, /AUTHORIZED_TERMINAL: KERNEL_READY/u);

for (const law of ['GLC:', 'CI:', 'DCL:', 'ICL:', 'V:']) assert.match(project, new RegExp(law, 'u'));
for (const token of registry.project_contract.required_components) assert.ok(project.includes(token), `PROJECT missing ${token}`);
for (const type of relationTypes) assert.ok(project.includes(type), `PROJECT missing relation type ${type}`);
for (const field of fieldCatalog.fields) assert.ok(reference.includes(field.label), `PROJECT_REFERENCE missing schema field ${field.label}`);
for (const token of ['parent_hash4', 'current_hash4', 'KERNEL_INTERFACE@1.0', 'CONFIG_FAULT', 'PENDING_EXTERNAL', 'FAULT_UNRESOLVED']) {
  assert.ok(project.includes(token), `PROJECT missing enforcement token ${token}`);
}

function simulate(input) {
  if (input.reference_adds_authority) return 'BLOCKED · REFERENCE_AUTHORITY';
  if (input.trigger === 'boot') return 'KERNEL_READY · PROJECT · Kernel 1.9';
  if (input.hashing === 'unavailable') return 'OPEN · LINEAGE_UNAVAILABLE';
  if (input.volatile && !(input.path_a && input.path_b)) return 'PENDING_EXTERNAL';
  if (input.relation === 'untyped') return 'BLOCKED · UNTYPED_RELATION';
  if (input.tension === 'unresolved') return 'OPEN · TENSIONS_WITH';
  if (input.witness && input.witness !== 'CLEAR') return `REVISIT · ${input.witness}`;
  if (input.sabotage === 'directive') return 'HALTED · PSAC';
  if (input.sabotage === 'logic') return 'HALTED · LOGIC_DEBUGGER';
  if (input.recall === 'missing') return 'PENDING_EXTERNAL · MISSING_RECALL';
  return 'CLOSED · KNOWLEDGE';
}

for (const testCase of cases) {
  assert.equal(simulate(testCase.input), testCase.expected, testCase.name);
  for (const token of testCase.required_tokens) assert.ok(project.includes(token), `${testCase.name}: missing ${token}`);
}

process.stdout.write(`Kernel 1.9 PROJECT profile: ${project.length}/${registry.project_contract.character_limit} characters, ${registry.project_contract.required_components.length} components, ${cases.length} boot/stress cases PASS\n`);
