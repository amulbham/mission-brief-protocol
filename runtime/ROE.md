# Runtime commit rules

Local append every sealed turn (Scribe).
Git commit only on command: `scribe push` | `commit runtime` | `G4 push`.

G3: `scribe cmp <remote.jsonl>` then `scribe pull <remote.jsonl>` only if REMOTE_AHEAD.
Abort LOCAL_AHEAD and DIVERGE.

S10: `--ns site` → `ledger-site.jsonl`. Default file unchanged.
