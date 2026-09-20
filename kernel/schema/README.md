# Kernel Schemas

This directory contains canonical field and relationship schemas used by the Kernel Track.

Schema changes require a numbered change record, focused tests, inherited regression tests, and documentation updates.

## Capsule schema surfaces

- `capsule-v3.11.md` records the active schema lineage and current v3.11 deltas.
- `capsule-fields-v3.11.json` is the structured field-level catalog for all 43 canonical field occurrences.
- `capsule-field-catalog.schema.json` defines the catalog document contract.
- `../modules/20-capsule-schema.md` remains the constitutional prompt source for the canonical field block.
- `../../docs/kernel/capsule-schema.md` is generated explanatory documentation and has no independent authority.

The catalog must preserve the exact field-label sequence in the canonical module. The two current `Name` occurrences use distinct stable catalog IDs rather than an unreviewed schema rename.

## Maintenance

```sh
node kernel/scripts/build-schema-guide.mjs
node kernel/tests/kernel-1.9-schema-catalog-conformance.mjs
node kernel/scripts/build-schema-guide.mjs --check
```

A field-semantic, grammar, or canonical-order change requires an explicit capsule-schema version decision. Documentation clarification that leaves those contracts unchanged does not advance the capsule-schema version.
