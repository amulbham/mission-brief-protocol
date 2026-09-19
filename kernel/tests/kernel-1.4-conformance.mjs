import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.4/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.4/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.4.json'));
const sources = JSON.parse(read('registry/source-manifest-1.4.json'));
const cases = JSON.parse(read('tests/vsp-cases-1.4.json'));
const behavioralCases = JSON.parse(read('tests/vsp-directive-cases-1.4.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

const vspStatus = ({ required, verified, non_vsp: nonVsp }) => {
  if (verified < required) return 'UNVERIFIED';
  if (required === 0) return 'N/A';
  if (nonVsp > 0) return 'PARTIAL';
  return 'VERIFIED';
};

const directiveRoute = ({ harm_adjacent: harmAdjacent, aggregate_verified: aggregateVerified }) => {
  if (!harmAdjacent) return 'CLEAR';
  return aggregateVerified ? 'RESOLVED' : 'PENDING_EXTERNAL';
};

const recallRoute = ({ status, claim_pointer: claimPointer }) => {
  if (status === 'UNVERIFIED') return 'FLAG';
  if (status === 'PARTIAL' && !claimPointer) return 'FLAG';
  return 'CLEAN';
};

check(read('VERSION').trim() === '1.4', 'VERSION must be 1.4');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.4', 'module manifest must be 1.4');
check(JSON.parse(read('modules/manifest.json')).modules.includes('35-verification-sufficiency.md'), 'VSP module missing from build order');
check(boot === release, 'current boot and 1.4 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.4 digest must match release manifest');
check(registry.kernel_version === '1.4', 'delta registry version must be 1.4');
check(registry.status === 'FLASHED', 'VSP must be flashed');
check(registry.flash_capsules.includes('CAP-034-VSP-COMPLETE'), 'CAP-034 flash missing');
check(registry.supersedes.includes('CAP-031-VSP'), 'CAP-031 supersession missing');
check(registry.records.find(record => record.id === 'VSP-CLAUSE-4').firing_point === 'post-Directive, pre-Logic Debugger', 'Clause 4 firing point changed');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'VSP source authority must be recorded');
check(sources.canonical_source.source_schema === 'v3.6.1', 'VSP source schema provenance changed');
check(sources.activation_boundary === 'Kernel 1.4 merge', 'activation boundary must be explicit');
check(sources.supporting_evidence.role === 'HISTORICAL_FIXTURE_INSPIRATION_ONLY', 'historical report authority is overstated');

for (const fixture of cases) {
  check(vspStatus(fixture) === fixture.expected, `VSP status mismatch for ${fixture.id}`);
}

for (const fixture of behavioralCases.directive_cases) {
  check(directiveRoute(fixture) === fixture.expected, `Clause 4 route mismatch for ${fixture.id}`);
}

for (const fixture of behavioralCases.recall_cases) {
  check(recallRoute(fixture) === fixture.expected, `recall route mismatch for ${fixture.id}`);
}

for (const token of [
  'Schema Version: v3.8',
  'VSP — Verification Sufficiency Principle',
  'CAP-034-VSP-COMPLETE',
  'Clause 1 — Path Requirement',
  'Clause 2 — Harm Adjacency Rule',
  'Clause 3 — Local Knowledge Rule',
  'Clause 4 — Directive Harm Check',
  'VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]',
  'UNVERIFIED`: at least one VSP-triggering claim lacks required Path A or Path B',
  'CLAUSE_4_TRIGGERED',
  'CLAUSE_4_RESOLVED',
  'Aggregate TRIVIAL facts do not self-certify',
  'Residue Type is `PENDING_EXTERNAL` because aggregate verification is insufficient',
  'verification_sufficiency=true',
  '🛡️ VSP: [UNVERIFIED | PARTIAL]',
  'Kernel 1.4'
]) check(boot.includes(token), `VSP contract missing: ${token}`);

const directiveIndex = boot.indexOf('Directive forms; VSP Clause 4');
const debuggerIndex = boot.indexOf('Logic Debugger audits the completed');
check(directiveIndex >= 0 && debuggerIndex > directiveIndex, 'Clause 4 must precede Logic Debugger');
check(boot.indexOf('VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]') > boot.indexOf('Tags: [Slot 1 optional structural'), 'VSP_Status must follow Tags');
check(boot.indexOf('SHA-256: [hash of all preceding fields') > boot.indexOf('VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]'), 'VSP_Status must precede SHA-256');
check((boot.match(/^VSP_Status: \[VERIFIED/mg) || []).length === 1, 'VSP_Status schema declaration must appear once');
check(read('schema/capsule-v3.8.md').includes('UNVERIFIED → N/A → PARTIAL → VERIFIED'), 'schema v3.8 status precedence missing');
check(read('schema/capsule-v3.7.md').includes('Tags field'), 'schema v3.7 historical reference changed');
check(boot.includes('CAP-027-TAG-VGATE'), 'Kernel 1.3 TAG stack was not inherited');
check(boot.includes('CAP-103 Flag-Only Observer'), 'Kernel 1.2 Witness was not inherited');

for (const token of [
  'CAP-014-SCF',
  'VGATE-R',
  'Relational Knowledge Invariant',
  'Dynamic Subroutine System',
  'M1:'
]) {
  if (token === 'CAP-014-SCF') {
    check(boot.includes('LATENT until CAP-014-SCF'), 'existing TAG dependency must remain explicit');
  } else {
    check(!boot.includes(token), `later-version feature leaked into Kernel 1.4: ${token}`);
  }
}

process.stdout.write(`Kernel 1.4 conformance: ${passed}/${passed} PASS\n`);
