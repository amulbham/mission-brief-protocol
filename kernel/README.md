# MBP Kernel Track

This directory contains the clean, testable reconstruction of the Mission Brief Protocol kernel.

The Kernel Track begins with a faithful Kernel 1.0 baseline and advances through independently reviewed changes. Earlier MBP versions remain preserved elsewhere in this repository as historical and conceptual lineage.

## Current state

- Track status: Foundation
- Version: `0.0.0-foundation`
- Canonical boot prompt: not yet compiled
- Next milestone: reconstruct and seal Kernel 1.0

## Directory map

- `boot/` - compiled current boot prompt
- `modules/` - maintainable source sections
- `schema/` - capsule and protocol schemas
- `registry/` - invariant and component records
- `changes/` - approved version deltas
- `tests/` - conformance and regression evidence
- `scripts/` - deterministic build and validation tooling
- `releases/` - immutable version snapshots

See `AGENTS.md` for the operating contract and `../docs/kernel/` for explanatory documentation.
