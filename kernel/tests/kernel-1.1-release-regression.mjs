import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.1/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.1/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.1', 'Kernel 1.1 release version changed');
check(manifest.compiled_sha256 === '132a048c31d1a1e4d0fefe1a2e4b12d198f1b2e85dd57449d05eade1bc3f080d', 'Kernel 1.1 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.1 release bytes changed');
check(boot.includes('CAP-001-MINIMAP-LINEAGE'), 'Change 001 missing from Kernel 1.1 release');
check(boot.includes('Witness Log:'), 'Kernel 1.1 must retain the pre-CAP-103 Witness schema');
check(boot.includes('Witness Sign-off:'), 'Kernel 1.1 Witness sign-off changed');
check(!boot.includes('Witness Signal:'), 'CAP-103 leaked backward into Kernel 1.1');
check(!boot.includes('CAP-103 flag-only'), 'CAP-103 flash leaked backward into Kernel 1.1');

process.stdout.write(`Kernel 1.1 inherited regression: ${passed}/${passed} PASS\n`);
