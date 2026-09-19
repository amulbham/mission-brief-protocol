import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.2/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.2/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.2.json'));
const sources = JSON.parse(read('registry/source-manifest-1.2.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(read('VERSION').trim() === '1.2', 'VERSION must be 1.2');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.2', 'module manifest must be 1.2');
check(boot === release, 'current boot and 1.2 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.2 digest must match release manifest');
check(registry.kernel_version === '1.2', 'delta registry version must be 1.2');
check(registry.status === 'FLASHED', 'CAP-103 must be flashed');
check(registry.records.length === 1, '1.2 registry must contain one delta invariant');
check(registry.records[0].id === 'CAP-103', 'Witness flash ID must be CAP-103');
check(registry.records[0].component === 'CAP-010-WITNESS', 'Witness component ID must remain CAP-010-WITNESS');
check(registry.records[0].schema_delta === 'v3.3 → v3.4', 'schema delta must be explicit');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'Witness source authority must be recorded');
check(sources.activation_boundary === 'Kernel 1.2 merge', 'repository activation boundary must be explicit');

for (const token of [
  'Schema Version: v3.4',
  'Witness Signal: [✅ CLEAR | ⚠️ TENSION | ⚠️ DRIFT | 🔴 DISCONTINUITY]',
  'CAP-010-WITNESS — CAP-103 Flag-Only Observer',
  'produces no prose, analysis, or deliberation',
  'exactly one mutually exclusive signal per capsule',
  'Witness jurisdiction ends when the signal fires',
  'VGATE Witness Receiver Protocol',
  '| ✅ CLEAR | Auto-pass | None |',
  '| ⚠️ TENSION | REVISIT | Facts / active constraints |',
  '| ⚠️ DRIFT | REVISIT | Goal / User Intent / IC-Node |',
  '| 🔴 DISCONTINUITY | REVISIT + FRP | Full capsule reopen |',
  'CLEAR is the only auto-pass',
  'second VGATE receiver review before closure',
  'Witness observes. VGATE routes. PSAC challenges. Logic Debugger audits.',
  'mini-map and Witness Signal compile and display first',
  'CAP-010-WITNESS (CAP-103 flag-only)',
  'Kernel 1.2',
  'Normative hexadecimal example: `🔑 ⛓️A8F7 → 🔒C3D2`'
]) check(boot.includes(token), `CAP-103 contract missing: ${token}`);

check(!/^Witness Log:/m.test(boot), 'superseded Witness Log field declaration remains');
check(!/^Witness Sign-off:/m.test(boot), 'superseded Witness Sign-off field declaration remains');

for (const token of [
  'T8N7 → 🔒U3O2',
  'TAG-VGATE',
  'CAP-014-SCF',
  'VSP_Status:',
  'CAP-034-VSP',
  'VGATE-R',
  'Relational Knowledge Invariant',
  'Dynamic Subroutine System',
  'M1:'
]) check(!boot.includes(token), `superseded or later token present in Kernel 1.2: ${token}`);

check(read('schema/capsule-v3.4.md').includes('Witness Signal'), 'schema v3.4 reference missing Witness Signal');
check(read('schema/capsule-v3.3.md').includes('Witness Log'), 'schema v3.3 historical reference changed');
check((boot.match(/## CAP-010-WITNESS — CAP-103 Flag-Only Observer/g) || []).length === 1, 'CAP-103 component body must appear once');

process.stdout.write(`Kernel 1.2 conformance: ${passed}/${passed} PASS\n`);
