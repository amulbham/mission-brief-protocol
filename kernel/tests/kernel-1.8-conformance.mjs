import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.8/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.8/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.8.json'));
const relationTypes = JSON.parse(read('registry/relation-types-1.6.json'));
const relationStatuses = JSON.parse(read('registry/relation-statuses-1.8.json'));
const dssPolicy = JSON.parse(read('registry/dss-policy-1.8.json'));
const jitPolicy = JSON.parse(read('registry/jit-policy-1.8.json'));
const sources = JSON.parse(read('registry/source-manifest-1.8.json'));
const cases = JSON.parse(read('tests/dss-cases-1.8.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

const synthesisRoute = item => item.ic_resolved && item.goal_concrete && item.constraint_count > 0 ? 'ACTIVE' : 'BLOCKED';
const canEnrich = item => item.residue === 'KNOWLEDGE' && item.logic === 'PASS' && item.psac === 'PASS';
const tier2Route = item => {
  if (!item.precision) return 'USE_TIER_1';
  if (item.nested) return 'BLOCKED_ICL';
  if (!item.registered) return 'TOOL_NOT_FOUND';
  if (item.volatile_logic) return 'TOOL_SCHEMA_BLOCK';
  if (!(item.stable && item.frequent)) return 'USE_TIER_1';
  return 'ACTIVE';
};
const transientRoute = item => {
  if (!relationStatuses.transient_allowed_types.includes(item.type)) return 'BLOCKED';
  return item.pot ? 'RESOLVED' : item.status;
};
const validStrip = value => {
  const codePoints = [...value].length;
  const modeOne = /^⚙️ DSS · M1:[A-Z0-9_]+@[0-9.]+ 🟢 ACTIVE ·/.test(value);
  const modeTwo = / · M2:(NONE|[A-Z0-9_]+@[0-9.]+ (⚪ NONE|🟡 REQUESTED|🟢 ACTIVE|↗ FORK_REQUIRED|🔴 BLOCKED|✅ RESOLVED))/.test(value);
  return codePoints <= dssPolicy.state_strip.max_characters && modeOne && modeTwo;
};

check(read('VERSION').trim() === '1.8', 'VERSION must be 1.8');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.8', 'module manifest must be 1.8');
check(JSON.parse(read('modules/manifest.json')).modules.includes('49-dynamic-subroutines.md'), 'DSS module missing from build order');
check(boot === release, 'current boot and 1.8 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.8 digest must match release manifest');
check(registry.kernel_version === '1.8', 'delta registry version must be 1.8');
check(registry.status === 'FLASHED', 'DSS registry must be flashed');
check(registry.flash_capsules.length === 6, 'five DSS components plus display must be flashed');
for (const id of ['CAP-131-DSS-SYNTHESIS','CAP-131-DSS-CACHE','CAP-131-DSS-REGISTRY','CAP-131-DSS-TRANSIENT','CAP-131-DSS-CM','CAP-131-DSS-DISPLAY']) {
  check(registry.flash_capsules.includes(id), `DSS flash missing: ${id}`);
}
check(registry.schema_delta === 'v3.10 → v3.11', 'schema delta must be v3.10 to v3.11');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'DSS source authority must be recorded');
check(sources.canonical_source.sha256 === 'b9c062056047a722fbd69f51e8c0c3fba8b186ec3bb8638c0e206b75fe57d346', 'canonical DSS source digest changed');
check(sources.approved_supplement.authority === 'APPROVED_INTEGRATION_DELTA', 'state-strip approval must be recorded');
check(sources.activation_boundary === 'Kernel 1.8 merge', 'activation boundary must be explicit');

check(relationTypes.count === 9, 'RKI type registry must remain nine types');
check(relationStatuses.statuses.length === 4, 'relation status registry must contain four statuses');
check(relationStatuses.statuses.some(item => item.status === 'TRANSIENT'), 'TRANSIENT status missing');
check(!relationTypes.types.some(item => item.type === 'TRANSIENT'), 'TRANSIENT must not become a relation type');
check(relationStatuses.transient_allowed_types.join(',') === 'VALIDATES,SCOPED_BY', 'TRANSIENT allowed types changed');
check(jitPolicy.dss_transient_handling.type_count_unchanged === 9, 'JIT must preserve nine relation types');
check(jitPolicy.dss_transient_handling.soc_surface === 'FLUSH_ACTIVE_PROJECTION', 'transient post-PoT JIT rule missing');

check(dssPolicy.mode_1.required === true, 'Mode 1 must be required');
check(dssPolicy.mode_1.default === 'KERNEL_INTERFACE@1.0', 'Mode 1 default changed');
check(dssPolicy.tier_1.sources.join(',') === 'IC-Node,PATH,Constraints,Goal', 'Tier 1 source set changed');
check(dssPolicy.tier_1.enrichment.join(',') === 'KNOWLEDGE residue,Logic Debugger PASS,PSAC PASS', 'cache enrichment gate changed');
check(dssPolicy.tier_2.mutable === false, 'Tier 2 must be immutable');
check(dssPolicy.tier_2.update_relation === 'SUPERSEDES', 'Tier 2 update relation must be SUPERSEDES');
check(dssPolicy.state_strip.max_characters === 180, 'state strip limit must be 180');

for (const fixture of cases.synthesis_gate_cases) {
  check(synthesisRoute(fixture) === fixture.expected, `synthesis gate mismatch for ${fixture.id}`);
}
for (const fixture of cases.enrichment_cases) {
  check(canEnrich(fixture) === fixture.expected, `cache enrichment mismatch for ${fixture.id}`);
}
for (const fixture of cases.tier_2_cases) {
  check(tier2Route(fixture) === fixture.expected, `Tier 2 route mismatch for ${fixture.id}`);
}
for (const fixture of cases.transient_cases) {
  check(transientRoute(fixture) === fixture.expected, `transient route mismatch for ${fixture.id}`);
}
for (const fixture of cases.strip_cases) {
  check(validStrip(fixture.value) === fixture.expected_valid, `state-strip validation mismatch for ${fixture.id}`);
}

for (const token of [
  'Schema Version: v3.11',
  'Dynamic Subroutine System — CAP-131-DSS',
  'CAP-131-DSS-SYNTHESIS',
  'CAP-131-DSS-CACHE',
  'CAP-131-DSS-REGISTRY',
  'CAP-131-DSS-TRANSIENT',
  'CAP-131-DSS-CM',
  'CAP-131-DSS-DISPLAY',
  'LOAD: [DOMAIN_TYPE]',
  'LOAD: REG:[TOOL_ID]',
  'SYNTHESIS_GATE',
  '/ROOT/SYSTEM/SYNTHESIS_CACHE/[DOMAIN_TYPE]/',
  '/ROOT/SYSTEM/REGISTRY/[TOOL_ID]/',
  'KERNEL_INTERFACE@1.0',
  'TRANSIENT` is a relation status, not a relation type',
  'dynamic_subroutine_synthesis=true',
  'subroutine_registry=true',
  'synthesis_cache=true',
  'transient_edge_status=true',
  'dss_state_strip=true',
  '⚙️ DSS · M1:',
  'Kernel 1.8'
]) check(boot.includes(token), `DSS contract missing: ${token}`);

check((boot.match(/## Dynamic Subroutine System — CAP-131-DSS/g) || []).length === 1, 'DSS authority body must appear once');
check(boot.includes('M1:KERNEL_INTERFACE@1.0 🟢 ACTIVE · M2:NONE · T2:NONE'), 'canonical empty DSS strip missing');
check(boot.includes('T2:1/2 ⚠️ DECIMAL_SUM@1.0 BLOCKED'), 'Tier 2 exception display missing');
check(boot.includes('at most 180 characters'), 'state-strip length contract missing');
check(boot.includes('does not mean the scope remains loaded after its closure purge'), 'sealed ACTIVE display semantics missing');
check(boot.includes('cannot contribute Facts'), 'synthesis authority boundary missing');
check(boot.includes('does not claim model-weight updates or cross-session learning') || read('changes/008-dss-state-strip.md').includes('does not claim model-weight updates or cross-session learning'), 'prompt-runtime DSS ceiling missing');
check(boot.includes('JIT Pruning Engine — CAP-JIT-001'), 'Kernel 1.7 JIT was not inherited');
check(boot.includes('RKI — Relational Knowledge Invariant'), 'Kernel 1.6 RKI was not inherited');
check(read('schema/capsule-v3.11.md').includes('All v3.10 fields remain'), 'schema v3.11 lineage missing');
check(read('schema/capsule-v3.10.md').includes('Kernel Track 1.6 carries capsule schema v3.10'), 'schema v3.10 historical reference changed');

process.stdout.write(`Kernel 1.8 conformance: ${passed}/${passed} PASS\n`);
