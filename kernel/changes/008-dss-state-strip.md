# Change 008 — Dynamic Subroutine System and State Strip

## Status

APPROVED · FLASHED in Kernel 1.8 candidate · activation requires validation and merge

## Sources

- `MBP SPRINT UPDATE — Component 6 · Dynamic Subroutine System`, CAP-131-DSS v0.4, Amul Bham, 2026.
- Approved concise DSS state-strip flash from the Kernel integration session, 2026-09-19.

## Intent

Add capsule-precise specialized reasoning scopes without unnecessary PATH changes, preserve verified session learning, and make subroutine state visible without bloating the mini-map.

## Exact delta

1. Flash five CAP-131-DSS sub-components and the approved DSS display contract.
2. Preserve Mode 1 PATH loading while adding Mode 2 Tier 1 synthesis and Tier 2 registered precision tools.
3. Add the structural SYNTHESIS_GATE and block weak LOAD requests.
4. Add a session-scoped append-only synthesis cache with KNOWLEDGE-only enrichment and last-clean fallback.
5. Add immutable registered-tool governance and precision-risk handling.
6. Activate `TRANSIENT` as a relation status while preserving the nine-type RKI registry.
7. Add the concise, always-visible DSS state strip with a 180-character maximum.
8. Advance capsule schema v3.10 → v3.11 for the extended Subroutine syntax and relation-status vocabulary.

## Reconciliations

### Schema lineage

The source labels its additive schema delta v3.7 → v3.8. Kernel Track already reached v3.10, so the accepted syntax and TRANSIENT status advance monotonically to v3.11. Source schema identifiers remain provenance.

### TRANSIENT is status, not type

Kernel 1.7 deferred TRANSIENT pending DSS and described it imprecisely as a relation type. Kernel 1.8 resolves the ambiguity: VALIDATES and SCOPED_BY remain the RKI types; TRANSIENT is their lifecycle status. The active type registry remains nine entries.

### Unavailable legacy dependencies

The source cites CAP-009-SCHEMA, CAP-035, and PSAC Q3, none of which has independent Kernel Track authority. Kernel 1.8 preserves the intended behavior under CAP-131-DSS registry validation, a DSS-local META/DOMAIN boundary, and the existing unnumbered PSAC adversarial challenge.

### Dynamic synthesis authority

SYNTHESIS_GATE verifies field completeness, not truth. Synthesized scope can shape reasoning but cannot supply facts or satisfy verification. Cache enrichment is limited to clean KNOWLEDGE invocations.

### Prompt-runtime implementation

The cache and registry are governed logical state in KV-Scribe. They do not claim weight updates, model fine-tuning, or durable cross-session learning.

## Authority impact

Constitutional runtime and schema addition. DSS gains no factual, verification, topology, PATH, ledger-compilation, or output-generation authority.

## Version effect

Kernel `1.7` → `1.8`  
Capsule schema `v3.10` → `v3.11`
