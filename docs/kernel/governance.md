# Kernel Track Governance

## Change classes

- Documentation-only: no authority or behavior changes
- Schema: changes accepted structure or field requirements
- Implementation: changes deterministic runtime behavior
- Invariant: changes constitutional authority

## Review rule

Use the smallest governance unit that preserves correctness, traceability, and authority. Independent constitutional changes require independent closure; clerical corrections do not require an artificial sprint.

## Required release order

Change record → source modules/schema → registry → focused tests → inherited regressions → documentation → deterministic compile → digest verification → version/changelog.

## Pull requests

Every pull request must state scope, authority impact, affected components, validation evidence, documentation impact, and activation boundary. Historical material is out of scope unless explicitly listed.
