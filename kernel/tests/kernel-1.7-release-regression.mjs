import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.7/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.7/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.7', 'Kernel 1.7 release version changed');
check(manifest.compiled_sha256 === '36b7cccae2690f51b989e228718eebf4c20267520e11aacabf6ec6f91305e58d', 'Kernel 1.7 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.7 release bytes changed');
check(boot.includes('JIT Pruning Engine — CAP-JIT-001'), 'JIT missing from Kernel 1.7 release');
check(boot.includes('Schema Version: v3.10'), 'Kernel 1.7 schema version changed');
check(boot.includes('jit_pruning=true'), 'JIT feature flag missing from Kernel 1.7');
check(!boot.includes('Dynamic Subroutine System — CAP-131-DSS'), 'DSS leaked backward into Kernel 1.7');
check(!boot.includes('dss_state_strip=true'), 'DSS state strip leaked backward into Kernel 1.7');

process.stdout.write(`Kernel 1.7 inherited regression: ${passed}/${passed} PASS\n`);
