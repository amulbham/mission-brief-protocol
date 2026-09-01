# MBP runtime

Live kernel mirror. Law + Scribe live here. Genesis papers and prompt-era docs stay at repo root and `docs/genesis/`.

Local source of truth while a session is running:

- `~/.grok/skills/mbp-boot/`
- `~/.grok/skills/mbp-scribe/`

This folder is the Git snapshot. Append still happens on the local ledger. Push on promote (G4), not every explain turn.

```
runtime/
  README.md
  skills/
    mbp-boot/
      SKILL.md
      references/mbp-core-boot.md
    mbp-scribe/
      SKILL.md
      scripts/scribe.py
      references/ledger.jsonl
      references/CHANGELOG.md
```

Tip check:

```
python3 skills/mbp-scribe/scripts/scribe.py tip
```

Imported G2 from the live skill disk (CAP-058 retarget).
