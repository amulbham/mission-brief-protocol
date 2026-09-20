# Capsule Schema v3.10

Kernel Track 1.6 carries capsule schema v3.10. Kernel version and capsule-schema version are separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- Relation law: `CAP-011-RKI`
- Relation gate: `VGATE-R`
- Prompt sources: `../modules/20-capsule-schema.md`, `../modules/47-relational-knowledge.md`
- Type registry: `../registry/relation-types-1.6.json`
- Delta registry: `../registry/invariants-1.6.json`

## Canonical relation record

```text
SOURCE_CAP → TARGET_CAP | TYPE | status: ACTIVE|RESOLVED|INACTIVE | provenance: LOCAL|INHERITED|IMPORTED|COMPRESSED
```

Every relation requires direction, a registered type, status, and provenance. VGATE-R fires before entry and again when a relation survives compression or pruning.

## Relation containers

| Container | Registered types |
|---|---|
| Mesh Edges | DEPENDS_ON, SCOPED_BY, VALIDATES, SUPERSEDES, TENSIONS_WITH, WEAKENS |
| DAG Links | BRANCHES_TO, CONVERGES_FROM, SYNTHESIZES |

The containers are structurally distinct. Relation semantics remain governed by the shared RKI registry.

## Closure requirements

- Untyped, ambiguous, or UNCLASSIFIED relations cannot enter the capsule.
- TENSIONS_WITH blocks closure until Mesh Resolution is logged by both affected capsules.
- Collapsed relations cannot support output inference.
- BRANCHES_TO may become INACTIVE after branch closure; its historical record persists.
- SUPERSEDES changes authority ordering without deleting history.
- WEAKENS requires a bounded rationale or reduction magnitude in Audit Log.

## Schema lineage

All v3.9 fields remain. Kernel 1.6 changes the accepted relational record and vocabulary; therefore the schema advances to v3.10.
