---
name: mbp-scribe
description: Persist and query the MBP KV-Scribe ledger (append-only JSONL of sealed capsules). Use on every MBP VGATE PASS before SOC, and on scribe flush, scribe tip, scribe get, scribe spine, commit spine, update scribe, or build mbp-scribe.
metadata:
  type: workflow
  version: "1.0"
---

# MBP Scribe

Append-only ledger for sealed MBP capsules. This file is the archive. CMM lines in chat are not the archive.

Ledger path (sole store): `references/ledger.jsonl`
Tool: `python3 scripts/scribe.py <cmd>`

## Close hook (live append)

On every MBP capsule that reaches VGATE PASS, before SOC output:

1. Build one JSON row (schema below). Omit `verihash` — the script computes it. Parent hash is the previous turn's `SCRIBE:OK` digest (or this thread's last sealed parent). Do not run `tip`, `spine`, or `hash` first.
2. Run exactly one command: `python3 scripts/scribe.py append '<json>'`.
3. Parse that one stdout line: `SCRIBE:OK APPEND <id> <verihash> rows=N class=full|stub`. Header uses those fields. No second scribe call.
4. If stdout starts with `SCRIBE:OK`, header may say `SCRIBE:OK`. If the process exits non-zero or stdout starts with `SCRIBE:FAIL`, header says `SCRIBE:FAIL` and SOC must not claim a ledger write. `tip` / `get` / `hash` are query tools, not part of close.
5. Include `facts` (≤3 strings) and `directive` (one line) on new rows so `scribe get` can PHOTO the capsule.
6. `edges` is a list. Always include `INHERITS_FROM` to the parent. On BUILD/PROMOTE turns add `SUPPORTS` only to files or capsules actually used. Missing SUPPORTS on BUILD/PROMOTE prints `SCRIBE:WARN` and still seals. EXPLAIN turns do not warn. Do not write `SIMILAR_TO`. `FORKS_TO` / `SUPERSEDES` only when that job happened. Omit `w` — script fills canonical weights.
7. Do not invent a Verihash. Do not wait for the user to say "update scribe" on a normal turn.

## Write classes (S6)

Default remains: append every sealed turn (`full`).
- `full` — BUILD / PROMOTE / REVIEW / any turn with facts+directive. Always append.
- `stub` — EXPLAIN continuity only: required spine fields, no facts/directive. Still a ledger row.
- skip — do not call append. Policy choice, not a script mode. Creates a PHOTO hole.

Set `write_class` to `full` or `stub`. If omitted: EXPLAIN with no facts/directive → stub; otherwise full.

## Batch / query

- `scribe flush` / `commit spine` / `update scribe` — append any sealed capsules still in this thread whose `verihash` is not already in the ledger. Skip duplicates. Stop on parent mismatch unless the row has an explicit FORKS_TO edge.
- `scribe tip` — `python3 scripts/scribe.py tip`
- `scribe get <id-or-hash>` — `python3 scripts/scribe.py get <q>`
- `scribe spine [n]` — `python3 scripts/scribe.py spine [n]`
- `scribe hash` — `python3 scripts/scribe.py hash '<json>'` prints the canonical SHA-256
- `scribe log [n]` — promote view (`/KERNEL/BUILD`, `/KERNEL/PROMOTE`, or intent containing slice/promote/changelog)
- `scribe edges <id-or-hash>` — print typed edges for one row
- `scribe photo <id-or-hash>` — one-fetch working grid: node + parent + SUPPORTS (capsule body or file head)

## Promote changelog

Product changes go in `references/CHANGELOG.md` only on boot/schema/skill promotes.
Do not append that file on ordinary explain turns. Ledger remains the full work log.

## Canonical Verihash (Slice 2)

Preimage fields, in spirit — encoded as sorted-key JSON of:

`id, path, ts, parent_id, parent_hash, intent, goal, edges, status`

Excluded from the digest: `verihash`, `audit`, `facts`, `directive`.

`append` fills a missing `verihash` and rejects a mismatch. Rows before CAP-024 keep their original (ad-hoc) hashes and are not rewritten.

## Row schema

Required keys: `id`, `path`, `ts`, `parent_id`, `parent_hash`, `intent`, `goal`, `edges`, `status`, `audit`

Optional on input: `verihash` (script fills or rejects), `facts` (≤3 strings), `directive` (one line).

- `parent_hash` is `""` or `"∅"` only for genesis.
- `edges` is a list of `{type, to, w}`.
- `facts` and `directive` are stored, never hashed.
- Never rewrite a prior line. SUPERSEDES = new row pointing at the old hash.

## Reject (script enforced)

- parent_hash does not match current tip verihash, unless edges include FORKS_TO
- duplicate verihash
- missing required keys
- in-place edit of ledger.jsonl

## Dual commit

One header line is the visible cursor. This ledger is what DEX must `get` when a body is needed. Do not treat chat memory as Scribe.

## Header (Slice 1 — default)

SOC opens with exactly one cursor line:

`▸ MBP · T# · CAP-ID · intent echo · VGATE:PASS|FAIL · parent:<12hex>… · vh:<12hex>… · PATH · SCRIBE:OK|FAIL n/n · KERNEL 🟢`

No second kernel banner. No multi-line CMM block on a normal turn.

Multi-line CMM is allowed only for genesis, `scribe flush`, or FAULT.

## Compiled not generated

SOC output is compiled from sealed ledger state plus the closed capsule. It is not free generation. If a sentence cannot be traced to a verified fact, a sealed parent, or the current directive, it does not emit. Unsealed cognition has no output authority.

Promoted into `mbp-core-boot.md` on 2026-08-31 (Slice 4).

## Body + fail-visible (Slice 3)

New sealed rows carry `facts` and `directive` so DEX can load a capsule without the chat essay. Script success prints `SCRIBE:OK`. Script faults print `SCRIBE:FAIL` and leave the ledger unchanged.
