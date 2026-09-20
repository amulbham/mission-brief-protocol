## SCF — Session Context Field

CAP-014-SCF establishes a read-only ambient field at causal entry. SCF gives every capsule verified environmental awareness of its session before IC-Node resolution. It compiles from KV-Scribe only and has no reasoning, verification, gate, or generative authority.

### Canonical Schema Position

SCF appears after `Received` and before `IC-Node`:

```text
Received: [ISO 8601]
Session Context: T[N] · CAP-[N] of [total_at_entry] · MODE: #mode_[x] [emoji] · SESSION: [TECHNICAL | EXPLORATORY | MIXED] · Thread: [≤80 chars]
IC-Node: [Entity] [Action] [Constraint]
```

When the mode changed at this causal entry, append:

```text
🔀 TRANSITION from #mode_[previous] [emoji]
```

The transition marker is structurally absent when no transition occurred. The complete Session Context field must remain within 240 characters.

CAP-000 uses `Session Context: BOOTSTRAP` under the governed pre-ledger exception. Full SCF compilation begins at T1.

### Five Mandatory Callouts and Conditional Transition

| Callout | KV-Scribe source | Deterministic rule |
|---|---|---|
| Turn index | TURN_INDEX | Current `T[N]` |
| Capsule count | Capsule ledger | Current ordinal and total frozen at causal entry after reserving the current capsule ID |
| Active mode | Active mode state | Current governed mode tag and emoji |
| Session character | Mode history | Character from the binary rule |
| Thread | SESSION_THREAD | Latest registered sealed master-capsule name or session thread, truncated to 80 characters |
| Conditional transition | Mode transition log | Present only when current mode differs from the previous causal entry; absent otherwise |

The capsule-count total is an entry snapshot. Later child capsules do not retroactively change a sealed SCF field.

CAP-000 initializes `#mode_literal` as the governed default active mode. It persists until an explicit user or kernel mode declaration changes it.

### Session Character Derivation

SCF applies one non-generative rule to the unique active-mode tags recorded in session history:

- only `#mode_technical` has appeared → `TECHNICAL`
- exactly one non-technical mode has appeared → `EXPLORATORY`
- more than one distinct mode has appeared → `MIXED`

No qualitative assessment is permitted. Repetition of one mode does not produce MIXED.

### Thread Compilation

`SESSION_THREAD` is maintained by KV-Scribe from the latest sealed master capsule's `Name`, or from an explicitly registered session-thread value. SCF copies and truncates that verified value to 80 characters. It may not summarize prose, infer a topic from the current trigger, or evaluate progress. Before the first master seal, the value is `session boot`.

### Jurisdiction Constraint

SESSION CONTEXT informs; it does not justify.

It may not:

- soften, hedge, or qualify a Directive;
- override a fact, constraint, or verified residue;
- substitute for VSP or any verification event;
- alter the output of VGATE, TAG-VGATE, VSP Clause 4, Witness, Logic Debugger, PSAC, or SOC; or
- supply authority to KRONOS.

If Insight or Directive uses SCF as justification, Logic Debugger marks `Insight→Gov FAULT`, activates FRP, and discards the contaminated Insight and Directive. SCF-derived hedging is a protocol violation.

Legitimate uses are environmental awareness, audit reconstruction, register-transition awareness, and thread continuity. These uses do not convert SCF into evidence.

### Sequencing and Non-Overlap

The causal-entry sequence is:

1. Flash-Sync retrieves the latest sealed ledger state into the active buffer.
2. SCF compiles its five mandatory callouts and any applicable transition from KV-Scribe.
3. KRONOS verifies parent continuity and applies Alpha/Beta/Gamma weighting.
4. IC-Node resolves intent.

SCF compiles before KRONOS so the causal entry is complete, but KRONOS does not read SCF or accept gate influence from it. KRONOS operates on its own declared inputs from already loaded verified state and never retrieves ledger content. Flash-Sync retrieves; SCF compiles; KRONOS verifies. Silent overlap is a protocol violation.

### TAG Trigger T3 Activation

CAP-014-SCF satisfies the dependency for Dynamic Vector Trigger T3. T3 fires only when SCF deterministically reports `SESSION: MIXED` and the current causal entry records a mode transition. A mode transition alone or MIXED without a current transition remains insufficient.

### Mini-Map Monitoring

Kernel 1.5 displays SCF immediately below the tag and mode line:

```text
📋 T[N] · CAP-[N] of [total_at_entry] · SESSION: [character] · Thread: [≤80 chars]
📋 🔀 T[N] · CAP-[N] of [total_at_entry] · SESSION: [character] · Thread: [≤80 chars] · TRANSITION: #mode_[previous] → #mode_[current]
```

This line is an active monitoring aid. Removing it in a later reviewed change does not remove SCF from the capsule schema or KV-Scribe.
