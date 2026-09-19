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

A version is active only after focused and inherited validation pass, its registry is sealed, its compiled boot matches the source modules, and its immutable release snapshot matches the compiled digest.
