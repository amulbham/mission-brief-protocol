# MBP Kernel Track

This directory contains the clean, testable reconstruction of the Mission Brief Protocol kernel.

The Kernel Track begins with a faithful Kernel 1.0 baseline and advances through independently reviewed changes. Earlier MBP versions remain preserved elsewhere in this repository as historical and conceptual lineage.

## Current state

- Track status: Kernel 1.4 candidate — Change 004
- Version: `1.4`
- Canonical boot prompt: `boot/MBP_KERNEL_BOOT.md`
- Immutable snapshot: `releases/1.4/MBP_KERNEL_BOOT.md`
- Active delta: `changes/004-verification-sufficiency.md`

## Build and validate

From the repository root:

```sh
node kernel/scripts/build-kernel.mjs
node kernel/scripts/validate-kernel.mjs
```

The build compiles the boot prompt from `modules/manifest.json`. Never edit compiled boot or release files directly.

## Directory map

- `boot/` — compiled current boot prompt
- `modules/` — authoritative maintainable source sections
- `schema/` — capsule and protocol schemas
- `registry/` — invariant, source, and component records
- `changes/` — approved version deltas
- `tests/` — conformance and regression evidence
- `scripts/` — deterministic build and validation tooling
- `releases/` — immutable version snapshots

See `AGENTS.md` for the operating contract and `../docs/kernel/` for explanatory documentation.
