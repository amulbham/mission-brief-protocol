import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(scriptDir, '..');
const version = readFileSync(join(kernelRoot, 'VERSION'), 'utf8').trim();
const sourceManifest = JSON.parse(readFileSync(join(kernelRoot, 'modules', 'manifest.json'), 'utf8'));

if (sourceManifest.kernel_version !== version) {
  throw new Error(`Manifest version ${sourceManifest.kernel_version} does not match VERSION ${version}`);
}

const digest = value => createHash('sha256').update(value).digest('hex');
const modules = sourceManifest.modules.map(name => {
  const content = readFileSync(join(kernelRoot, 'modules', name), 'utf8').trim();
  return { name, content, sha256: digest(content) };
});

const compiled = `${modules.map(module => module.content).join(sourceManifest.join)}\n`;
const bootPath = join(kernelRoot, 'boot', 'MBP_KERNEL_BOOT.md');
const releaseDir = join(kernelRoot, 'releases', version);
const releaseBootPath = join(releaseDir, 'MBP_KERNEL_BOOT.md');
const releaseManifestPath = join(releaseDir, 'manifest.json');

mkdirSync(dirname(bootPath), { recursive: true });
mkdirSync(releaseDir, { recursive: true });

if (existsSync(releaseBootPath)) {
  const existing = readFileSync(releaseBootPath, 'utf8');
  if (existing !== compiled) {
    throw new Error(`Immutable release ${version} already exists with different content`);
  }
} else {
  writeFileSync(releaseBootPath, compiled);
}

writeFileSync(bootPath, compiled);

const releaseManifest = {
  kernel_version: version,
  compiled_sha256: digest(compiled),
  compiled_bytes: Buffer.byteLength(compiled),
  module_order: modules.map(({ name, sha256 }) => ({ name, sha256 }))
};

const releaseManifestText = `${JSON.stringify(releaseManifest, null, 2)}\n`;
if (existsSync(releaseManifestPath)) {
  const existing = readFileSync(releaseManifestPath, 'utf8');
  if (existing !== releaseManifestText) {
    throw new Error(`Immutable release manifest ${version} already exists with different content`);
  }
} else {
  writeFileSync(releaseManifestPath, releaseManifestText);
}

process.stdout.write(`Built Kernel ${version}: ${releaseManifest.compiled_sha256}\n`);
