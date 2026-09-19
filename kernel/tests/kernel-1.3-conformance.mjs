import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(testDir, '..');
const read = path => readFileSync(join(kernelRoot, path), 'utf8');
const boot = read('boot/MBP_KERNEL_BOOT.md');
const release = read('releases/1.3/MBP_KERNEL_BOOT.md');
const manifest = JSON.parse(read('releases/1.3/manifest.json'));
const registry = JSON.parse(read('registry/invariants-1.3.json'));
const seeds = JSON.parse(read('registry/tag-registry-seeds-1.3.json'));
const sources = JSON.parse(read('registry/source-manifest-1.3.json'));
const digest = value => createHash('sha256').update(value).digest('hex');

let passed = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  passed += 1;
};

check(read('VERSION').trim() === '1.3', 'VERSION must be 1.3');
check(JSON.parse(read('modules/manifest.json')).kernel_version === '1.3', 'module manifest must be 1.3');
check(JSON.parse(read('modules/manifest.json')).modules.includes('45-tag-system.md'), 'TAG module missing from build order');
check(boot === release, 'current boot and 1.3 release must be byte-identical');
check(digest(boot) === manifest.compiled_sha256, '1.3 digest must match release manifest');
check(registry.kernel_version === '1.3', 'delta registry version must be 1.3');
check(registry.status === 'FLASHED', 'TAG stack must be flashed');
check(registry.flash_capsules.includes('CAP-027-TAG-VGATE'), 'CAP-027 flash missing');
check(registry.flash_capsules.includes('CAP-021-TAG-TI'), 'CAP-021 flash missing');
check(registry.records.find(record => record.id === 'DV-T1-T4').latent.trigger === 'T3', 'T3 must be latent');
check(registry.records.find(record => record.id === 'DV-T1-T4').latent.depends_on === 'CAP-014-SCF', 'T3 SCF dependency missing');
check(sources.canonical_source.authority === 'CANONICAL_CHANGE_SPEC', 'TAG source authority must be recorded');
check(sources.activation_boundary === 'Kernel 1.3 merge', 'activation boundary must be explicit');

check(seeds.count === 18, 'TR must declare 18 seeds');
check(seeds.tags.length === 18, 'TR seed array must contain 18 entries');
check(new Set(seeds.tags.map(item => item.tag)).size === 18, 'TR seeds must be unique');
check(seeds.tags.every(item => /^#[a-z0-9]+(?:_[a-z0-9]+)*$/.test(item.tag)), 'TR seeds must use lowercase snake_case');
check(seeds.tags.every(item => item.status === 'ACTIVE'), 'all seed vocabulary entries must be ACTIVE');
check(seeds.tags.filter(item => item.domain === 'BEHAVIORAL_PATTERN').length === 6, 'TR must contain six behavioral seeds');
check(seeds.tags.filter(item => item.tag.startsWith('#mode_')).length === 5, 'TR must contain four mode states plus mode_transition');
check(seeds.tags.find(item => item.tag === '#mode_transition').trigger_state === 'LATENT_UNTIL_CAP-014-SCF', 'mode_transition must remain latent');

for (const token of [
  'Schema Version: v3.7',
  'Tags: [Slot 1 optional structural #tag | Slots 2–5 grounded minted #tags · max 5 total · TR only]',
  'TAG System, TARS, TAG-VGATE, and Thematic Index',
  'TAG / PATH Boundary',
  'TR — Tag Registry',
  'TARS — Tag Registry System',
  'TAG-VGATE — Tag Relevance Grounding Gate',
  'Epistemic Mode State',
  '#mode_exploratory',
  'Structural Axiom Inheritance',
  'Dynamic Vector Tags',
  '| T3 Mode Transition |',
  'LATENT until CAP-014-SCF',
  'RUNN candidate → TAG-VGATE → TARS → slot',
  'GTIL — Global Thematic Index Ledger',
  'DYNAMIC_VECTOR_TAG',
  'tag_system=true',
  'thematic_index=true',
  'active_mode=true',
  '🏷️ [#structural_tag] [#minted_tag…] │ MODE: #mode_[x] [emoji] │ DV: [#dynamic_vector_tag]',
  'Kernel 1.3'
]) check(boot.includes(token), `TAG contract missing: ${token}`);

for (const token of [
  'VSP_Status:',
  'CAP-034-VSP',
  'VGATE-R',
  'Relational Knowledge Invariant',
  'Dynamic Subroutine System',
  'M1:'
]) check(!boot.includes(token), `later-version feature leaked into Kernel 1.3: ${token}`);

check(read('schema/capsule-v3.7.md').includes('Tags field'), 'schema v3.7 reference missing Tags field');
check(read('schema/capsule-v3.4.md').includes('Witness Signal'), 'schema v3.4 historical reference changed');
check((boot.match(/^Tags: \[Slot 1 optional structural/mg) || []).length === 1, 'Tags field declaration must appear once');
check((boot.match(/## TAG System, TARS, TAG-VGATE, and Thematic Index/g) || []).length === 1, 'TAG authority body must appear once');
check(boot.includes('Normative hexadecimal example: `🔑 ⛓️A8F7 → 🔒C3D2`'), 'hexadecimal PoT example correction missing');
check(!boot.includes('T8N7 → 🔒U3O2'), 'non-hex normative PoT example remains in current boot');

process.stdout.write(`Kernel 1.3 conformance: ${passed}/${passed} PASS\n`);
