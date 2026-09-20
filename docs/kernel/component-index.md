# Kernel Component Index

This index is the documentation-drift control surface for Kernel Track 1.x. An ACTIVE component must resolve to authoritative source, registry, tests, and explanatory documentation.

| Component | Prompt module | Registry record | Tests | Documentation | Status |
|---|---|---|---|---|---|
| Cognitive Physics Core | `kernel/modules/00-cognitive-physics.md` | `kernel/registry/invariants-1.0.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Output / Boot / Mini-map | `kernel/modules/10-output-and-boot.md` | `kernel/registry/invariants-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Session Context Field | `kernel/modules/15-session-context.md` | `kernel/registry/invariants-1.5.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Capsule Schema | `kernel/modules/20-capsule-schema.md` | `kernel/schema/capsule-v3.11.md` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| KV-Scribe / PoT / KRONOS | `kernel/modules/30-continuity-and-verification.md` | `kernel/registry/invariants-1.5.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| VSP / Clause 4 / VSP_Status | `kernel/modules/35-verification-sufficiency.md` | `kernel/registry/invariants-1.4.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Core_Manager / RUNN / DEX / VGATE | `kernel/modules/40-runtime-components.md` | `kernel/registry/invariants-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| TAG / TARS / TAG-VGATE / TI | `kernel/modules/45-tag-system.md` | `kernel/registry/invariants-1.5.json` · `kernel/registry/tag-registry-seeds-1.3.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| RKI / VGATE-R / relation registry | `kernel/modules/47-relational-knowledge.md` | `kernel/registry/invariants-1.6.json` · `kernel/registry/relation-types-1.6.json` · `kernel/registry/relation-statuses-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| JIT Pruning Engine | `kernel/modules/48-jit-pruning.md` | `kernel/registry/invariants-1.7.json` · `kernel/registry/jit-policy-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Dynamic Subroutine System | `kernel/modules/49-dynamic-subroutines.md` | `kernel/registry/invariants-1.8.json` · `kernel/registry/dss-policy-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| LCM / Tool Protocol / Display | `kernel/modules/50-relations-tools-and-display.md` | `kernel/registry/invariants-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Baseline provenance | `kernel/changes/000-kernel-1.0-baseline.md` | `kernel/registry/source-manifest-1.0.json` | `kernel/tests/kernel-1.0-release-regression.mjs` | `docs/kernel/versioning.md` | ACTIVE |
| Change 001 · explicit PoT lineage | `kernel/changes/001-minimap-pot-lineage.md` | `kernel/registry/invariants-1.1.json` | `kernel/tests/kernel-1.1-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| Witness flag-only | `kernel/changes/002-witness-flag-only.md` | `kernel/registry/invariants-1.2.json` | `kernel/tests/kernel-1.2-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| TAG thematic index | `kernel/changes/003-tag-thematic-index.md` | `kernel/registry/invariants-1.3.json` | `kernel/tests/kernel-1.3-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| VSP | `kernel/changes/004-verification-sufficiency.md` | `kernel/registry/source-manifest-1.4.json` | `kernel/tests/kernel-1.4-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| SCF | `kernel/changes/005-session-context-field.md` | `kernel/registry/source-manifest-1.5.json` | `kernel/tests/kernel-1.5-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| RKI / VGATE-R | `kernel/changes/006-rki-vgate-r.md` | `kernel/registry/source-manifest-1.6.json` | `kernel/tests/kernel-1.6-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| JIT change provenance | `kernel/changes/007-jit-pruning.md` | `kernel/registry/source-manifest-1.7.json` | `kernel/tests/kernel-1.7-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |
| DSS / state-strip provenance | `kernel/changes/008-dss-state-strip.md` | `kernel/registry/source-manifest-1.8.json` | `kernel/tests/kernel-1.8-conformance.mjs` | `docs/kernel/architecture.md` | ACTIVE |

Status vocabulary: `ACTIVE`, `PLANNED`, `HISTORICAL`, `SUPERSEDED`.
