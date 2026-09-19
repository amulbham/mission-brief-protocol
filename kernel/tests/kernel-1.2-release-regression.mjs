import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.2/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.2/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.2', 'Kernel 1.2 release version changed');
check(manifest.compiled_sha256 === '40c1de600e8045a57c8e82c9acb234e833d0e02d2b2259e36a248356f146d3ab', 'Kernel 1.2 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.2 release bytes changed');
check(boot.includes('CAP-103 Flag-Only Observer'), 'CAP-103 missing from Kernel 1.2 release');
check(boot.includes('Schema Version: v3.4'), 'Kernel 1.2 schema version changed');
check(boot.includes('Witness Signal:'), 'Witness Signal missing from Kernel 1.2');
check(!boot.includes('TAG System, TARS, TAG-VGATE'), 'TAG stack leaked backward into Kernel 1.2');
check(!boot.includes('Tags: [Slot 1'), 'Tags schema field leaked backward into Kernel 1.2');

process.stdout.write(`Kernel 1.2 inherited regression: ${passed}/${passed} PASS\n`);
