import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const candidateDir = join(kernelRoot, 'boot', 'candidates', '1.9');
const manifest = JSON.parse(readFileSync(join(candidateDir, 'profiles.json'), 'utf8'));
const registry = JSON.parse(readFileSync(join(kernelRoot, 'registry', 'boot-profiles-1.9.json'), 'utf8'));
const cases = JSON.parse(readFileSync(join(testDir, 'boot-profile-cases-1.9.json'), 'utf8'));
const digest = value => createHash('sha256').update(value).digest('hex');

const artifacts = Object.fromEntries(Object.entries(manifest.artifacts).map(([id, record]) => {
  const content = readFileSync(join(candidateDir, record.file), 'utf8');
  assert.equal(digest(content), record.sha256, `${id} artifact digest mismatch`);
  assert.equal(Buffer.byteLength(content), record.bytes, `${id} artifact byte count mismatch`);
  return [id, content];
}));

assert.equal(digest(readFileSync(join(kernelRoot, 'registry', 'boot-profiles-1.9.json'), 'utf8')), manifest.profile_registry_sha256);
assert.equal(manifest.guide_binding.expected_sha256, manifest.artifacts.GUIDE.sha256);
assert.match(artifacts.SLIM, new RegExp(`GUIDE_EXPECTED_SHA256: ${manifest.artifacts.GUIDE.sha256}`, 'u'));
assert.match(artifacts.SLIM, /AUTHORIZED_TERMINAL: BOOTSTRAP_READY/u);
assert.doesNotMatch(artifacts.SLIM, /AUTHORIZED_TERMINAL: KERNEL_READY(?:\n|$)/u);
assert.match(artifacts.SLIM, /## Stage B — Guide Verification and Kernel Activation/u);
assert.match(artifacts.GUIDE, /STANDALONE_AUTHORITY: false/u);
assert.match(artifacts.GUIDE, /AUTHORIZED_TERMINAL: KERNEL_READY_AFTER_STAGE_B/u);
assert.doesNotMatch(artifacts.GUIDE, /## Stage B — Guide Verification and Kernel Activation/u);
assert.match(artifacts.FULL, /AUTHORIZED_TERMINAL: KERNEL_READY/u);
assert.match(artifacts.PROJECT, /ACTIVATION: PROJECT_DIRECT/u);
assert.match(artifacts.PROJECT, /AUTHORIZED_TERMINAL: KERNEL_READY/u);
assert.match(artifacts.PROJECT, /REFERENCE_PROFILE: PROJECT_REFERENCE/u);
assert.ok(artifacts.PROJECT.length <= registry.project_contract.character_limit, 'PROJECT exceeds character limit');
assert.equal(manifest.project_contract.character_count, artifacts.PROJECT.length);
assert.equal(manifest.project_contract.status, 'PASS');
assert.equal(manifest.project_contract.reference_required_for_boot, false);
for (const token of registry.project_contract.required_components) {
  assert.match(artifacts.PROJECT, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'), 'u'), `PROJECT missing ${token}`);
}
assert.match(artifacts.PROJECT_REFERENCE, /ACTIVATION: REFERENCE_ONLY/u);
assert.match(artifacts.PROJECT_REFERENCE, /AUTHORIZED_TERMINAL: NONE/u);
assert.match(artifacts.PROJECT_REFERENCE, /STANDALONE_AUTHORITY: false/u);
assert.equal(manifest.coverage.status, 'PASS');
assert.equal(new Set(manifest.coverage.atoms).size, manifest.coverage.atom_count);
assert.equal(digest(readFileSync(join(kernelRoot, 'boot', 'MBP_KERNEL_BOOT.md'), 'utf8')), 'c7419e08be75c8a6a208cc884c42b33b74085bc2999c47fcf9c91c9f3eed4e0e', 'active Kernel 1.8 boot changed during candidate work');

function transition(input) {
  if (input.mode === 'FULL') return 'KERNEL_READY';
  if (input.mode === 'PROJECT') return 'KERNEL_READY';
  if (input.mode === 'PROJECT_REFERENCE') return 'BLOCKED · REFERENCE_ONLY';
  if (!input.attempt_stage_b) return 'BOOTSTRAP_READY';
  if (input.guide === 'missing') return 'BLOCKED · MISSING_GUIDE';
  if ((input.guide_version ?? registry.target_kernel_version) !== registry.target_kernel_version) return 'BLOCKED · VERSION_MISMATCH';
  if ((input.guide_profile ?? 'GUIDE') !== 'GUIDE') return 'BLOCKED · PROFILE_MISMATCH';
  if ((input.registry_sha256 ?? manifest.profile_registry_sha256) !== manifest.profile_registry_sha256) return 'BLOCKED · PROFILE_MISMATCH';
  if (input.guide !== 'exact') return 'BLOCKED · DIGEST_MISMATCH';
  if ((input.coverage ?? true) !== true) return 'BLOCKED · COVERAGE_MISMATCH';
  return 'KERNEL_READY';
}

for (const testCase of cases) {
  assert.equal(transition(testCase.input), testCase.expected, testCase.name);
}

process.stdout.write(`Kernel 1.9 boot profiles: ${cases.length} activation cases and ${manifest.coverage.atom_count} coverage atoms PASS\n`);
