# Change 009 — Formal Capsule Field Catalog

## Status

IMPLEMENTED · Kernel 1.9 work package WP-2 · pending Kernel 1.9 release · no runtime activation effect

## Intent

Make every canonical capsule field inspectable, maintainable, and testable without treating explanatory prose as an independent schema source.

## Exact delta

1. Add a structured catalog for all 43 capsule-schema v3.11 field occurrences.
2. Preserve canonical field labels and order, including the two distinct `Name` occurrences.
3. Assign each occurrence a stable catalog ID and document owner, lifecycle, source, grammar, cardinality, verification, mutability, PoT inclusion, failure condition, display behavior, and version lineage.
4. Generate the human capsule-schema guide deterministically from the catalog.
5. Add exact catalog-to-CAP-000-CS order checks and generated-guide parity validation.
6. Add the catalog and guide to Kernel Track maintenance and documentation mappings.

## Reconciliations

### Duplicate Name labels

The canonical v3.11 schema contains two fields labeled `Name`: the capsule name and a scoped execution handle. Change 009 does not silently rename either schema field. It assigns stable documentation IDs `capsule_name` and `scope_name`, plus occurrence numbers, so tooling can distinguish them pending any future explicit schema revision.

### Parent Hash grammar

The current authoritative schema defines Parent Hash as the prior PoT projected to four characters. The catalog records that rule literally. A move to a full-digest field would be a schema-semantic change and is outside this documentation work package.

### Authority boundary

The JSON catalog is a field-level schema source governed beneath CAP-000-CS and active modules. The generated Markdown guide remains explanatory. Neither artifact flashes a new invariant or changes capsule behavior.

## Authority impact

Schema documentation and validation only. No new kernel law, runtime component, field, relation type, status, or closure rule is activated.

## Version effect

Kernel remains `1.8` until the complete Kernel 1.9 release closes.  
Capsule schema remains `v3.11`; no field semantics or canonical order change.
