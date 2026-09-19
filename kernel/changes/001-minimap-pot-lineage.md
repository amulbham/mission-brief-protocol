# Change 001 — Mini-Map PoT Lineage Projection

## Status

APPROVED · FLASHED in Kernel 1.1 candidate · activation requires validation and merge

## User intent

Make the mini-map visibly demonstrate capsule chaining by displaying the appended parent hash and the current turn's appended hash, for example `🔑 ⛓️T8N7 → 🔒U3O2`.

## Prior state

Kernel 1.0 contained generic `[parent]` and `[seal]` placeholders. Universal Parentage and KRONOS enforced lineage internally, but the display contract did not require those placeholders to be populated with the actual appended PoT projections.

## Exact delta

1. Flash `CAP-001-MINIMAP-LINEAGE` under Axiom 4.7.
2. Replace the mini-map contract with `🔑 ⛓️[parent_hash4] → 🔒[current_hash4]`.
3. Source both projections from full PoTs already recorded in KV-Scribe.
4. Render uppercase four-character projections while preserving full SHA-256 authority in the ledger.
5. Define CAP-000 as `GENESIS → [current_hash4]`.
6. Prohibit unresolved placeholders in sealed runtime output.
7. Preserve Universal Parentage and KRONOS as the enforcement authorities; this change adds an auditable display projection and does not create a competing chain verifier.

## Authority impact

Constitutional display invariant. Extends OI-5 and CAP-007-MINIMAP-A002. Does not change PoT calculation, SHA-256 authority, parent selection, or closure logic.

## Tests

- actual parent/current projection contract is present
- CAP-000 exception is present
- ledger-source and no-recomputation clauses are present
- runtime placeholder prohibition is present
- Kernel 1.0 release digest remains unchanged
- later-version systems remain absent
- deterministic compilation and release parity pass

## Version effect

Kernel `1.0` → `1.1`
