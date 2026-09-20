# Versioning

The repository contains distinct version namespaces.

## Historical MBP lineage

Existing MBP v3.x and v4.x materials record earlier conceptual and operational development. They remain preserved under their original names and history.

## Kernel Track lineage

The clean boot-prompt reconstruction begins at Kernel `1.0` and advances through independently reviewable deltas: `1.1`, `1.2`, and so forth. Git tags use `kernel-v1.0`, `kernel-v1.1`, and equivalent names.

The capsule schema retains its own identifier (`v3.3` in Kernel 1.0). Kernel Track version and capsule-schema version must not be conflated.

Kernel 1.1 is the first behavioral delta: Change 001 requires explicit parent-to-current PoT projections in every sealed mini-map. Kernel 1.0 remains immutable under `kernel/releases/1.0/`.

Kernel 1.2 applies Change 002, replacing the prose Witness with the CAP-103 flag-only model and advancing the capsule schema from v3.3 to v3.4. Earlier release snapshots remain immutable.

Kernel 1.3 applies Change 003, adding the TAG governance and Thematic Index stack and advancing the capsule schema from v3.4 to v3.7. Trigger T3 remains dependency-latent until SCF is introduced.

Kernel 1.4 applies Change 004, flashing CAP-034-VSP-COMPLETE, adding the Clause 4 Directive harm check and VSP_Status recall integrity, and advancing the capsule schema from v3.7 to v3.8. The source specification's v3.6.1 identifier remains recorded as provenance rather than replacing the active schema.

Kernel 1.5 applies Change 005, flashing CAP-014-SCF, adding KV-Scribe-derived ambient session context before IC-Node, activating Dynamic Vector Trigger T3, and advancing the capsule schema from v3.8 to v3.9. The source specification's v3.5 identifier remains provenance.

Kernel 1.6 applies Change 006, flashing CAP-011-RKI and VGATE-R, governing nine typed relation semantics across Mesh Edges and DAG Links, and advancing the capsule schema from v3.9 to v3.10. It defines the preservation boundary for later JIT pruning without activating JIT.

Kernel 1.7 applies Change 007, flashing the five CAP-JIT-001 components, adding RKI-governed SOC-surface pruning and the runtime-configured Integrity Watchdog. Capsule schema remains v3.10 because JIT executes after seal and adds no capsule field.

Kernel 1.8 applies Change 008, flashing CAP-131-DSS, adding capsule-precise Tier 1 synthesis, immutable Tier 2 precision tools, a session synthesis cache, TRANSIENT relation status, and the approved DSS state strip. The capsule schema advances from v3.10 to v3.11.

A version is active only after focused and inherited validation pass, its registry is sealed, its compiled boot matches the source modules, and its immutable release snapshot matches the compiled digest.

## Post-1.8 stabilization review — queued

After Kernel 1.8 merges, pause feature integration for a documentation and structure review:

1. Publish a formal capsule-schema specification with field-by-field semantics, authority, source, timing, cardinality, and failure behavior.
2. Perform a boot-prompt formatting and consistency pass without silently changing constitutional behavior.
3. Inventory the repository and explain the purpose, authority, and lifecycle of every top-level and Kernel Track folder.
4. Identify duplicated, transitional, or over-granular files and propose a simplification plan that preserves immutable releases and provenance.
