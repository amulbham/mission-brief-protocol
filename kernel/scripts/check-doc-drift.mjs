import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..', '..');
const indexPath = resolve(repoRoot, 'docs/kernel/component-index.md');
const index = readFileSync(indexPath, 'utf8');
const rows = index.split('\n').filter(line => line.startsWith('|') && !line.includes('---'));

let checked = 0;
for (const row of rows.slice(1)) {
  const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
  if (cells.length !== 6) continue;
  const [component, prompt, registry, tests, docs, status] = cells;
  if (status !== 'ACTIVE') continue;
  for (const cell of [prompt, registry, tests, docs]) {
    assert.notEqual(cell, 'Pending', `${component} has an unresolved ACTIVE mapping`);
    const paths = [...cell.matchAll(/`([^`]+)`/g)].map(match => match[1]);
    assert.ok(paths.length > 0, `${component} mapping lacks repository paths`);
    for (const path of paths) {
      assert.ok(existsSync(resolve(repoRoot, path)), `${component} maps to missing path ${path}`);
      checked += 1;
    }
  }
}

assert.ok(checked > 0, 'documentation index contains no active mapped paths');
process.stdout.write(`Documentation drift check: ${checked} mapped paths PASS\n`);
