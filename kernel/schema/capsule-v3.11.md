# Capsule Schema v3.11

Kernel Track 1.8 carries capsule schema v3.11. Kernel version and capsule-schema version remain separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- Relational law and gate: `CAP-011-RKI`, `VGATE-R`
- Dynamic subroutines: `CAP-131-DSS`
- Prompt sources: `../modules/20-capsule-schema.md`, `../modules/47-relational-knowledge.md`, `../modules/49-dynamic-subroutines.md`
- Relation type registry: `../registry/relation-types-1.6.json`
- Relation status registry: `../registry/relation-statuses-1.8.json`
- Delta registry: `../registry/invariants-1.8.json`

## Subroutine field

```text
Subroutine: [MODE_1_ID]@[version] · [LOAD: DOMAIN_TYPE | LOAD: REG:TOOL_ID | NONE]
```

- Exactly one Mode 1 interface is active. Default: `KERNEL_INTERFACE@1.0`.
- Mode 2 is optional, capsule-scoped, and must clear its Tier 1 or Tier 2 gate before activation.
- Mode 2 does not change PATH and purges from the active surface at closure.
- The field records the resolved declaration; lifecycle and cache metadata appear in governed runtime state and the DSS strip.

## Relation record

```text
SOURCE_CAP → TARGET_CAP | registered TYPE | status: ACTIVE|RESOLVED|INACTIVE|TRANSIENT | provenance: LOCAL|INHERITED|IMPORTED|COMPRESSED
```

`TRANSIENT` is permitted only for DSS Tier 2 `VALIDATES` and `SCOPED_BY` relations. Both must resolve at PoT generation, preserve fire-and-resolve audit events, and leave no active projection on the post-closure SOC surface.

## Schema lineage

All v3.10 fields remain in canonical order. Kernel 1.8 extends the accepted Subroutine syntax and relation-status vocabulary; therefore the schema advances to v3.11.
