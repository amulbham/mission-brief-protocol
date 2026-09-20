import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const candidateDir = join(kernelRoot, 'boot', 'candidates', '1.9');
const manifest = JSON.parse(readFileSync(join(candidateDir, 'profiles.json'), 'utf8'));
const registry = JSON.parse(readFileSync(join(kernelRoot, 'registry', 'boot-profiles-1.9.json'), 'utf8'));

assert.equal(manifest.profile_format_version, registry.presentation.format_version);

for (const [id, record] of Object.entries(manifest.artifacts)) {
  const content = readFileSync(join(candidateDir, record.file), 'utf8');
  const h1 = content.match(/^# .+$/gmu) ?? [];
  assert.equal(h1.length, 1, `${id} must contain exactly one H1`);
  assert.equal(h1[0], `# ${registry.presentation.title}`, `${id} title is not current`);
  assert.doesNotMatch(content, /# Mission Brief Protocol — Kernel 1\.0/u, `${id} leaks the historical source title`);
  assert.match(content, /^## Boot Identity$/mu, `${id} lacks the generated identity section`);
  assert.match(content, new RegExp(`PROFILE_FORMAT: ${registry.presentation.format_version}`, 'u'));
  assert.match(content, new RegExp(`PROFILE: ${id}`, 'u'));
  const identityIndex = content.indexOf('## Boot Identity');
  const semanticHeadingIndex = content.indexOf('\n## ', identityIndex + '## Boot Identity'.length);
  assert.ok(semanticHeadingIndex > identityIndex, `${id} identity must precede semantic content`);
  assert.doesNotMatch(content, /\r/u, `${id} must use LF newlines`);
  assert.doesNotMatch(content, /[ \t]+$/mu, `${id} contains trailing whitespace`);
  assert.ok(content.endsWith('\n'), `${id} must end with one newline`);
  assert.ok(!content.endsWith('\n\n'), `${id} must end with exactly one newline`);
  for (const source of record.sources) {
    assert.match(source.source_sha256, /^[a-f0-9]{64}$/u);
    assert.match(source.compiled_sha256, /^[a-f0-9]{64}$/u);
  }
}

process.stdout.write(`Kernel 1.9 prompt format: ${Object.keys(manifest.artifacts).length} artifacts PASS\n`);
