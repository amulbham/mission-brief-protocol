import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.6/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.6/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.6', 'Kernel 1.6 release version changed');
check(manifest.compiled_sha256 === '635935b39f7c23b38abb3490bbc35409618dcddacc509b440b6daf6accf4889c', 'Kernel 1.6 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.6 release bytes changed');
check(boot.includes('RKI — Relational Knowledge Invariant'), 'RKI missing from Kernel 1.6 release');
check(boot.includes('Schema Version: v3.10'), 'Kernel 1.6 schema version changed');
check(boot.includes('vgate_r=true'), 'VGATE-R feature flag missing from Kernel 1.6');
check(!boot.includes('JIT Pruning Engine — CAP-JIT-001'), 'JIT leaked backward into Kernel 1.6');
check(!boot.includes('jit_pruning=true'), 'JIT feature flag leaked backward into Kernel 1.6');

process.stdout.write(`Kernel 1.6 inherited regression: ${passed}/${passed} PASS\n`);
