#!/usr/bin/env python3
"""Append-only MBP KV-Scribe ledger."""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

REQUIRED = (
    "id",
    "path",
    "ts",
    "parent_id",
    "parent_hash",
    "intent",
    "goal",
    "edges",
    "status",
    "audit",
)

HASH_FIELDS = (
    "id",
    "path",
    "ts",
    "parent_id",
    "parent_hash",
    "intent",
    "goal",
    "edges",
    "status",
)


def skill_root(explicit: str | None) -> Path:
    if explicit:
        return Path(explicit).resolve()
    return Path(__file__).resolve().parent.parent


def ledger_path(root: Path) -> Path:
    return root / "references" / "ledger.jsonl"


def load_rows(path: Path) -> list[dict]:
    if not path.exists():
        return []
    rows = []
    with path.open("r", encoding="utf-8") as fh:
        for line_no, line in enumerate(fh, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as exc:
                fail(f"bad JSONL line {line_no}: {exc}")
    return rows


def dump_row(row: dict) -> str:
    return json.dumps(row, ensure_ascii=False, separators=(",", ":"))


def fail(msg: str) -> None:
    raise SystemExit(f"SCRIBE:FAIL {msg}")


def norm_hash(value: str | None) -> str:
    if value is None:
        return ""
    value = str(value).strip()
    if value in {"", "∅", "null", "None", "GENESIS"}:
        return ""
    return value.lower()


EDGE_WEIGHTS = {
    "INHERITS_FROM": 1.0,
    "SUPPORTS": 0.8,
    "SUPERSEDES": 0.1,
    "FORKS_TO": 0.4,
    "SIMILAR_TO": 0.3,
}


def has_fork(edges) -> bool:
    if not isinstance(edges, list):
        return False
    for edge in edges:
        if isinstance(edge, dict) and str(edge.get("type", "")).upper() == "FORKS_TO":
            return True
    return False


def _canon_edges(edges) -> list:
    if not edges:
        return []
    if not isinstance(edges, list):
        fail("edges must be a list")
    out = []
    for edge in edges:
        if not isinstance(edge, dict):
            fail("each edge must be an object")
        etype = str(edge.get("type", "")).upper()
        target = str(edge.get("to", "")).strip()
        if etype not in EDGE_WEIGHTS:
            fail(f"unknown edge type {edge.get('type')}")
        if not target:
            fail("edge.to is required")
        if etype == "SIMILAR_TO":
            fail("SIMILAR_TO blocked until embedder exists")
        canonical_w = EDGE_WEIGHTS[etype]
        supplied_w = edge.get("w", None)
        if supplied_w in (None, ""):
            w = canonical_w
        else:
            try:
                w = float(supplied_w)
            except (TypeError, ValueError):
                fail(f"edge.w must be a number for {etype}")
            if abs(w - canonical_w) > 1e-9:
                fail(f"edge.w {w} != canonical {canonical_w} for {etype}")
        item = {"type": etype, "to": target, "w": w}
        out.append(item)
    out.sort(key=lambda e: (e["type"], e["to"]))
    return out


def preimage(row: dict) -> dict:
    missing = [k for k in HASH_FIELDS if k not in row]
    if missing:
        fail(f"hash missing keys: {', '.join(missing)}")
    return {
        "id": str(row.get("id", "")),
        "path": str(row.get("path", "")),
        "ts": str(row.get("ts", "")),
        "parent_id": str(row.get("parent_id", "")),
        "parent_hash": norm_hash(row.get("parent_hash")),
        "intent": str(row.get("intent", "")),
        "goal": str(row.get("goal", "")),
        "edges": _canon_edges(row.get("edges")),
        "status": str(row.get("status", "")),
    }


def compute_verihash(row: dict) -> str:
    blob = json.dumps(preimage(row), ensure_ascii=False, separators=(",", ":"), sort_keys=True)
    return hashlib.sha256(blob.encode("utf-8")).hexdigest()


def parse_row(raw: str) -> dict:
    try:
        row = json.loads(raw)
    except json.JSONDecodeError as exc:
        fail(f"invalid JSON: {exc}")
    if not isinstance(row, dict):
        fail("row must be a JSON object")
    return row


def normalize_class(row: dict) -> str:
    raw = str(row.get("write_class") or row.get("class") or "").strip().lower()
    path = str(row.get("path", ""))
    if raw in {"full", "stub"}:
        cls = raw
    elif raw in {"", "none"}:
        if "/KERNEL/EXPLAIN" in path and "facts" not in row and "directive" not in row:
            cls = "stub"
        else:
            cls = "full"
    else:
        fail("write_class must be full or stub")
    if cls == "full" and ("/KERNEL/BUILD" in path or "/KERNEL/PROMOTE" in path):
        if "facts" not in row or "directive" not in row:
            print("SCRIBE:WARN BUILD/PROMOTE full row missing facts or directive")
    row["write_class"] = cls
    return cls


def validate_body(row: dict) -> None:
    if "facts" in row:
        facts = row["facts"]
        if not isinstance(facts, list):
            fail("facts must be a list")
        if len(facts) > 3:
            fail("facts max is 3")
        for item in facts:
            if not isinstance(item, str) or not item.strip():
                fail("each fact must be a non-empty string")
    if "directive" in row:
        directive = row["directive"]
        if not isinstance(directive, str) or not directive.strip():
            fail("directive must be a non-empty string")
        if "\n" in directive:
            fail("directive must be one line")


def cmd_hash(raw: str) -> None:
    print(compute_verihash(parse_row(raw)))


def cmd_append(path: Path, raw: str) -> None:
    row = parse_row(raw)
    missing = [k for k in REQUIRED if k not in row]
    if missing:
        fail(f"missing keys: {', '.join(missing)}")
    if not row.get("id") or not row.get("intent"):
        fail("id and intent must be non-empty")
    validate_body(row)
    cls = normalize_class(row)
    row["edges"] = _canon_edges(row.get("edges"))
    computed = compute_verihash(row)
    supplied = row.get("verihash")
    if supplied in (None, ""):
        row["verihash"] = computed
    elif norm_hash(supplied) != computed:
        fail(f"verihash mismatch supplied={supplied} computed={computed}")
    else:
        row["verihash"] = computed
    path.parent.mkdir(parents=True, exist_ok=True)
    rows = load_rows(path)
    new_hash = norm_hash(row["verihash"])
    if any(norm_hash(r.get("verihash")) == new_hash for r in rows):
        fail(f"duplicate verihash {row['verihash']}")
    parent = norm_hash(row.get("parent_hash"))
    if rows:
        tip_hash = norm_hash(rows[-1].get("verihash"))
        if parent != tip_hash and not has_fork(row.get("edges")):
            fail(f"parent_hash {row.get('parent_hash')} != tip {rows[-1].get('verihash')}")
    elif parent:
        fail("genesis row must have empty parent_hash")
    with path.open("a", encoding="utf-8") as fh:
        fh.write(dump_row(row) + "\n")
    print(f"SCRIBE:OK APPEND {row['id']} {row['verihash']} rows={len(rows) + 1} class={cls}")
    row_path = str(row.get("path", ""))
    needs_supports = "/KERNEL/BUILD" in row_path or "/KERNEL/PROMOTE" in row_path
    has_supports = any(str(e.get("type")) == "SUPPORTS" for e in row.get("edges") or [])
    if needs_supports and not has_supports:
        print("SCRIBE:WARN BUILD/PROMOTE missing SUPPORTS")


def cmd_get(path: Path, query: str) -> None:
    q = query.strip()
    qh = norm_hash(q)
    for row in load_rows(path):
        if row.get("id") == q or norm_hash(row.get("verihash")) == qh:
            print(json.dumps(row, ensure_ascii=False, indent=2))
            return
    fail(f"not found {query}")


def cmd_tip(path: Path) -> None:
    rows = load_rows(path)
    if not rows:
        fail("empty ledger")
    print(json.dumps(rows[-1], ensure_ascii=False, indent=2))


def cmd_spine(path: Path, n: int) -> None:
    rows = load_rows(path)
    if not rows:
        fail("empty ledger")
    chunk = rows[-n:] if n > 0 else rows
    for row in chunk:
        print(f"{row.get('id')}\t{row.get('verihash')}\t{row.get('intent')}")


LOG_PATHS = ("/KERNEL/BUILD", "/KERNEL/PROMOTE")
LOG_INTENT = ("slice", "promote", "changelog")


def is_promote_row(row: dict) -> bool:
    path = str(row.get("path", ""))
    if any(path.startswith(p) or p in path for p in LOG_PATHS):
        return True
    intent = str(row.get("intent", "")).lower()
    return any(token in intent for token in LOG_INTENT)


def cmd_edges(path: Path, query: str) -> None:
    q = query.strip()
    qh = norm_hash(q)
    for row in load_rows(path):
        if row.get("id") == q or norm_hash(row.get("verihash")) == qh:
            edges = row.get("edges") or []
            if not edges:
                print("(none)")
                return
            for edge in edges:
                print(f"{edge.get('type')}\t{edge.get('w')}\t{edge.get('to')}")
            return
    fail(f"not found {query}")


def _find_row(rows: list[dict], query: str) -> dict | None:
    q = query.strip()
    qh = norm_hash(q)
    for row in rows:
        if row.get("id") == q or norm_hash(row.get("verihash")) == qh:
            return row
    return None


def _resolve_support_file(target: str, root: Path) -> Path | None:
    candidates = [
        Path(target),
        root / target,
        root.parent / target,
        Path("/home/workdir/.grok/skills") / target,
    ]
    for cand in candidates:
        try:
            if cand.is_file():
                return cand
        except OSError:
            continue
    return None


def _print_row_brief(row: dict, label: str) -> None:
    facts = row.get("facts") or []
    print(f"[{label}] {row.get('id')} {row.get('verihash','')[:12]} {row.get('intent')}")
    if row.get("directive"):
        print(f"  directive: {row.get('directive')}")
    for fact in facts:
        print(f"  fact: {fact}")


def cmd_photo(path: Path, query: str, root: Path) -> None:
    rows = load_rows(path)
    row = _find_row(rows, query)
    if not row:
        fail(f"not found {query}")
    _print_row_brief(row, "NODE")
    for edge in row.get("edges") or []:
        etype = str(edge.get("type", ""))
        target = str(edge.get("to", ""))
        if etype == "INHERITS_FROM":
            parent = _find_row(rows, target)
            if parent:
                _print_row_brief(parent, "PARENT")
            else:
                print(f"[PARENT] {target} (missing body)")
        elif etype == "SUPPORTS":
            supported = _find_row(rows, target)
            if supported:
                _print_row_brief(supported, "SUPPORTS")
                continue
            file_path = _resolve_support_file(target, root)
            if file_path:
                lines = file_path.read_text(encoding="utf-8", errors="replace").splitlines()[:8]
                print(f"[SUPPORTS:FILE] {target} ({file_path}) lines={len(lines)}")
                for line in lines:
                    print(f"  | {line[:160]}")
            else:
                print(f"[SUPPORTS] {target} (unresolved)")


def cmd_log(path: Path, n: int) -> None:
    rows = [r for r in load_rows(path) if is_promote_row(r)]
    if not rows:
        fail("no promote rows")
    chunk = rows[-n:] if n > 0 else rows
    for row in chunk:
        print(f"{row.get('ts','')}\t{row.get('id')}\t{row.get('verihash')}\t{row.get('intent')}")


def main() -> None:
    parser = argparse.ArgumentParser(prog="scribe")
    parser.add_argument("--root", default=None, help="mbp-scribe skill root")
    sub = parser.add_subparsers(dest="cmd", required=True)
    p_append = sub.add_parser("append")
    p_append.add_argument("json")
    p_hash = sub.add_parser("hash")
    p_hash.add_argument("json")
    p_get = sub.add_parser("get")
    p_get.add_argument("query")
    sub.add_parser("tip")
    p_spine = sub.add_parser("spine")
    p_spine.add_argument("n", nargs="?", type=int, default=20)
    p_log = sub.add_parser("log")
    p_log.add_argument("n", nargs="?", type=int, default=20)
    p_edges = sub.add_parser("edges")
    p_edges.add_argument("query")
    p_photo = sub.add_parser("photo")
    p_photo.add_argument("query")
    args = parser.parse_args()
    path = ledger_path(skill_root(args.root))
    if args.cmd == "append":
        cmd_append(path, args.json)
    elif args.cmd == "hash":
        cmd_hash(args.json)
    elif args.cmd == "get":
        cmd_get(path, args.query)
    elif args.cmd == "tip":
        cmd_tip(path)
    elif args.cmd == "spine":
        cmd_spine(path, args.n)
    elif args.cmd == "log":
        cmd_log(path, args.n)
    elif args.cmd == "edges":
        cmd_edges(path, args.query)
    elif args.cmd == "photo":
        cmd_photo(path, args.query, skill_root(args.root))


if __name__ == "__main__":
    sys.exit(main())
