import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('releases/1.4/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.4/manifest.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(manifest.kernel_version === '1.4', 'Kernel 1.4 release version changed');
check(manifest.compiled_sha256 === '34ae3fc86030baae5add8aab5b756381a4b08542a6e639432a9e5fe117febed4', 'Kernel 1.4 manifest digest changed');
check(digest(boot) === manifest.compiled_sha256, 'Kernel 1.4 release bytes changed');
check(boot.includes('VSP — Verification Sufficiency Principle'), 'VSP missing from Kernel 1.4 release');
check(boot.includes('Schema Version: v3.8'), 'Kernel 1.4 schema version changed');
check(boot.includes('VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]'), 'VSP_Status missing from Kernel 1.4');
check(!boot.includes('SCF — Session Context Field'), 'SCF authority leaked backward into Kernel 1.4');
check(!boot.includes('session_context_field=true'), 'SCF feature flag leaked backward into Kernel 1.4');

process.stdout.write(`Kernel 1.4 inherited regression: ${passed}/${passed} PASS\n`);
