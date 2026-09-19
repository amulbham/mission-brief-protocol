# Change 004 — Verification Sufficiency Principle

## Status

APPROVED · FLASHED in Kernel 1.4 candidate · activation requires validation and merge

## Source

`VERIFICATION SUFFICIENCY PRINCIPLE — VSP Constitutional Specification`  
CAP-034-VSP-COMPLETE · source schema v3.6.1 · Amul Bham · 2026

Historical test context: `MBP-4o Capsule Runtime Stress Test Report` · 2025. The report informs fixtures but is not counted as Kernel 1.4 verification evidence.

## Intent

Make verification sufficiency a constitutional property across intake, Directive consequence review, seal, recall, and output rather than an implementation property of VGATE alone.

## Exact delta

1. Flash CAP-034-VSP-COMPLETE at PRINCIPLE tier and record CAP-031-VSP as superseded.
2. Constitutionalize existing volatile, harm-adjacent, and local-knowledge intake requirements as Clauses 1–3.
3. Add Clause 4 after Directive formation and before Logic Debugger.
4. Re-evaluate contributing facts as an aggregate when a Directive is HARM_ADJACENT.
5. Add deterministic `VSP_Status` at the final schema position before SHA-256.
6. Add Flash-Sync recall enforcement for VERIFIED, UNVERIFIED, PARTIAL, and N/A.
7. Add SOC blocks for unresolved VSP conditions.
8. Add warning-only VSP mini-map output for UNVERIFIED and PARTIAL.
9. Advance capsule schema v3.7 → v3.8.

## Reconciliations

### Schema lineage

The source records schema v3.6.1, but Kernel 1.3 already carries v3.7. Kernel 1.4 advances monotonically to v3.8 while retaining v3.6.1 as source provenance.

### Status precedence

The source descriptions overlap for N/A and PARTIAL. Kernel 1.4 resolves them deterministically: UNVERIFIED first; N/A when no VSP-triggering claim exists; PARTIAL when cleared VSP claims coexist with non-VSP facts; VERIFIED when every fact is VSP-triggering and cleared.

### Clause 4 outcome

HARM_ADJACENT is a gate classification, not automatically a failure. A sufficiently verified aggregate proceeds with `CLAUSE_4_RESOLVED`; an insufficient aggregate becomes PENDING_EXTERNAL and blocks SOC.

### Jurisdiction

VGATE implements Clauses 1–3 at intake. VSP supplies constitutional authority. Clause 4 evaluates consequence. Logic Debugger evaluates reasoning integrity. Flash-Sync retrieves and enforces recall state. KRONOS remains limited to chain continuity.

## Authority impact

Constitutional principle and schema addition. VSP does not acquire fact-generation, chain-verification, reasoning, or output-generation authority.

## Version effect

Kernel `1.3` → `1.4`  
Capsule schema `v3.7` → `v3.8`
