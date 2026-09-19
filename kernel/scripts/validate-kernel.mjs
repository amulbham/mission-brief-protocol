import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(scriptDir, '..');

for (const script of [
  resolve(kernelRoot, 'tests/kernel-1.0-conformance.mjs'),
  resolve(kernelRoot, 'scripts/check-doc-drift.mjs')
]) {
  process.stdout.write(execFileSync(process.execPath, [script], { encoding: 'utf8' }));
}

process.stdout.write('Kernel 1.0 validation complete.\n');
