import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.5/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.5/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.5', 'Kernel 1.5 release version changed');
check(manifest.compiled_sha256 === '5fcd1da625af48c3a70cea90179f5f6c72720c67ebc9508c205e384ca94e43a6', 'Kernel 1.5 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.5 release bytes changed');
check(boot.includes('SCF — Session Context Field'), 'SCF missing from Kernel 1.5 release');
check(boot.includes('Schema Version: v3.9'), 'Kernel 1.5 schema version changed');
check(boot.includes('session_context_field=true'), 'SCF feature flag missing from Kernel 1.5');
check(!boot.includes('RKI — Relational Knowledge Invariant'), 'RKI leaked backward into Kernel 1.5');
check(!boot.includes('vgate_r=true'), 'VGATE-R feature flag leaked backward into Kernel 1.5');

process.stdout.write(`Kernel 1.5 inherited regression: ${passed}/${passed} PASS\n`);
