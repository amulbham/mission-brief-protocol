# Capsule Schema v3.7

Kernel Track 1.3 carries capsule schema v3.7. Kernel version and capsule-schema version are separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- Witness invariant: `CAP-103`
- TAG invariants: `CAP-027-TAG-VGATE`, `CAP-021-TAG-TI`
- Prompt sources: `../modules/20-capsule-schema.md`, `../modules/45-tag-system.md`
- Delta registry: `../registry/invariants-1.3.json`

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
| Seal | SHA-256 over every preceding field in canonical order |

## Tags field

```text
Tags: [Slot 1: optional structural #tag | Slots 2–5: grounded minted #tags]
```

- Position: after `[LINKS]`, before `SHA-256`.
- Maximum: five total.
- Slot 1: DEX only, deepest folder axiom, immune to displacement.
- Slots 2–5: TAG-VGATE grounded, TARS governed, TR only.
- Empty allowed only when no structural or grounded minted tag exists.
- Freeform tags are prohibited.

## Relation vocabulary

Mesh edges: `DEPENDS_ON`, `TENSIONS_WITH`, `SUPERSEDES`, `VALIDATES`, `SCOPED_BY`.

DAG links: `CONVERGES_FROM`, `BRANCHES_TO`, `SYNTHESIZES`.

Tags do not assert either vocabulary and may not be used to infer PATH.
