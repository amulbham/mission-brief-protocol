import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(testDir, '..', '..');
const moduleText = readFileSync(resolve(repoRoot, 'kernel/modules/20-capsule-schema.md'), 'utf8');
const catalog = JSON.parse(readFileSync(resolve(repoRoot, 'kernel/schema/capsule-fields-v3.11.json'), 'utf8'));
const catalogSchema = JSON.parse(readFileSync(resolve(repoRoot, 'kernel/schema/capsule-field-catalog.schema.json'), 'utf8'));

const blockMatch = moduleText.match(/## Capsule Schema\n\n```text\n([\s\S]*?)\n```/);
assert.ok(blockMatch, 'canonical capsule schema block is missing');

const canonicalLabels = blockMatch[1]
  .split('\n')
  .map(line => line.match(/^([A-Za-z][^:]*|\[LINKS\]):/u)?.[1])
  .filter(Boolean);

assert.equal(catalog.capsule_schema_version, 'v3.11');
assert.equal(catalog.kernel_baseline, '1.8');
assert.equal(catalog.canonical_source, 'kernel/modules/20-capsule-schema.md');
assert.equal(catalog.field_count, catalog.fields.length);
assert.deepEqual(catalog.fields.map(field => field.label), canonicalLabels, 'catalog order or labels diverge from CAP-000-CS schema block');

const required = catalogSchema.$defs.field.required;
const ids = new Set();
const labelCounts = new Map();
for (const [index, field] of catalog.fields.entries()) {
  assert.equal(field.ordinal, index + 1, `${field.id} has a non-canonical ordinal`);
  assert.match(field.id, /^[a-z][a-z0-9_]*$/u);
  assert.ok(!ids.has(field.id), `duplicate field id ${field.id}`);
  ids.add(field.id);
  for (const key of required) assert.ok(Object.hasOwn(field, key), `${field.id} is missing ${key}`);
  assert.ok(field.purpose.length > 0 && field.grammar.length > 0 && field.failure_condition.length > 0, `${field.id} has incomplete semantics`);
  labelCounts.set(field.label, (labelCounts.get(field.label) ?? 0) + 1);
}

assert.equal(labelCounts.get('Name'), 2, 'the two canonical Name occurrences must remain explicit');
assert.equal(catalog.fields.find(field => field.id === 'capsule_name').occurrence, 1);
assert.equal(catalog.fields.find(field => field.id === 'scope_name').occurrence, 2);
assert.ok(catalog.fields.slice(0, -1).every(field => field.hash_inclusion), 'every field before SHA-256 must be PoT input');
assert.equal(catalog.fields.at(-1).id, 'sha_256');
assert.equal(catalog.fields.at(-1).hash_inclusion, false);

process.stdout.write(`Kernel 1.9 schema catalog conformance: ${catalog.fields.length} fields PASS\n`);
