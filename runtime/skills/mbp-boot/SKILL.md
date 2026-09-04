---
name: mbp-boot
description: Retrieve or update the MBP V2.1-K runtime boot file (one-line SOC cursor, flashed invariants, live ledger schema, scribe, compiled-not-generated). Trigger on latest MBP boot, current MBP prompt, give me MBP boot, update mbp boot, update mbp md, promote MBP version, or similar.
---

# MBP Boot

## Overview

`references/mbp-core-boot.md` is the runtime source of truth (V2.1-K).
Core Systems v5.1 is REFERENCE only. Never paste it into the boot file.

## Instructions

Always treat `references/mbp-core-boot.md` as the sole authority for the current runtime boot.

### Retrieve (default)

When the user asks for the latest / current MBP boot prompt (or any close variant):

1. Read the full contents of `references/mbp-core-boot.md`.
2. Output the entire file content as the sealed response (no added commentary before or after the prompt itself unless the user explicitly requests notes).
3. If the file is missing or empty, report the gap and request the initial version.

### Update

When the user supplies a new or revised core MBP boot prompt and explicitly asks to update / promote / write it:

1. Overwrite `references/mbp-core-boot.md` with the exact text the user provided (preserve formatting).
2. Prepend a one-line changelog entry at the top of the file in the form:
   `<!-- Updated: YYYY-MM-DD | reason: short note -->`
3. Confirm the write succeeded and echo the new first 5–10 lines as verification.
4. Do not invent content. Only write what the user supplies.

### Constraints

- Never invent or “improve” the boot prompt.
- Never merge partial changes unless the user provides the full new version.
- Keep the reference file under 300 lines. If it grows larger, ask the user to prune.
- SOC header is one cursor line. Do not restore a multi-line header block.
- Never paste Core Systems / Critical Flashes into this boot file.
- This skill does not scan chat history. History is irrelevant once the reference file is the source of truth.
