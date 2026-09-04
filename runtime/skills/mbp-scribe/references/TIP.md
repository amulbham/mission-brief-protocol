# Live tip

Local ledger is source of truth. Git updates only on commanded push.

- local file: `~/.grok/skills/mbp-scribe/references/ledger.jsonl`
- rows: 114
- tip: CAP-114
- verihash: 483304ad0318094a07c6f889bc5a151e453e718da0d5aac6cf483084b6a4784c
- parent: f92e550c83f0c6a186ef3822a9c0bbe7d39a081066fdcca1d29e8eb3efea5e60

This G4 mirrors `runtime/skills/` plus `ledger.jsonl`.
Other window: copy `runtime/skills/mbp-scribe` and `mbp-boot` onto `~/.grok/skills/`, then `scribe pull` the downloaded ledger only if `cmp` says REMOTE_AHEAD.
