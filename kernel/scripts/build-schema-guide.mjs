import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..', '..');
const catalogPath = resolve(repoRoot, 'kernel/schema/capsule-fields-v3.11.json');
const guidePath = resolve(repoRoot, 'docs/kernel/capsule-schema.md');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

const groupNames = {
  causal_entry: 'Causal entry',
  identity_lineage: 'Identity and lineage',
  scope_execution: 'Scope and execution',
  epistemic_state: 'Epistemic state',
  verification: 'Verification and logic audit',
  compilation: 'Compilation and execution',
  audit: 'Audit and lifecycle',
  relations: 'Relationships and DAG state',
  thematic_state: 'Thematic state',
  verification_integrity: 'Verification integrity',
  seal: 'Seal'
};

const groupOrder = [...new Set(catalog.fields.map(field => field.group))];
const inline = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');

export function renderSchemaGuide() {
  const lines = [
    '# Capsule Schema Field Guide',
    '',
    '<!-- GENERATED FILE: edit kernel/schema/capsule-fields-v3.11.json, then run node kernel/scripts/build-schema-guide.mjs -->',
    '',
    `Status: \`ACTIVE DOCUMENTATION\`  `,
    `Kernel baseline: \`${catalog.kernel_baseline}\`  `,
    `Capsule schema: \`${catalog.capsule_schema_version}\`  `,
    `Catalog version: \`${catalog.catalog_version}\``,
    '',
    'This guide explains the canonical capsule fields for humans and agents. The structured field catalog is the field-level source; CAP-000-CS, active modules, schemas, and flashed invariants remain the governing authority.',
    '',
    '## Maintenance contract',
    '',
    '- Edit `kernel/schema/capsule-fields-v3.11.json`, not this generated file.',
    '- Keep the catalog label sequence identical to the schema block in `kernel/modules/20-capsule-schema.md`.',
    '- Run `node kernel/scripts/build-schema-guide.mjs` after catalog changes.',
    '- Run `node kernel/tests/kernel-1.9-schema-catalog-conformance.mjs` before commit.',
    '- A field-semantic or canonical-order change requires an explicit capsule-schema version decision.',
    '',
    '## Canonical field order',
    '',
    '| # | Field | Stable ID | Group | Lifecycle | Included in PoT input |',
    '|---:|---|---|---|---|---|'
  ];

  for (const field of catalog.fields) {
    const label = field.occurrence > 1 ? `${field.label} (${field.occurrence})` : field.label;
    lines.push(`| ${field.ordinal} | ${inline(label)} | \`${field.id}\` | ${groupNames[field.group]} | \`${field.lifecycle}\` | ${field.hash_inclusion ? 'Yes' : 'No'} |`);
  }

  lines.push(
    '',
    'The schema currently contains two fields labeled `Name`. The catalog preserves the canonical labels and distinguishes them with stable IDs: `capsule_name` and `scope_name`. Removing or renaming either requires a reviewed schema change.',
    '',
    '## Field reference'
  );

  for (const group of groupOrder) {
    lines.push('', `## ${groupNames[group]}`, '');
    for (const field of catalog.fields.filter(entry => entry.group === group)) {
      const label = field.occurrence > 1 ? `${field.label} — occurrence ${field.occurrence}` : field.label;
      lines.push(
        `### ${field.ordinal}. ${label} (\`${field.id}\`)`,
        '',
        `- **Purpose:** ${field.purpose}`,
        `- **Owner:** ${field.owner}`,
        `- **Lifecycle:** \`${field.lifecycle}\``,
        `- **Source:** ${field.source}`,
        `- **Grammar:** ${field.grammar}`,
        `- **Cardinality:** ${field.cardinality}`,
        `- **Verification:** ${field.verification}`,
        `- **Mutability:** ${field.mutability}`,
        `- **PoT input:** ${field.hash_inclusion ? 'Included.' : 'Not included; this field is the resulting seal.'}`,
        `- **Failure condition:** ${field.failure_condition}`,
        `- **Display:** ${field.display}`,
        `- **Lineage:** introduced \`${field.introduced}\`; last changed \`${field.last_changed}\`${field.superseded ? `; superseded by \`${field.superseded}\`` : '; active'}.`
      );
      if (field.examples?.valid) lines.push(`- **Valid example:** \`${inline(field.examples.valid)}\``);
      if (field.examples?.invalid) lines.push(`- **Invalid example:** \`${inline(field.examples.invalid)}\``);
      if (field.notes) lines.push(`- **Note:** ${field.notes}`);
      lines.push('');
    }
  }

  lines.push(
    '## Lifecycle summary',
    '',
    '| Lifecycle | Meaning |',
    '|---|---|',
    '| `pre_open` | Captured before capsule opening or topology execution. |',
    '| `open` | Resolved while establishing identity, scope, lineage, and execution state. |',
    '| `reasoning` | Written or appended during governed reasoning. |',
    '| `pre_closure` | Evaluated after directive formation and before seal authority is granted. |',
    '| `closure` | Written or finalized only as the capsule closes. |',
    '| `post_closure` | Reserved for state written after closure; no current v3.11 field uses this phase. |',
    '',
    '## Hash boundary',
    '',
    `Fields 1 through ${catalog.field_count - 1} are serialized in canonical order as the SHA-256 input. Field ${catalog.field_count}, \`SHA-256\`, contains the resulting digest and is not recursively included in itself. Any reordering, omission, or semantic field change produces a different PoT and requires schema review.`,
    ''
  );

  return lines.join('\n');
}

const rendered = renderSchemaGuide();
if (process.argv.includes('--check')) {
  const existing = readFileSync(guidePath, 'utf8');
  if (existing !== rendered) {
    process.stderr.write('Capsule schema guide drift detected. Run node kernel/scripts/build-schema-guide.mjs\n');
    process.exitCode = 1;
  } else {
    process.stdout.write('Capsule schema guide parity: PASS\n');
  }
} else {
  writeFileSync(guidePath, rendered, 'utf8');
  process.stdout.write(`Wrote ${guidePath}\n`);
}
