# INDEX

source completeness | connector success or list metadata treated as full truth | bind identity, bounds, sort, cursors, totals, and hydrated event IDs | do not infer all from relevance, one account/device, or declared totals | replay real pagination and boundary fixtures
proof and authority | transport/no-bounce or acceptance collapsed into higher outcomes | keep delivery, acceptance, hire, onboarding, and start separate; require final send confirmation | do not let source access grant mutation authority | run package invariants and acceptance scenarios
inbox/action recovery | output filters replaced full discovery | recover globally, filter presentation last | do not infer completeness from recent or human-only results | require source ledger and latest-state proof

## 2026-08-03 — CURRENT — Completeness is an executable source contract

- Project: `inbox-forensic-action-operator-skill`; surface: mailbox, transcript, and multi-device source discovery.
- Regression caught: one connector route, relevance-sorted UI, date-only bounds, transcript-level entity binding, and declared pagination totals could each produce plausible but incomplete truth.
- Superior route: record exact source identity; enforce absolute bounds, chronological order, cursor exhaustion, stable-ID deduplication, total reconciliation, interval-level provenance, and hydrated message timestamps.
- Evidence: live seven-day Gmail browser pagination; independent Gmail, Pocket/Screenpipe, and GOWA read-only audits on 2026-08-03.
- Trigger terms: `all`, `last N days`, `every account`, `every device`, `meeting`, `transcript`, `pagination`, `no assumptions`.
- Do: treat route, identity, query/order/bounds, pages/totals, and event-level provenance as separate proof fields.
- Don't: treat authentication failure as mailbox emptiness or list/summary metadata as complete event history.
- Verify before reuse: replay boundary, sort, account/device, pagination-mismatch, long-recording, semantic-hit, and raw-JID acceptance fixtures.

## 2026-08-03 — CURRENT — Proof taxonomy and mutation authority stay separate

- Project: `inbox-forensic-action-operator-skill`; surface: delivery/outcome states and external actions.
- Regression caught: delivery inferred merely from no observed bounce, acceptance collapsed with hire, and a same-message send-confirmation bypass could overstate outcomes or weaken the real-send guard.
- Superior route: use transport/no-bounce as lower proof, split mutual acceptance from hire/onboarding/start, and require the final preview plus explicit confirmation for every live send.
- Evidence: independent critique of `247ce6a`; full 31-message report; current safety-affordance requirements.
- Trigger terms: `sent`, `delivered`, `accepted`, `hired`, `execute`, `submit`, `send now`.
- Do: treat source coverage, proof state, and authorized mutation classes as independent dimensions.
- Don't: infer write authority from reading a source or retry an ambiguous external action blindly.
- Verify before reuse: package validator, exact target read-back, idempotency search, and same-layer external proof.

## 2026-08-03 — CURRENT — Global discovery before action-only output

- Project: `inbox-forensic-action-operator-skill`; surface: cross-channel inbox and action recovery.
- Regression: prior runs answered an all-opportunity acceptance audit with recent generic alerts, then treated `new`, `human`, and `action-only` as discovery limits.
- Superior route: recover the owner conversation, build the complete entity inventory, search both directions across Gmail and Close, inspect meetings, inventory every logged-in GOWA device before relevance filtering, and check current forms/providers before filtering the rendered result.
- Evidence: sequential recovery of the originating correction-heavy conversation; skill acceptance scenarios 1, 6, 7, and 8.
- Trigger terms: `all`, `reanalyze`, `no assumptions`, `accepted`, `offer`, `only action`, `new`.
- Do: keep discovery scope, output scope, action authority, and proof layer separate.
- Don't: claim `all`, `accepted`, `sent`, or `submitted` from a sampled query, CRM label, draft, or API acknowledgement.
- Verify before reuse: current source ledger, complete pagination, latest event on both sides, and same-layer read-back for every mutation.
