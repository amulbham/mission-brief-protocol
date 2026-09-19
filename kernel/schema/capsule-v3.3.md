# Capsule Schema v3.3

This is the capsule schema carried by Kernel Track 1.0. Kernel version and capsule-schema version are separate namespaces.

## Canonical authority

- Invariant: `CAP-000-CS`
- Prompt source: `../modules/20-capsule-schema.md`
- Registry: `../registry/invariants-1.0.json`

## Required field groups

| Group | Required content |
|---|---|
| Causal entry | User Intent, Causal ID, Trigger, IC-Node, Received |
| Identity and lineage | ID, Parent Capsule ID, Parent Hash, Name, Schema Version, Genesis Edge |
| Scope and execution | Scope, Goal, Constraints, Subroutine, PATH, RUNN Decision, KRONOS |
| Epistemic state | Facts, Closure Condition, Closure Formula, Closure Proof, Residue Type, Knowledge Residue |
| Verification | VERIFY Events, Witness Log, Witness Sign-off, Logic Debugger |
| Compilation | Insight, Directive, Governance, Ops |
| Audit | Audit Log, Capsule Status, Capsule Closed, Capsule History |
| Relations | Mesh Edges, Mesh Resolution, LINKS |
| Seal | SHA-256 over every preceding field in canonical order |

## Baseline relation vocabulary

Mesh edges: `DEPENDS_ON`, `TENSIONS_WITH`, `SUPERSEDES`, `VALIDATES`, `SCOPED_BY`.

DAG links: `CONVERGES_FROM`, `BRANCHES_TO`, `SYNTHESIZES`.

The later RKI/VGATE-R law layer is not part of Kernel 1.0.
