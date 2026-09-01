# MBP changelog

Promote-only. Full history is `ledger.jsonl`.

## 2026-08-31  CAP-023
- Slice 1: inline one-line header; compiled-not-generated as close rule
- vh 79a01ae7b954483137f602c1f6763b27493c58949c0037c0431a8249e497a273

## 2026-08-31  CAP-024
- Slice 2: canonical Verihash; `scribe.py hash`; append fills or rejects
- Preimage: id path ts parent_id parent_hash intent goal edges status
- vh fab03bc930f04df7bd301dc00ac01655c7260f1e21e7d4540d366ca9fa0c7792

## 2026-08-31  CAP-025
- Slice 3: facts (≤3) + directive on row; `SCRIBE:OK` / `SCRIBE:FAIL`
- vh cf0d38ba2afa037934493a20769a5c763f8916dbfc3ab378a692c205416fa5dd

## 2026-08-31  CAP-026
- Slice 4: promote into `mbp-core-boot.md` (invariant 9, file dual-commit, inline §7)
- vh 17637ebbd0d752961123ebab7f7cb854472eb1387cfc19a6f8332e96f99cb152

## 2026-08-31  CAP-028
- Add `scribe.py log` (BUILD/PROMOTE + slice/promote/changelog intents)
- Seed promote-only `references/CHANGELOG.md`
- vh a1d92a4b7390778d9ae2283d4db9bb2034e9856159c08aca6b2b4ec6d7439154

## 2026-08-31  CAP-032
- Multi-edge close-hook; canonical weights; `SIMILAR_TO` blocked
- First SUPPORTS edges on a build capsule; `scribe edges`
- vh 36eed11106ac5dba19c129cbeed3f969634e882cd453a9f8ac29acdc078b22c5

## 2026-09-01  CAP-048
- S5 one-call close: no preflight tip/hash; `SCRIBE:OK ... rows=N`
- vh c00c023f1ea7753e4421ebeb60771d922b5304d92baa4399e2911ba7639b0f7c

## 2026-09-01  CAP-049
- S7 `scribe photo` — node + parent + SUPPORTS bodies/file heads
- vh 8ed98565633df6ceb9eb80e87b54989045f078adbfed259a4f6c68d619e9b57c

## 2026-09-01  CAP-050
- S8 BUILD/PROMOTE missing SUPPORTS → `SCRIBE:WARN`, still seals
- vh 083d236ee63e9b2b64c431707d8ebfa2d3091e4b8b1922609eb757da4931d11f

## 2026-09-01  CAP-051
- S6 write classes: full | stub | skip-by-policy; default still every-turn full
- vh 8c5ce58fb35884317e36ed9b1c1688ef33b243fbd228c01c2148ce9a32aa6f8b
