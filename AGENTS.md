# Agent Guide

## Repository purpose

This repository preserves the historical development of Mission Brief Protocol and hosts the current Kernel Track.

## Authority map

- Existing root, `prompt/`, and `runtime/` material is historical project state. Preserve it unless a task explicitly authorizes migration or correction.
- `kernel/` is the canonical workspace for Kernel Track 1.x.
- `docs/kernel/` explains Kernel Track behavior but does not override `kernel/`.
- `kernel/releases/` contains immutable generated snapshots.

## Working rules

1. Read `kernel/AGENTS.md` before changing Kernel Track files.
2. Make Kernel Track changes on a branch and submit them through a pull request.
3. Never silently import historical language into the current kernel. Record reconciliation in the applicable change file.
4. Do not hand-edit generated boot prompts or release snapshots.
5. Update tests and explanatory documentation whenever a public component contract changes.
6. Preserve provenance, typed relationships, and version boundaries.
7. Keep process proportional to the risk and independence of the change.

## Protected history

Do not move, rename, delete, or rewrite pre-Kernel Track files merely to make the repository look cleaner. Historical structure is evidence.
