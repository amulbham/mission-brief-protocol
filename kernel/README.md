# MBP Kernel Track

This directory contains the clean, testable reconstruction of the Mission Brief Protocol kernel.

The Kernel Track begins with a faithful Kernel 1.0 baseline and advances through independently reviewed changes. Earlier MBP versions remain preserved elsewhere in this repository as historical and conceptual lineage.

## Current state

- Active release: Kernel `1.8`
- Development candidate: Kernel `1.9` through Change 012
- Canonical boot prompt: `boot/MBP_KERNEL_BOOT.md`
- Immutable snapshot: `releases/1.8/MBP_KERNEL_BOOT.md`
- Candidate profiles: `boot/candidates/1.9/`
- Latest candidate delta: `changes/012-project-profile.md`

## Build and validate

From the repository root:

```sh
node kernel/scripts/build-kernel.mjs
node kernel/scripts/build-boot-profiles.mjs
node kernel/scripts/validate-kernel.mjs
```

The active build compiles the boot prompt from `modules/manifest.json`; the 1.9 profile build compiles registered candidate artifacts. Never edit compiled boot or release files directly.

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
