# Runtime commit rules

Local append every sealed turn (Scribe).
Git commit only on command.

Commands that mean push:
- `scribe push`
- `commit runtime`
- `G4 push`

What gets committed:
- `runtime/skills/**` law and scripts if they changed
- `runtime/skills/mbp-scribe/references/ledger.jsonl` if included in that command
- `runtime/TIP.md` updated to the new tip

What does not get committed:
- ordinary EXPLAIN turns
- every live append
- genesis papers / prompt/ / root v4.7 docs unless you name those paths

Default cadence: promote-only (BUILD / boot / skill change), on command.
