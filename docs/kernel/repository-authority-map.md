# Repository Authority and Drift Map

Status: `ACTIVE DOCUMENTATION`  
Baseline: Kernel `1.8` at `main@0f34e2ce199c686095ecd67aeb14db4a8d957f9b`  
Purpose: identify which repository surfaces govern the active Kernel Track and which are retained as historical evidence.

This document explains authority; it does not create constitutional authority. If it conflicts with an authoritative Kernel Track source, the authoritative source governs and the discrepancy is a tracked defect.

## Active authority chain

The current Kernel Track resolves conflicts in this order:

1. Constitutional modules and flashed invariant records
2. Capsule, relation, and component schemas
3. Approved numbered change records
4. Conformance and regression evidence
5. Deterministically compiled boot output
6. Explanatory Kernel Track documentation

This order is inherited from `kernel/AGENTS.md`. Generated output and documentation may compile or explain higher layers, but they may not silently redefine them.

## Surface classification

| Surface | Classification | Current role | Mutation rule |
|---|---|---|---|
| `kernel/modules/` | AUTHORITATIVE | Maintainable constitutional and runtime source | Change only through a numbered kernel change with tests |
| `kernel/registry/` | AUTHORITATIVE | Machine-readable invariant, policy, type, status, and source records | Version records; do not silently rewrite inherited state |
| `kernel/schema/` | AUTHORITATIVE | Capsule and protocol schema lineage | Schema changes require change record, tests, and documentation |
| `kernel/changes/` | AUTHORITATIVE RECORD | Approved behavioral and authority deltas | Append the next numbered record |
| `kernel/tests/` | VERIFICATION EVIDENCE | Current conformance and inherited regression gates | Preserve inherited tests; add focused cases for new contracts |
| `kernel/boot/` | GENERATED CURRENT OUTPUT | Current distributable boot artifacts | Never hand-edit compiled artifacts |
| `kernel/releases/` | IMMUTABLE SNAPSHOT | Frozen release prompts, manifests, and digests | Never alter an existing release directory |
| `kernel/scripts/` | BUILD AND VALIDATION | Deterministic compilation and enforcement | Changes require regression coverage |
| `docs/kernel/` | EXPLANATORY | Human and agent guidance for the active Kernel Track | Must remain traceable to authoritative sources |
| Root `AGENTS.md` | REPOSITORY GOVERNANCE | Defines preservation and Kernel Track boundaries | Update only when repository governance changes |
| Root conceptual documents | HISTORICAL | Pre-Kernel theory and architecture lineage | Preserve; label rather than silently modernize |
| `prompt/` | HISTORICAL | Earlier prompt distributions and public variants | Preserve provenance; do not treat as current Kernel Track input |
| `runtime/` | HISTORICAL IMPLEMENTATION | Earlier runtime and skill experiment | Preserve; do not import without explicit reconciliation |

## Verified drift inventory

The following items do not invalidate Kernel 1.8. They are presentation and authority-discovery risks outside the active kernel source chain.

| ID | Surface | Observed drift | Risk | Planned treatment |
|---|---|---|---|---|
| D-01 | Root `README.md` | Presents MBP `v4.7` as the current repository state and links to paths that are absent or relocated | A reader may miss the Kernel Track or follow broken links | Replace the root landing page with current navigation while preserving historical claims in clearly labeled lineage material |
| D-02 | Root `SCHEMA.md` | Describes an older schema and older parent-hash, relation, and canonical-order rules | Competing schema authority | Add a historical-status banner and route current readers to `kernel/schema/` and the new field guide |
| D-03 | `MBP_Core_Systems_Reference.md` | Describes an older system and schema generation | Competing component reference | Mark historical and route to the Kernel component index |
| D-04 | `runtime/` | Its boot material describes a different active component set and retired relation vocabulary | Runtime ambiguity and illegal cross-track import | Classify the whole subtree as historical unless a future change explicitly revives it |
| D-05 | `prompt/` | Earlier prompt files are not visibly separated from current boot artifacts at repository entry points | Distribution ambiguity | Add historical navigation without rewriting source artifacts |
| D-06 | `kernel/schema/` | Version files record schema lineage but do not define every field in a maintainable field catalog | Documentation cannot be checked field by field | Add a machine-readable field catalog and a generated or validated human guide |
| D-07 | `kernel/boot/MBP_KERNEL_BOOT.md` | Complete and logically ordered, but approximately 10,000 words combine boot, reference, runtime, schema, and display concerns | High boot cost and poor operational ergonomics | Retain full output and add governed SLIM+GUIDE and character-bounded PROJECT profiles |

## Boundary decisions

1. Kernel `1.8` is the frozen implementation baseline for Kernel `1.9` work.
2. Historical surfaces remain evidence. They will not be moved, deleted, or silently rewritten during the Kernel `1.9` program.
3. The full compiled boot remains a canonical distribution artifact.
4. A slim boot may establish bootstrap authority only. It may not claim full kernel readiness before the matching guide is verified and loaded.
5. The supplemental machine guide is normative compiled output, not explanatory documentation.
6. Human boot and schema guides remain explanatory and cannot independently flash an invariant.
7. Capsule field documentation will be checked against one structured field catalog.
8. PROJECT is a direct-activation compact interface; PROJECT_REFERENCE is optional elaboration and cannot independently flash authority.

## Remediation sequence

1. Formalize the capsule field catalog and its parity checks.
2. Define boot profiles, stage boundaries, and digest binding.
3. Refactor source boundaries only where deterministic profile compilation requires it.
4. Generate and validate FULL, SLIM, GUIDE, PROJECT, and PROJECT_REFERENCE artifacts.
5. Update repository navigation and add historical-status routing.
6. Freeze Kernel `1.9` release artifacts only after inherited and new validation gates pass.

## Re-open triggers

Re-open this map when any of the following occurs:

- a new apparent source of current kernel authority is added;
- a historical surface is proposed for import into the Kernel Track;
- build output can no longer be traced to authoritative source;
- the schema guide and canonical field set diverge;
- a boot profile changes its activation boundary.
