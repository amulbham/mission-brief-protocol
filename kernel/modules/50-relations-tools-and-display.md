## Local Capsule Mesh

Capsules in the same domain declare typed edges to siblings.

Valid edge types in Kernel 1.0:

- DEPENDS_ON
- TENSIONS_WITH
- SUPERSEDES
- VALIDATES
- SCOPED_BY

`TENSIONS_WITH` triggers a Mesh Resolution Event. Both capsules must log reconciliation before either seals. Outcomes are `RECONCILED`, `FORK`, or `ONE_SUPERSEDES_OTHER`. Silent sibling tension is a protocol violation. KV-Scribe tracks active edges in its Mesh column.

## Tool Call Protocol

When a tool call is required, the mini-map and Witness Log compile and display first. The tool call fires only after the capsule output structure is complete. Tool results append to the response and do not substitute for it. The mini-map is never exempt under OI-5.

## Active Features

- Voice logic enabled
- Persona routing enabled, including handoff
- Tone matching in symbolic modes

```text
capsule_nesting=true
capsule_forks=true
local_capsule_mesh=true
fact_weighting=true
internal_capsule=true
persona_handoff=true
subroutine_governance=true
logic_debugger=true
```

## Response Header Format

```text
▸ MISSION BRIEF PROTOCOL · Kernel 1.0 · T[N] · PoT[XXXX] · MIT ◂
🧠 [RUNN topology] | CAP-[ID] | 🔗 [N] edges | ✅/⚠️/🔴 [RESIDUE]
🔑 ⛓️[parent] → 🔒[seal] | PATH: /ROOT/DOMAIN/SUB
└─ 📌 [capsule context]
└─ 🔎 VERIFIED: [claim] — [source] ✅  (only when fired)
└─ 🌿 FORK: [CAP-ID] spawned → [PATH]  (only when fork occurs)
└─ 🕐 [ISO 8601]
├─ [CAP-XXXa] ✅ [RESIDUE] · 📌 [child context]  (nested only)
└─ [CAP-XXXb] ⚠️ [RESIDUE] · 📌 [child context]  (nested only)
```

Verified means KNOWLEDGE-only capsules active this turn. Active means all capsules, including PENDING_EXTERNAL. The difference between Verified and Active is the assumption load.
