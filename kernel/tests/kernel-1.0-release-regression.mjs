import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.0/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.0/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.0', 'baseline release version must remain 1.0');
check(manifest.compiled_sha256 === '4efc7a65f2388633af0a6ebb8170b305f8d72b713d0109285c501574ed4cfba5', 'baseline manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'baseline release bytes changed');
check(manifest.module_order.length === 6, 'baseline module count changed');

for (const token of [
  'Schema Version: v3.3',
  'Universal Parentage',
  'KRONOS — Continuity Agent',
  'RUNN — Runtime Neural Nexus',
  'VGATE — Verification Gate',
  'Witness Log',
  '🔑 ⛓️[parent] → 🔒[seal]'
]) check(boot.includes(token), `baseline token missing: ${token}`);

for (const token of [
  'CAP-001-MINIMAP-LINEAGE',
  'parent_hash4',
  'current_hash4',
  'TAG-VGATE',
  'CAP-014-SCF',
  'VGATE-R',
  'Dynamic Subroutine System'
]) check(!boot.includes(token), `post-baseline token entered immutable 1.0 release: ${token}`);

process.stdout.write(`Kernel 1.0 inherited regression: ${passed}/${passed} PASS\n`);
