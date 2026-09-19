# Capsule Schema v3.8

Kernel Track 1.4 carries capsule schema v3.8. Kernel version and capsule-schema version are separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- Witness invariant: `CAP-103`
- TAG invariants: `CAP-027-TAG-VGATE`, `CAP-021-TAG-TI`
- VSP invariant: `CAP-034-VSP-COMPLETE`
- Prompt sources: `../modules/20-capsule-schema.md`, `../modules/35-verification-sufficiency.md`
- Delta registry: `../registry/invariants-1.4.json`

## Required field groups

| Group | Required content |
|---|---|
| Causal entry | User Intent, Causal ID, Trigger, IC-Node, Received |
| Identity and lineage | ID, Parent Capsule ID, Parent Hash, Name, Schema Version, Genesis Edge |
| Scope and execution | Scope, Goal, Constraints, Subroutine, PATH, RUNN Decision, KRONOS |
| Epistemic state | Facts, Closure Condition, Closure Formula, Closure Proof, Residue Type, Knowledge Residue |
| Verification | VERIFY Events, Witness Signal, Logic Debugger |
| Compilation | Insight, Directive, Governance, Ops |
| Audit | Audit Log, Capsule Status, Capsule Closed, Capsule History |
| Relations | Mesh Edges, Mesh Resolution, LINKS |
| Thematic state | Tags: optional structural Slot 1 plus up to four grounded minted tags |
| Verification integrity | VSP_Status: VERIFIED, UNVERIFIED, PARTIAL, or N/A |
| Seal | SHA-256 over every preceding field in canonical order |

## VSP_Status field

```text
VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]
```

- Position: after Tags and immediately before `SHA-256`.
- Source: deterministic aggregation of VGATE and VERIFY Events only.
- Precedence: UNVERIFIED → N/A → PARTIAL → VERIFIED.
- Missing verification logs cannot be inferred or repaired during sealing.
- The sealed value governs Photo Principle recall through Flash-Sync.

## Clause 4 audit event

Clause 4 does not add a separate capsule field. It records `CLAUSE_4_TRIGGERED` in Audit Log after Directive and before Logic Debugger. An unresolved HARM_ADJACENT outcome sets PENDING_EXTERNAL and blocks SOC.

## Relation vocabulary

Mesh edges: `DEPENDS_ON`, `TENSIONS_WITH`, `SUPERSEDES`, `VALIDATES`, `SCOPED_BY`.

DAG links: `CONVERGES_FROM`, `BRANCHES_TO`, `SYNTHESIZES`.

VSP_Status does not create or modify relationship types.
