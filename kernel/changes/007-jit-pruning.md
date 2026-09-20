# Change 007 — JIT Pruning Engine

## Status

APPROVED · FLASHED in Kernel 1.7 candidate · activation requires validation and merge

## Source

`MBP JIT PRUNING ENGINE — State Engineering Specification`  
CAP-JIT-001 · Amul Bham · 2026

## Intent

Complete the Photo Principle pipeline by governing the SOC compilation surface between sealed capsule state and output compilation.

## Exact delta

1. Flash CAP-JIT-001-CORE, -EDGES, -NODES, -WATCHDOG, and -VOCAB.
2. Add the post-closure, pre-SOC RUNN → DEX → KV-Scribe → SOC lifecycle.
3. Extend DEX with relation tracing, retention evaluation, and minimal-grid compilation only.
4. Add four node-priority tiers and constitutional immunity for CORE_SYSTEM_INVARIANT nodes.
5. Add continuous relation actions and the runtime-configured Integrity Watchdog.
6. Preserve the full append-only ledger while suppressing stale or transitional state from the SOC surface.
7. Retire SUPPORTS and INHERITS_FROM and record the source-era FORKS_TO normalization boundary.
8. Add conditional JIT mini-map visibility for sweeps, suppression, recall, and configuration faults.
9. Activate `jit_pruning=true` without changing capsule schema v3.10.

## Reconciliations

### RKI remains authoritative

The source predates Kernel 1.6 and defines a narrower relation vocabulary. Kernel 1.7 applies JIT actions to all nine registered RKI types, preserving type, direction, status, and provenance. JIT cannot narrow or replace RKI.

### Added relation actions

Active TENSIONS_WITH receives 0.95 retention because its unresolved state blocks closure. WEAKENS, CONVERGES_FROM, and SYNTHESIZES receive 0.85 projection rules because their authority modifiers or named inputs remain load-bearing. Resolved tension prose becomes stale at 0.10.

### Vocabulary boundary

SUPPORTS and INHERITS_FROM are explicitly retired. FORKS_TO is treated as a source-era alias that requires explicit imported normalization to BRANCHES_TO. TRANSIENT remains outside the active registry until DSS gains independent authority.

### Prompt-runtime ceiling

The source's Honest Ceiling controls implementation claims. Kernel 1.7 suppresses nodes from SOC's governed compilation surface but does not claim physical host-context eviction, token-count reduction, inference-cost reduction, or guaranteed T[400] performance.

### No schema delta

JIT operates after capsule closure and does not add, remove, or reorder capsule fields. Capsule schema remains v3.10.

## Authority impact

Constitutional invariant and deterministic runtime addition. JIT gains no reasoning, verification, relation-typing, ledger-mutation, chain-verification, or output-generation authority.

## Version effect

Kernel `1.6` → `1.7`  
Capsule schema remains `v3.10`
