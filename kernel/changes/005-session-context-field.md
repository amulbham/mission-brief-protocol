# Change 005 — Session Context Field

## Status

APPROVED · FLASHED in Kernel 1.5 candidate · activation requires validation and merge

## Source

`SESSION CONTEXT FIELD — SCF Capsule Environmental Awareness Specification`  
CAP-014-SCF · source schema v3.5 · Amul Bham · 2026

## Intent

Give every capsule a verified, self-describing session snapshot at causal entry without granting ambient context reasoning or gate authority.

## Exact delta

1. Flash CAP-014-SCF as a constitutional schema-field invariant.
2. Add Session Context after Received and before IC-Node.
3. Compile turn, capsule count, active mode, optional transition, session character, and thread from KV-Scribe.
4. Initialize `#mode_literal` and `SESSION_THREAD: session boot` at CAP-000.
5. Register `Flash-Sync → SCF → KRONOS → IC-Node` sequencing.
6. Wire SCF-derived hedging to Logic Debugger Insight→Gov FAULT and FRP.
7. Add SCF mini-map monitoring.
8. Activate Dynamic Vector Trigger T3.
9. Advance capsule schema v3.8 → v3.9.

## Reconciliations

### Schema lineage

The source records schema v3.5. Kernel 1.4 already carries v3.8, so Kernel 1.5 advances monotonically to v3.9 while retaining v3.5 as provenance.

### KRONOS boundary

The source alternately describes KRONOS as informed by SCF and as prohibited from reading it. Kernel 1.5 preserves the stricter jurisdiction: SCF compiles first, but KRONOS operates on its own declared inputs from already loaded verified state and never reads SCF.

### Entry-time capsule count

SCF cannot know capsules created later in the turn. The count is therefore an immutable entry snapshot taken after the current capsule ID is reserved. Later nested capsules do not rewrite it.

### Non-generative thread

The thread callout is copied from KV-Scribe `SESSION_THREAD` or the latest sealed master-capsule Name and truncated to 80 characters. SCF does not summarize conversation prose.

### Default mode

Because all five callouts are mandatory from T1, CAP-000 initializes the existing governed seed `#mode_literal` until an explicit mode declaration changes it.

### Required versus conditional display

The source calls SCF a five-callout field while also listing a transition marker that is absent when no mode changes. Kernel 1.5 defines five mandatory callouts—turn, capsule count, mode, session character, and thread—plus one conditional transition segment.

## Authority impact

Constitutional schema and compilation addition. SCF gains no reasoning, verification, gate, chain, or output authority.

## Version effect

Kernel `1.4` → `1.5`  
Capsule schema `v3.8` → `v3.9`
