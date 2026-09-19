import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.1/MBP_KERNEL_BOOT.md');
const releaseManifest = JSON.parse(read('releases/1.1/manifest.json'));
const baselineManifest = JSON.parse(read('releases/1.0/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.1.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(read('VERSION').trim() === '1.1', 'VERSION must be 1.1');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.1', 'module manifest must be 1.1');
check(boot === release, 'current boot and 1.1 release must be byte-identical');
check(digest(boot) === releaseManifest.compiled_sha256, '1.1 digest must match release manifest');
check(baselineManifest.compiled_sha256 === '4efc7a65f2388633af0a6ebb8170b305f8d72b713d0109285c501574ed4cfba5', 'Kernel 1.0 digest must remain immutable');
check(registry.kernel_version === '1.1', '1.1 registry version must match');
check(registry.status === 'FLASHED', 'Change 001 must be flashed');
check(registry.records.length === 1, '1.1 delta registry must contain exactly one new invariant');
check(registry.records[0].id === 'CAP-001-MINIMAP-LINEAGE', 'lineage invariant ID must match');
check(registry.records[0].extends.includes('OI-5'), 'lineage invariant must extend OI-5');
check(registry.records[0].extends.includes('CAP-007-MINIMAP-A002'), 'lineage invariant must extend mini-map enforcement');

for (const token of [
  'Mini-Map PoT Lineage Projection — CAP-001-MINIMAP-LINEAGE',
  '🔑 ⛓️[parent_hash4] → 🔒[current_hash4]',
  'previous sealed capsule\'s full PoT',
  'current capsule\'s full PoT after closure',
  'Full SHA-256 values remain authoritative in KV-Scribe',
  'never independently recomputes them',
  '🔑 ⛓️GENESIS → 🔒[current_hash4]',
  'missing or mismatched parent blocks closure',
  'may not appear in sealed runtime output',
  'Kernel 1.1',
  'Example: `🔑 ⛓️T8N7 → 🔒U3O2`'
]) check(boot.includes(token), `lineage contract missing: ${token}`);

for (const dependency of ['UNIVERSAL_PARENTAGE', 'KRONOS', 'KV-SCRIBE', 'POT']) {
  check(registry.records[0].depends_on.includes(dependency), `registry dependency missing: ${dependency}`);
}

for (const token of [
  'CAP-103 Flag-Only',
  'TAG-VGATE',
  'CAP-014-SCF',
  'VSP_Status:',
  'CAP-034-VSP',
  'VGATE-R',
  'Relational Knowledge Invariant',
  'Dynamic Subroutine System',
  'M1:'
]) check(!boot.includes(token), `later-version feature leaked into Kernel 1.1: ${token}`);

check((boot.match(/Mini-Map PoT Lineage Projection/g) || []).length === 1, 'lineage authority section must appear once');
check((boot.match(/Domain boundary crossed mid-capsule/g) || []).length === 1, 'baseline topology normalization must remain stable');

process.stdout.write(`Kernel 1.1 conformance: ${passed}/${passed} PASS\n`);
