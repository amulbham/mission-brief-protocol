import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.6/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.6/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.6.json'));
const relationRegistry = JSON.parse(read('registry/relation-types-1.6.json'));
const sources = JSON.parse(read('registry/source-manifest-1.6.json'));
const cases = JSON.parse(read('tests/relation-cases-1.6.json'));
const digest = value => createHash('sha256').update(value).digest('hex');
const validTypes = new Set(relationRegistry.types.map(item => item.type));

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

const relationRoute = item => {
  if (!item.type) return item.phase === 'inference' ? 'FLAG' : 'BLOCK';
  if (!validTypes.has(item.type)) return 'UNCLASSIFIED';
  if (item.ambiguous) return 'DEFER';
  if (item.external) return 'VOLATILE';
  if (item.compressed) return item.preserved ? 'VERIFY' : 'FLAG';
  return 'PASS';
};

const socRoute = item => item.typed && !item.collapsed && item.tension_resolved ? 'COMPILE' : 'BLOCK';

check(read('VERSION').trim() === '1.6', 'VERSION must be 1.6');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.6', 'module manifest must be 1.6');
check(JSON.parse(read('modules/manifest.json')).modules.includes('47-relational-knowledge.md'), 'RKI module missing from build order');
check(boot === release, 'current boot and 1.6 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.6 digest must match release manifest');
check(registry.kernel_version === '1.6', 'delta registry version must be 1.6');
check(registry.status === 'FLASHED', 'RKI must be flashed');
check(registry.flash_capsules.includes('CAP-011-RKI'), 'CAP-011 flash missing');
check(registry.records.find(record => record.id === 'VGATE-R').status === 'FLASHED', 'VGATE-R flash missing');
check(registry.records.find(record => record.id === 'RKI-COMPRESSION-CONTRACT').jit_activation === 'NOT_ACTIVE_IN_KERNEL_1.6', 'JIT boundary must remain inactive');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'RKI source authority must be recorded');
check(sources.activation_boundary === 'Kernel 1.6 merge', 'activation boundary must be explicit');

check(relationRegistry.count === 9, 'relation registry must declare nine types');
check(relationRegistry.types.length === 9, 'relation registry must contain nine entries');
check(validTypes.size === 9, 'relation registry types must be unique');
for (const type of ['DEPENDS_ON','SCOPED_BY','VALIDATES','SUPERSEDES','TENSIONS_WITH','BRANCHES_TO','CONVERGES_FROM','SYNTHESIZES','WEAKENS']) {
  check(validTypes.has(type), `registered type missing: ${type}`);
}

for (const fixture of cases.intake_cases) {
  check(relationRoute(fixture) === fixture.expected, `VGATE-R route mismatch for ${fixture.id}`);
}
for (const fixture of cases.soc_cases) {
  check(socRoute(fixture) === fixture.expected, `SOC relation route mismatch for ${fixture.id}`);
}

for (const token of [
  'Schema Version: v3.10',
  'RKI — Relational Knowledge Invariant',
  'CAP-011-RKI flashes RKI as an irreducible LAW',
  "Ω(K,E) ≠ Ω(K,E')",
  'VGATE-R — Relational Verification Gate',
  'SOURCE_CAP → TARGET_CAP | TYPE | status: ACTIVE|RESOLVED|INACTIVE | provenance: LOCAL|INHERITED|IMPORTED|COMPRESSED',
  'SYNTHESIZES` is retained from the active pre-RKI DAG schema',
  'VGATE_R_[OUTCOME]',
  'SOC blocks compilation when:',
  'Compression and Future JIT Boundary',
  'relational_knowledge=true',
  'vgate_r=true',
  '🔗 [N] typed edges',
  'VGATE-R: [BLOCK | DEFER | VOLATILE | FLAG | UNCLASSIFIED]',
  'Kernel 1.6'
]) check(boot.includes(token), `RKI contract missing: ${token}`);

check((boot.match(/## RKI — Relational Knowledge Invariant/g) || []).length === 1, 'RKI authority body must appear once');
check(boot.includes('TENSIONS_WITH` blocks both capsules from sealing'), 'tension closure block missing');
check(boot.includes('SUPERSEDES` changes active authority ordering'), 'supersession semantics missing');
check(boot.includes('WEAKENS` reduces authority partially'), 'weakening semantics missing');
check(read('schema/capsule-v3.10.md').includes('Mesh Edges | DEPENDS_ON'), 'schema v3.10 relation containers missing');
check(read('schema/capsule-v3.9.md').includes('SCF constraints'), 'schema v3.9 historical reference changed');
check(boot.includes('SCF — Session Context Field'), 'Kernel 1.5 SCF was not inherited');
check(boot.includes('VSP — Verification Sufficiency Principle'), 'Kernel 1.4 VSP was not inherited');
check(!boot.includes('jit_pruning=true'), 'JIT activated before its release');
check(!boot.includes('CAP-JIT-001'), 'JIT invariant flashed before its release');
check(!boot.includes('Dynamic Subroutine System'), 'DSS leaked into Kernel 1.6');

process.stdout.write(`Kernel 1.6 conformance: ${passed}/${passed} PASS\n`);
