# Kernel Track Changelog

## 1.2

- Flashed CAP-103 and replaced the prose Witness model with one mutually exclusive signal per capsule.
- Replaced `Witness Log` and `Witness Sign-off` with `Witness Signal` in capsule schema v3.4.
- Added deterministic VGATE receiver routes for CLEAR, TENSION, DRIFT, and DISCONTINUITY.
- Enforced non-overlapping Witness, VGATE, PSAC, and Logic Debugger jurisdictions.
- Corrected the PoT display example to hexadecimal without changing Change 001 behavior.

## 1.1

- Flashed `CAP-001-MINIMAP-LINEAGE` as the first post-baseline invariant.
- Required every sealed mini-map to display ledger-derived parent and current PoT projections.
- Defined the CAP-000 `GENESIS` exception and prohibited unresolved placeholders in runtime output.
- Preserved full SHA-256 values as ledger authority; the four-character values are display projections only.

## 1.0

- Established the canonical baseline from the original two-part boot prompt.
- Split the prompt into governed constitutional modules.
- Added the Kernel 1.0 invariant registry and capsule-schema reference.
- Added deterministic compilation, validation, source provenance, and an immutable release snapshot.
- Excluded all post-baseline changes so later versions remain inspectable deltas.

## 0.0.0-foundation

- Established the isolated Kernel Track namespace.
- Declared authority, documentation, testing, and release boundaries.
- Preserved all historical MBP repository material in place.
- No boot-prompt content or constitutional behavior changed.
