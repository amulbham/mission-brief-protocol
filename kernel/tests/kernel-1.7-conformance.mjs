import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.7/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.7/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.7.json'));
const relationRegistry = JSON.parse(read('registry/relation-types-1.6.json'));
const policy = JSON.parse(read('registry/jit-policy-1.7.json'));
const sources = JSON.parse(read('registry/source-manifest-1.7.json'));
const cases = JSON.parse(read('tests/jit-cases-1.7.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

const tierByName = new Map(policy.node_tiers.map(item => [item.tier, item]));
const nodeRoute = item => {
  const tier = tierByName.get(item.tier);
  if (!tier) return 'FAULT';
  if (tier.tier === 'CORE_SYSTEM_INVARIANT') return 'RETAIN';
  return item.watchdog && tier.watchdog_suppressible && tier.weight <= policy.watchdog.suppression_ceiling
    ? 'SUPPRESS'
    : 'RETAIN';
};

const watchdogRoute = item => {
  if (!Number.isFinite(item.capacity) || !Number.isFinite(item.threshold)) return 'CONFIG_FAULT';
  if (!(item.threshold > 0 && item.threshold < item.capacity)) return 'CONFIG_FAULT';
  return item.tokens > item.threshold ? 'SWEEP' : 'STEADY';
};

const relationWeight = item => {
  const exact = policy.relation_actions.find(action => action.type === item.type && action.status === item.status);
  const fallback = policy.relation_actions.find(action => action.type === item.type && action.status === 'ANY');
  return (exact ?? fallback)?.weight;
};

check(read('VERSION').trim() === '1.7', 'VERSION must be 1.7');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.7', 'module manifest must be 1.7');
check(JSON.parse(read('modules/manifest.json')).modules.includes('48-jit-pruning.md'), 'JIT module missing from build order');
check(boot === release, 'current boot and 1.7 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.7 digest must match release manifest');
check(registry.kernel_version === '1.7', 'delta registry version must be 1.7');
check(registry.status === 'FLASHED', 'JIT registry must be flashed');
check(registry.flash_capsules.length === 5, 'five JIT sub-components must be flashed');
for (const id of ['CAP-JIT-001-CORE','CAP-JIT-001-EDGES','CAP-JIT-001-NODES','CAP-JIT-001-WATCHDOG','CAP-JIT-001-VOCAB']) {
  check(registry.flash_capsules.includes(id), `JIT flash missing: ${id}`);
}
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'JIT source authority must be recorded');
check(sources.canonical_source.sha256 === 'ded9a66d8c13611c665c4ae6c4231869b5677be710dbbc84b5045098304dffc6', 'canonical JIT source digest changed');
check(sources.activation_boundary === 'Kernel 1.7 merge', 'activation boundary must be explicit');

check(policy.node_tiers.length === 4, 'JIT must declare four node tiers');
check(tierByName.get('CORE_SYSTEM_INVARIANT').weight === 1.0, 'core invariant weight must be 1.0');
check(tierByName.get('CORE_SYSTEM_INVARIANT').watchdog_suppressible === false, 'core invariants must be immune');
for (const fixture of cases.node_cases) {
  check(nodeRoute(fixture) === fixture.expected, `node route mismatch for ${fixture.id}`);
}
for (const fixture of cases.watchdog_cases) {
  check(watchdogRoute(fixture) === fixture.expected, `watchdog route mismatch for ${fixture.id}`);
}
for (const fixture of cases.relation_cases) {
  check(relationWeight(fixture) === fixture.expected, `relation weight mismatch for ${fixture.id}`);
}

const validTypes = new Set(relationRegistry.types.map(item => item.type));
const governedTypes = new Set(policy.relation_actions.map(item => item.type));
check(validTypes.size === 9, 'RKI registry must remain nine types');
for (const type of validTypes) check(governedTypes.has(type), `JIT policy missing RKI type ${type}`);
for (const retired of ['SUPPORTS','INHERITS_FROM']) {
  check(policy.retired_types.includes(retired), `${retired} must be retired`);
  check(!validTypes.has(retired), `${retired} must not enter active RKI registry`);
}
check(policy.deferred_types.includes('TRANSIENT'), 'DSS TRANSIENT must remain deferred');
check(!validTypes.has('TRANSIENT'), 'TRANSIENT activated before DSS');
check(policy.historical_import_aliases.FORKS_TO === 'BRANCHES_TO', 'FORKS_TO import normalization missing');

for (const token of [
  'Schema Version: v3.10',
  'JIT Pruning Engine — CAP-JIT-001',
  'CAP-JIT-001-CORE',
  'CAP-JIT-001-EDGES',
  'CAP-JIT-001-NODES',
  'CAP-JIT-001-WATCHDOG',
  'CAP-JIT-001-VOCAB',
  'RUNN triggers',
  'DEX traces',
  'KV-Scribe injects',
  'SOC compiles',
  'CORE_SYSTEM_INVARIANT',
  '0 < MAX_THRESHOLD < CONTEXT_WINDOW_CAPACITY',
  'jit_pruning=true',
  '✂️ JIT:',
  'functional surface suppression',
  'Kernel 1.7'
]) check(boot.includes(token), `JIT contract missing: ${token}`);

check((boot.match(/## JIT Pruning Engine — CAP-JIT-001/g) || []).length === 1, 'JIT authority body must appear once');
check(!/MAX_THRESHOLD\s*=\s*\d+/.test(boot), 'MAX_THRESHOLD must not be hardcoded');
check(boot.includes('type, direction, status, and provenance'), 'RKI preservation contract missing');
check(boot.includes('does not claim token eviction'), 'Honest Ceiling token boundary missing');
check(boot.includes('never claims physical token eviction'), 'mini-map Honest Ceiling missing');
check(boot.includes('RKI — Relational Knowledge Invariant'), 'Kernel 1.6 RKI was not inherited');
check(boot.includes('SCF — Session Context Field'), 'Kernel 1.5 SCF was not inherited');
check(boot.includes('VSP — Verification Sufficiency Principle'), 'Kernel 1.4 VSP was not inherited');
check(!boot.includes('Dynamic Subroutine System'), 'DSS leaked into Kernel 1.7');
check(!boot.includes('transient_relations=true'), 'DSS transient feature activated before Kernel 1.8');
check(read('schema/capsule-v3.10.md').includes('Kernel Track 1.6 carries capsule schema v3.10'), 'schema v3.10 historical reference changed');

process.stdout.write(`Kernel 1.7 conformance: ${passed}/${passed} PASS\n`);
