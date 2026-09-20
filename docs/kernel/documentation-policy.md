# Kernel Documentation Policy

Documentation explains active kernel behavior; it does not create authority.

## Documentation surfaces

1. `docs/kernel/component-index.md` maps each component to source, registry, tests, and explanatory documentation.
2. `docs/kernel/architecture.md` describes the system-level responsibility map.
3. `docs/kernel/governance.md` defines change classes and review expectations.
4. `docs/kernel/versioning.md` separates historical MBP versions from Kernel Track releases.
5. Numbered records under `kernel/changes/` explain every behavioral or authority delta.
6. `docs/kernel/capsule-schema.md` is generated from `kernel/schema/capsule-fields-v3.11.json`; direct edits are prohibited.
7. `docs/kernel/booting.md` explains profile use; boot authority remains in modules, registries, validated compiled artifacts, and release state.
8. `docs/kernel/prompt-style.md` governs generated presentation without modifying semantic source authority.

## Maintenance rule

A pull request that changes a public component contract must update, in the same revision:

- its numbered change record;
- authoritative module or schema;
- registry record;
- focused tests;
- component-index mapping;
- affected explanatory documentation;
- compiled boot and immutable release snapshot;
- version and changelog after validation passes.

`kernel/scripts/check-doc-drift.mjs` blocks ACTIVE components whose mapped paths are missing or unresolved.

`kernel/tests/kernel-1.9-schema-catalog-conformance.mjs` checks exact field order and catalog completeness. `kernel/scripts/build-schema-guide.mjs --check` blocks drift between the structured catalog and the generated human guide.

`kernel/scripts/build-boot-profiles.mjs --check` blocks candidate profile drift. `kernel/tests/kernel-1.9-boot-profiles-conformance.mjs` checks artifact hashes, guide binding, activation states, and full-versus-two-stage source coverage.

`kernel/tests/kernel-1.9-prompt-format-conformance.mjs` checks the single-H1 rule, Boot Identity placement, current title, source/compiled fragment hashes, whitespace normalization, and terminal newline.

## Status vocabulary

- `ACTIVE`: authoritative and validated in the current Kernel Track version
- `PLANNED`: approved direction without current authority
- `HISTORICAL`: retained as evidence but outside current authority
- `SUPERSEDED`: replaced by an explicit authority record

## Release documentation

Every release freezes the compiled boot, module order and hashes, compiled SHA-256, source manifest, validation evidence, documentation index, version record, and changelog state through Git history.
