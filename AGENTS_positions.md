# INDEX

inbox/action recovery | output filters replaced full discovery | recover globally, filter presentation last | do not infer completeness from recent or human-only results | require source ledger and latest-state proof

## 2026-08-03 — CURRENT — Global discovery before action-only output

- Project: `inbox-forensic-action-operator-skill`; surface: cross-channel inbox and action recovery.
- Regression: prior runs answered an all-opportunity acceptance audit with recent generic alerts, then treated `new`, `human`, and `action-only` as discovery limits.
- Superior route: recover the owner conversation, build the complete entity inventory, search both directions across Gmail, Close, meetings, every relevant GOWA device, and current forms/providers, then filter only the rendered result.
- Evidence: referenced conversation `6a6c4324-1e30-83eb-b7a5-a02f6d51cdd3`; user corrections at messages 25, 28, and 30; skill acceptance scenarios 1, 6, 7, and 8.
- Trigger terms: `all`, `reanalyze`, `no assumptions`, `accepted`, `offer`, `only action`, `new`.
- Do: keep discovery scope, output scope, action authority, and proof layer separate.
- Don't: claim `all`, `accepted`, `sent`, or `submitted` from a sampled query, CRM label, draft, or API acknowledgement.
- Verify before reuse: current source ledger, complete pagination, latest event on both sides, and same-layer read-back for every mutation.
