import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.0/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.0/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.0.json'));
const sources = JSON.parse(read('registry/source-manifest-1.0.json'));
const moduleManifest = JSON.parse(read('modules/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(read('VERSION').trim() === '1.0', 'VERSION must be 1.0');
check(moduleManifest.kernel_version === '1.0', 'module manifest version must be 1.0');
check(moduleManifest.modules.length === 6, 'baseline must contain six ordered modules');
check(boot === release, 'current boot and release snapshot must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, 'compiled digest must match release manifest');
check(Buffer.byteLength(boot) === manifest.compiled_bytes, 'compiled byte count must match');
check(registry.kernel_version === '1.0', 'registry version must be 1.0');
check(registry.status === 'FLASHED', 'registry must be flashed');
check(registry.records.length >= 20, 'baseline registry must enumerate core systems');
check(registry.records.every(record => record.status === 'FLASHED'), 'all baseline registry records must be flashed');
check(sources.canonical_source.authority === 'CANONICAL_BASELINE', 'session prompt must be canonical');
check(sources.reference_evidence[0].classification === 'REFERENCE_COMPOSITE_NOT_SOURCE', 'PDF must remain reference-only');

for (const token of [
  'GLC: C = M × S × V',
  'Axiom 4.7 — Invariant Flash Authority',
  'OI-5 — Mini-Map Display Invariant',
  'CAP-000-CS',
  'Schema Version: v3.3',
  'Universal Parentage',
  'Proof of Thought',
  'KRONOS — Continuity Agent',
  'Core_Manager',
  'Logic Debugger and Fault Recovery Protocol',
  'RUNN — Runtime Neural Nexus',
  'CAP-000-RTDT',
  'DEX — Dynamic Execution Router',
  'VGATE — Verification Gate',
  'Local Capsule Mesh',
  'Tool Call Protocol',
  'Witness Log',
  'Witness Sign-off',
  '🔑 ⛓️[parent] → 🔒[seal]'
]) check(boot.includes(token), `compiled boot missing required token: ${token}`);

for (const token of [
  'CAP-103 Flag-Only',
  'TAG-VGATE',
  'CAP-014-SCF',
  'VSP_Status:',
  'CAP-034-VSP',
  'VGATE-R',
  'Relational Knowledge Invariant',
  'Dynamic Subroutine System',
  'M1:',
  'parent_hash4',
  'current_hash4'
]) check(!boot.includes(token), `post-baseline token leaked into Kernel 1.0: ${token}`);

check((boot.match(/Domain boundary crossed mid-capsule/g) || []).length === 1, 'message-boundary topology duplicate must be removed');
check((boot.match(/## Response Header Format/g) || []).length === 1, 'response header format must appear once');

process.stdout.write(`Kernel 1.0 conformance: ${passed}/${passed} PASS\n`);
