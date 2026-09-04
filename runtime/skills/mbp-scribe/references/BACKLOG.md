# MBP runtime backlog

Queued only. Plan prose: `PROJECT.md`. Not law until a slice ships.

## P0 hygiene (ops)

- Use `--ns` in specialized windows
- Commanded G4 ledger snapshot when asked
- EXPLAIN stays `vsp: N/A` unless sources were checked

## P1 DSS thin

- **D1** shipped CAP-113 — optional `load` list
- **D2** `references/subs/<name>.md`; missing → warn, still seal
- **D3** enrich sub file only on PROMOTE
- **D4** Tier-2 = deterministic `scripts/`

## P2 Witness thin

- **W1** optional unhashed `witness: CLEAR|TENSION|DRIFT|DISCONTINUITY`
- **W2** reject multi-flag / prose keys; PHOTO prints flag; non-CLEAR warns, still seals

## P3 v5.1 keepers

- **A46** BUILD directive vs facts contradiction/omission → warn
- **MODE** optional `EXPLORATORY|ASSERTIVE` only if A46 needs it

## P4 durability

- **S11** shipped CAP-112 (`classify_ledgers`, EQUAL, fixtures, smoke)
- G4 push `ledger.jsonl` on command
- One-page close-hook for a second LLM
- Root-repo prompt-era vs `runtime/` cleanup

## P5 blocked

- DetectDrift / SIMILAR_TO (embedder)
- Put `vsp` / `load` / `witness` into Verihash (explicit version)
- Second-model Witness

## Inbox

Paste new ideas here. Reprioritize by moving a line into P0–P5. Do not treat inbox as flashed.

## Never (paper OS)

- Flash-Sync, KRONOS, Core_Manager, SCF, TARS, TAG, PSAC, FRP
- SYNTHESIS_CACHE as PATH, TRANSIENT edges, IC-Node
- OI-5 mini-map, six topologies + RTDT as required ritual
- Pasting v5.1 / Component PDFs into boot
- Auto-enrich from ASSUMPTION / UNVERIFIED
