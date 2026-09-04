#!/bin/bash
set -euo pipefail
PY="$(cd "$(dirname "$0")" && pwd)/scribe.py"
TD="$(cd "$(dirname "$0")" && pwd)/testdata"
TMP="$(mktemp -d)"
mkdir -p "$TMP/references"

echo "== classify fixtures =="
cp "$TD/A.jsonl" "$TMP/references/ledger.jsonl"
echo -n "EQUAL A vs A: "
python3 "$PY" --root "$TMP" cmp "$TD/A.jsonl"
echo -n "REMOTE_AHEAD A vs B: "
python3 "$PY" --root "$TMP" cmp "$TD/B.jsonl"
cp "$TD/B.jsonl" "$TMP/references/ledger.jsonl"
echo -n "LOCAL_AHEAD B vs A: "
python3 "$PY" --root "$TMP" cmp "$TD/A.jsonl"
echo -n "DIVERGE B vs C: "
python3 "$PY" --root "$TMP" cmp "$TD/C.jsonl"

echo "== pull gates =="
cp "$TD/A.jsonl" "$TMP/references/ledger.jsonl"
python3 "$PY" --root "$TMP" pull "$TD/B.jsonl"
python3 "$PY" --root "$TMP" cmp "$TD/B.jsonl"
set +e
python3 "$PY" --root "$TMP" pull "$TD/C.jsonl"
echo "pull DIVERGE exit=$?"
set -e

echo "== --ns site empty =="
set +e
python3 "$PY" --root "$TMP" --ns site tip
echo "ns tip exit=$?"
set -e

echo "== help =="
python3 "$PY" --help | head -5

rm -rf "$TMP"
echo "S11 smoke ok"
