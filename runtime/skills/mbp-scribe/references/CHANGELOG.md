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

## 2026-09-01  CAP-069
- G3 `cmp` / `pull` (fast-forward only)
- G4 Git remains command-only; TIP.md refreshed
- S10 `--ns` opt-in isolated ledgers; default file not split
- vh 9ff9f133a229a8af39d384367ff4b074e810e523c0c087bf4bcf7465b0e77de2

## 2026-09-02  CAP-079
- V1 optional `vsp` field stored, not hashed
- vh b2e662c44dd4f8c87b5342401bb527715ca945979839834356ed77790d2e3d92

## 2026-09-02  CAP-080
- V2 photo prints vsp; UNVERIFIED flagged
- vh 3c271ed37c4b84b3dca1dd8710494a42854e43c8f9febc9a0e2853c83c643c47

## 2026-09-02  CAP-081
- V3 default BUILD/PROMOTE missing vsp → warn
- vh b9ef2419e4a5b1aa8c6577bedfdb36e231df7da985d07a698a7442a3130ef892

## 2026-09-02  CAP-082
- V4 HARM_ADJACENT without PENDING_EXTERNAL/CLEAR → warn
- vh 67c815536610503d217a8ad823f784fe75e2e6861feb60304a8049f9c2a876c3

## 2026-09-02  CAP-083
- V5 promote thin VSP into mbp-core-boot.md (invariant 10, §10)
- vh 07c8d62278fa542573ca4effbb8198567d02686849cab012fc55d0aeecd19ff1

## 2026-09-04  CAP-112
- S11 `classify_ledgers`; cmp prints EQUAL; fixtures + smoke_s11.sh
- vh 8ec13872a2129bcc69a6fb84d3b9fff309dfc58ccb3ec85dd1bee7ecd6bd0d2f

## 2026-09-04  CAP-113
- D1 optional `load` list stored, not hashed; PHOTO prints it
- vh f92e550c83f0c6a186ef3822a9c0bbe7d39a081066fdcca1d29e8eb3efea5e60

## 2026-09-04  CAP-114
- G4 commanded sync of runtime skills + ledger to GitHub
- vh 483304ad0318094a07c6f889bc5a151e453e718da0d5aac6cf483084b6a4784c
