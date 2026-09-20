import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(scriptDir, '..');

for (const script of [
  resolve(kernelRoot, 'tests/kernel-1.0-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.1-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.2-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.3-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.4-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.5-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.6-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.7-release-regression.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.8-conformance.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.9-schema-catalog-conformance.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.9-boot-profiles-conformance.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.9-project-profile-conformance.mjs'),
  resolve(kernelRoot, 'tests/kernel-1.9-prompt-format-conformance.mjs'),
  resolve(kernelRoot, 'scripts/build-schema-guide.mjs'),
  resolve(kernelRoot, 'scripts/build-boot-profiles.mjs'),
  resolve(kernelRoot, 'scripts/check-doc-drift.mjs')
]) {
  const args = script.includes('build-') ? [script, '--check'] : [script];
  process.stdout.write(execFileSync(process.execPath, args, { encoding: 'utf8' }));
}

process.stdout.write('Kernel validation complete (active release 1.8; Kernel 1.9 work in progress).\n');
