# Kernel 1.9 Implementation Plan

Status: `PLANNED`  
Working name: **Distribution and Documentation Architecture**  
Baseline: Kernel `1.8`, capsule schema `v3.11`

Kernel 1.9 will make the current kernel easier to boot, inspect, and maintain without weakening the authority chain established through Kernel 1.8.

## Goals

1. Provide a formal, maintainable guide to every capsule field.
2. Preserve the complete boot prompt while adding a smaller two-stage boot path.
3. Make active, generated, explanatory, release, and historical repository surfaces unmistakable.
4. Enforce documentation and profile parity through deterministic validation.
5. Apply a consistent formatting system to current prompt artifacts.

## Non-goals

- No Kernel 1.8 runtime feature will be removed or weakened.
- No existing release snapshot will be modified.
- Historical prompt and runtime material will not be silently imported, modernized, or deleted.
- The slim profile will not replace the full profile.
- Documentation will not become a source of constitutional authority.
- Capsule schema `v3.11` will not be incremented unless field semantics or canonical field order actually change.

## Target boot artifacts

| Artifact | Function | Readiness authority |
|---|---|---|
| `kernel/boot/MBP_KERNEL_BOOT.md` | Complete self-contained distribution | May complete full boot directly |
| `kernel/boot/MBP_KERNEL_BOOT_SLIM.md` | Stage-A constitution, loader contract, source identity, and guide requirement | May emit `BOOTSTRAP_READY`; may not emit `KERNEL_READY` |
| `kernel/boot/MBP_KERNEL_BOOT_GUIDE.md` | Stage-B operational component, schema, verification, relation, and display contract | May complete activation only after version and digest verification |
| `kernel/boot/profiles.json` | Machine-readable profile membership, ordering, version, and digest bindings | Build and validation input |
| `docs/kernel/booting.md` | Human usage, sequencing, examples, and failure recovery | Explanatory only |

### Two-stage activation contract

1. The slim artifact loads the constitutional bootstrap subset and the expected guide identity.
2. The slim artifact emits `BOOTSTRAP_READY` with kernel version and expected guide digest.
3. The guide is supplied as the next boot input.
4. The runtime verifies guide version, digest, profile identity, and required component coverage.
5. Only then are guide-defined invariants flashed and `KERNEL_READY` permitted.
6. Missing, mismatched, truncated, or reordered guide input blocks full readiness.

The combined two-stage path must be operationally equivalent to the full profile. It need not be byte-identical.

## Capsule schema deliverables

### Structured catalog

Add `kernel/schema/capsule-fields-v3.11.json` as the field-level source for documentation and validation. Each field record must define:

- canonical name and order;
- semantic purpose;
- owning component;
- lifecycle phase;
- source and accepted grammar;
- cardinality or length constraint;
- verification threshold;
- mutability and hash inclusion;
- block or fault condition;
- display exposure;
- introduced and superseded versions;
- valid and invalid examples where useful.

### Human guide

Add `docs/kernel/capsule-schema.md`, organized by lifecycle:

1. Causal entry
2. Identity and lineage
3. Scope and execution
4. Facts and verification
5. Closure and residue
6. Insight, directive, and logic audit
7. Governance, operations, and audit history
8. Relationships and tags
9. Status, closure time, and final seal

The guide may be generated from the catalog or checked against it, but it may not maintain an independent field list.

## Work packages

### WP-1 — Authority baseline

Deliverables:

- repository authority and drift map;
- locked scope, non-goals, and release gates;
- documentation index entry.

Gate: no runtime or authority behavior changes.

### WP-2 — Formal capsule field specification

Deliverables:

- field catalog;
- complete human capsule-schema guide;
- catalog schema and validation script;
- exact field-set, order, and documentation parity tests.

Gate: every canonical field appears exactly once; no undocumented or orphaned field passes.

### WP-3 — Boot profile architecture

Deliverables:

- profile manifest;
- explicit full, slim, and guide membership;
- two-stage state machine and digest binding;
- build support for all profiles.

Gate: the slim profile cannot legally produce `KERNEL_READY` without a matching guide.

### WP-4 — Source and formatting refactor

Deliverables:

- minimal module splits needed for profile compilation;
- heading, table, code-block, terminology, and line-wrap conventions;
- deterministically generated full, slim, and guide artifacts.

Gate: no semantic loss against Kernel 1.8 and no hand-maintained duplication across profiles.

### WP-5 — Repository navigation

Deliverables:

- current root navigation;
- `docs/kernel/repository-map.md`;
- boot and schema README updates;
- historical-status routing for older root, `prompt/`, and `runtime/` surfaces;
- repaired internal links.

Gate: a new reader can identify the current kernel, current schema, current boot choices, and historical material from the root page.

### WP-6 — Validation and release

Deliverables:

- inherited Kernel 1.0–1.8 regression run;
- boot-profile conformance tests;
- schema and documentation parity tests;
- immutable Kernel 1.9 artifacts and manifest;
- version, changelog, component index, and validation evidence updates.

Gate: source, registry, schemas, tests, documentation, compiled artifacts, release manifest, and Git history agree.

## Required acceptance tests

1. `FULL_BOOT_CONTAINS_ALL_ACTIVE_INVARIANTS`
2. `SLIM_BOOT_STOPS_AT_BOOTSTRAP_READY`
3. `SLIM_REJECTS_MISSING_GUIDE`
4. `SLIM_REJECTS_WRONG_GUIDE_VERSION`
5. `SLIM_REJECTS_WRONG_GUIDE_DIGEST`
6. `SLIM_PLUS_GUIDE_COVERS_FULL_ACTIVE_REGISTRY`
7. `EVERY_SCHEMA_FIELD_HAS_ONE_CATALOG_RECORD`
8. `CATALOG_ORDER_MATCHES_CANONICAL_SCHEMA`
9. `HUMAN_GUIDE_COVERS_CATALOG`
10. `HISTORICAL_RELATION_TYPES_CANNOT_ENTER_ACTIVE_REGISTRY`
11. `RELEASE_ARTIFACTS_MATCH_MANIFEST_DIGESTS`
12. `KERNEL_1_0_THROUGH_1_8_REGRESSIONS_PASS`

## Commit and review strategy

Use small, reversible pull requests:

1. `docs(kernel): establish 1.9 authority baseline`
2. `feat(schema): add canonical capsule field catalog`
3. `feat(boot): add governed boot profiles`
4. `refactor(kernel): normalize profile-ready source formatting`
5. `docs(repo): clarify active and historical surfaces`
6. `release(kernel): publish Kernel 1.9`

Each pull request must satisfy its own focused gates and leave `main` coherent. Kernel 1.9 is not declared active until WP-6 closes.

## Version decision

This program is a minor Kernel Track release rather than a documentation-only patch because the two-stage boot adds a new activation interface and new build/validation contracts. The capsule schema remains `v3.11` unless implementation evidence requires a field-level semantic change.

## Completion condition

Kernel 1.9 closes only when both boot paths are verified, every capsule field is traceably documented, all repository authority boundaries are visible, inherited regression tests pass, and immutable release artifacts match their recorded digests.
