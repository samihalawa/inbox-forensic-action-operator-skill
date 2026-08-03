# INDEX

proof and authority | transport/no-bounce or acceptance collapsed into higher outcomes | keep delivery, acceptance, hire, onboarding, and start separate; require final send confirmation | do not let source access grant mutation authority | run package invariants and acceptance scenarios
inbox/action recovery | output filters replaced full discovery | recover globally, filter presentation last | do not infer completeness from recent or human-only results | require source ledger and latest-state proof

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
- Superior route: recover the owner conversation, build the complete entity inventory, search both directions across Gmail, Close, meetings, every relevant GOWA device, and current forms/providers, then filter only the rendered result.
- Evidence: referenced conversation `6a6c4324-1e30-83eb-b7a5-a02f6d51cdd3`; user corrections at messages 25, 28, and 30; skill acceptance scenarios 1, 6, 7, and 8.
- Trigger terms: `all`, `reanalyze`, `no assumptions`, `accepted`, `offer`, `only action`, `new`.
- Do: keep discovery scope, output scope, action authority, and proof layer separate.
- Don't: claim `all`, `accepted`, `sent`, or `submitted` from a sampled query, CRM label, draft, or API acknowledgement.
- Verify before reuse: current source ledger, complete pagination, latest event on both sides, and same-layer read-back for every mutation.
