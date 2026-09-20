import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.5/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.5/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.5.json'));
const sources = JSON.parse(read('registry/source-manifest-1.5.json'));
const cases = JSON.parse(read('tests/scf-cases-1.5.json'));
const schemaModule = read('modules/20-capsule-schema.md');
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

const sessionCharacter = history => {
  const unique = new Set(history);
  if (unique.size > 1) return 'MIXED';
  return unique.has('#mode_technical') ? 'TECHNICAL' : 'EXPLORATORY';
};

const transitioned = ({ previous, current }) => previous !== null && previous !== current;
const t3Fires = ({ character, transition }) => character === 'MIXED' && transition;

check(read('VERSION').trim() === '1.5', 'VERSION must be 1.5');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.5', 'module manifest must be 1.5');
check(JSON.parse(read('modules/manifest.json')).modules.includes('15-session-context.md'), 'SCF module missing from build order');
check(boot === release, 'current boot and 1.5 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.5 digest must match release manifest');
check(registry.kernel_version === '1.5', 'delta registry version must be 1.5');
check(registry.status === 'FLASHED', 'SCF must be flashed');
check(registry.flash_capsules.includes('CAP-014-SCF'), 'CAP-014 flash missing');
check(registry.records.find(record => record.id === 'DV-T3-ACTIVATION').status === 'ACTIVE', 'T3 must be active');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'SCF source authority must be recorded');
check(sources.canonical_source.source_schema === 'v3.5', 'SCF source schema provenance changed');
check(sources.activation_boundary === 'Kernel 1.5 merge', 'activation boundary must be explicit');

for (const fixture of cases.character_cases) {
  check(sessionCharacter(fixture.history) === fixture.expected, `session character mismatch for ${fixture.id}`);
}
for (const fixture of cases.transition_cases) {
  check(transitioned(fixture) === fixture.expected, `transition mismatch for ${fixture.id}`);
}
for (const fixture of cases.t3_cases) {
  check(t3Fires(fixture) === fixture.expected, `T3 route mismatch for ${fixture.id}`);
}

for (const token of [
  'Schema Version: v3.9',
  'SCF — Session Context Field',
  'CAP-014-SCF establishes a read-only ambient field',
  'Session Context: T[N] · CAP-[N] of [total_at_entry]',
  'Session Context: BOOTSTRAP',
  'SESSION_THREAD',
  'SESSION CONTEXT informs; it does not justify',
  'Insight→Gov FAULT',
  'Flash-Sync retrieves; SCF compiles; KRONOS verifies',
  'CAP-000 initializes `#mode_literal`',
  'ACTIVE · dependency satisfied by CAP-014-SCF',
  'session_context_field=true',
  '📋 T[N] · CAP-[N] of [total_at_entry]',
  'Kernel 1.5'
]) check(boot.includes(token), `SCF contract missing: ${token}`);

const received = schemaModule.indexOf('Received: [ISO 8601]');
const scf = schemaModule.indexOf('Session Context: [T[N]');
const icNode = schemaModule.indexOf('IC-Node: [Entity]');
check(received >= 0 && scf > received && icNode > scf, 'SCF must be after Received and before IC-Node');
check((boot.match(/^Session Context: \[T\[N\]/mg) || []).length === 1, 'SCF schema declaration must appear once');
check(boot.includes('VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]'), 'Kernel 1.4 VSP was not inherited');
check(boot.includes('TAG System, TARS, TAG-VGATE, and Thematic Index'), 'Kernel 1.3 TAG stack was not inherited');
check(boot.includes('CAP-103 Flag-Only Observer'), 'Kernel 1.2 Witness was not inherited');
check(read('schema/capsule-v3.9.md').includes('Flash-Sync → SCF → KRONOS → IC-Node'), 'schema v3.9 sequence missing');
check(read('schema/capsule-v3.8.md').includes('VSP_Status field'), 'schema v3.8 historical reference changed');

for (const token of [
  'VGATE-R',
  'Relational Knowledge Invariant',
  'JIT Pruning',
  'Dynamic Subroutine System',
  'M1:'
]) check(!boot.includes(token), `later-version feature leaked into Kernel 1.5: ${token}`);

process.stdout.write(`Kernel 1.5 conformance: ${passed}/${passed} PASS\n`);
