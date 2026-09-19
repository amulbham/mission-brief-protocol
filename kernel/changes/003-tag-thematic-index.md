# Change 003 — TAG System and Thematic Index

## Status

APPROVED · FLASHED in Kernel 1.3 candidate · activation requires validation and merge

## Source

`TAG SYSTEM, TARS & THEMATIC INDEX — Thematic Architecture, Registry Governance & Intelligent Tag Synthesis`  
CAP-027 + CAP-021-TAG-TI · source schema v3.7 · Amul Bham · 2026

## Intent

Add a governed thematic association layer without collapsing thematic identity into DAG causality, LCM relationship, or DEX location.

## Exact delta

1. Add the typed Tags field after `[LINKS]` and before `SHA-256`.
2. Establish append-only TR with 18 ACTIVE seed tags.
3. Flash TARS as vocabulary-lifecycle and displacement authority.
4. Flash TAG-VGATE as the pre-PROPOSE grounding gate for every minted tag.
5. Add persistent epistemic mode state and four mode seeds.
6. Add DEX-governed structural Slot 1 inheritance with deepest-folder resolution.
7. Add RUNN-identified Dynamic Vector candidates T1–T4.
8. Add append-only, session-scoped GTIL indexes.
9. Add KV-Scribe columns for TR, Tags, TAG-VGATE log, structural tag, DV tag, and GTIL.
10. Add the concise TAG / MODE / conditional DV mini-map line.
11. Advance capsule schema v3.4 → v3.7.

## Reconciliations

### SCF dependency

Trigger T3 requires `SCF SESSION:MIXED ∧ mode transition this turn`. SCF is not active in Kernel 1.3. The `#mode_transition` seed exists in TR, but T3 is `LATENT` and cannot fire until CAP-014-SCF is flashed in a later version.

### Grounding order

The source's governing rules state that TAG-VGATE fires before TARS PROPOSE and that TARS receives only grounded minted candidates. A later Dynamic Vector diagram reverses those steps. Kernel 1.3 follows the explicit jurisdiction rule: RUNN candidate → TAG-VGATE → TARS → slot.

### Minimum tag count

The source states a minimum of one tag while also allowing Slot 1 to be absent and minted tags to be unavailable. Kernel 1.3 permits an empty Tags field only when no folder axiom applies and no grounded minted tag exists. It never invents a tag to satisfy cardinality.

### Schema lineage

The source specification records its full historical schema progression through v3.7. Kernel Track enters this change from active schema v3.4 after CAP-103. The active Track delta is therefore v3.4 → v3.7; source lineage remains preserved in provenance.

## Authority impact

Constitutional schema and subsystem addition. Tags do not alter existing DAG, LCM, PATH, verification, closure, or output-compilation authority.

## Version effect

Kernel `1.2` → `1.3`  
Capsule schema `v3.4` → `v3.7`
