---
name: inbox-forensic-action-operator-skill
description: This skill should be used to audit or act on email, CRM, meeting, WhatsApp, calendar, ATS, provider, and browser-action timelines when completeness, latest state, delivery, opportunity status, or safe follow-through matters.
version: 3.0.0
---

# Inbox Forensic Action Operator

## Outcome

Recover the current truth for every in-scope entity, identify the latest ball-in-court, and perform only the mutations the user authorized. Treat channels as one evidence graph without collapsing distinct identities, events, or proof layers.

Research must unblock action. Action must never outrun source truth.

## Normalize The Request

Freeze this contract before source work:

`entities + discovery scope + output scope + time window + exclusions + authority + proof target`

Keep discovery scope, output filtering, and mutation authority independent. `All` expands discovery and requires an honest global coverage verdict. `Action only` changes the rendered rows, not source discovery. A continuation or correction reopens prior conclusions; prior summaries remain leads until current primary evidence confirms them.

## Select Authority

- `audit`: read and classify only;
- `organize`: mutate only explicitly requested internal CRM/task/view objects;
- `draft`: create or update drafts or prepared answers; do not transmit;
- `send`: transmit only after the live-send gate;
- `execute`: perform only the named mutation classes and verify each at its target layer.

In `audit`, new authentication and connection setup are mutations. Do not initiate interactive login/reauthentication, create OAuth links, run connection-ensure/create commands, create browser profiles, pair devices, create/update drafts, send, book, submit, or write. Existing configured authentication may open a read-only transport when it does not change account state.

## Select One Audit Recipe

- `coverage`: prove which identities, routes, bounds, pages, totals, and gaps were covered.
- `entity-status`: discover broadly, pivot every identity, hydrate timelines, and determine the latest supported state.
- `attention`: hydrate objective-relevant candidates, deduplicate and rank actions due now; candidate-only discovery remains `sampled` or `partial`.
- `delivery`: bind each outbound action to draft, Sent/chat/provider ID, failure, delivery, and reply evidence.
- `recovery`: recover missing scope or prior authority from tasks/history; never use history as proof of current external truth.

Load [Audit Recipes](references/audit-recipes.md) for the selected route.

## Source-Quality Ladder

Prefer the source that owns the event, then its native connector/API, direct transport, and an already-authenticated browser. Use task/history sources only to recover missing context. A failed route is not an empty source.

Before declaring a source unavailable, inventory callable capabilities and try viable read-only alternatives. Read literal outputs, including identities, errors, counts, keys, ranges, timestamps, and bodies.

## Adapter Contract

Every in-scope source row must record:

| Identity | Route | Bounds/order | Cursor or range | Declared / returned / deduped | Hydration | Coverage | Failure origin | Proof remaining |
|---|---|---|---|---|---|---|---|---|

Coverage is exactly one of `full`, `partial`, `sampled`, `missing`, or `blocked`. Failure origin is `skill`, `provider/source`, `route/environment`, or `unresolved`.

An adapter must enumerate identities; express the query/window; force chronological order; exhaust cursors or prove a finite cursorless result; expose stable IDs and totals; hydrate decisive records; state limitations; and, only when authorized, mutate and read back the target.

Load only the adapters in scope:

- [Email](references/adapters/email.md)
- [CRM](references/adapters/crm.md)
- [Meetings](references/adapters/meetings.md)
- [WhatsApp](references/adapters/whatsapp.md)
- [Forms And Providers](references/adapters/forms.md)

## Core Loop

1. Freeze the request, timezone, half-open `[local_start, local_end)` bounds, independently converted UTC bounds, identities, exclusions, authority, and recipe.
2. Select adapters and inventory current identities/routes before filtering relevance.
3. Discover both directions and relevant archive, sent, draft, media, calendar, provider, and status lanes. Pivot organization, domain, contact, address/JID, role, subject, requisition, event, and stable IDs.
4. Force chronological order, exhaust or reconcile every page/range, deduplicate stable IDs, and post-filter real event timestamps. Re-run pivots discovered later.
5. Hydrate complete decisive records and canonicalize with [Core Evidence Model](references/core-evidence-model.md). Load [Opportunity Overlay](references/overlays/opportunity.md) only for career, sales, deal, contract, or work-offer classification.
6. Immediately before an authorized mutation, reread the newest state, resolve the exact target, execute once, and verify at the promised layer using [Mutation And Idempotency](references/mutation-idempotency.md).

## Stop Predicate

Stop only when each required source has either reconciled identity, bounds, order, range/cursor, IDs/totals, and hydration or a named gap with failure origin and next proof; every discovered entity has a latest verified event; and the promised proof layer is reached.

If any required global source or proof layer remains incomplete, return `CHECKPOINT`, not `all`, `complete`, or an upgraded outcome. A union of partial slices is not automatically full.

## Output

Lead with the direct answer. Then provide generic source coverage and entity rows:

| Entity | Latest event/state | Proof layer | Response owner | Next-action owner | Action due | Next action | Coverage debt |
|---|---|---|---|---|---|---|---|

Keep drafts, sends, handoff, delivery, replies, invitations, attendance, forms, provider decisions, offers, acceptance, contracting, onboarding, and start separate. Finish with corrections to stale state, executed mutations and read-back proof, unresolved proof count, failure origins, and exact next probes.

Do not fabricate consequential facts. Use current user wording or primary-source values and block only the affected action. Never embed or persist reusable secret values in package files, examples, logs, reports, or persistent memory; resolve them at runtime and use `[REDACTED_SECRET]` when representation is unavoidable.

## Package Validation

After changing this skill, run:

```bash
node scripts/validate-package.mjs
```

Publish only after fixtures, installed/source equality, [Live Acceptance](tests/live-acceptance.md), and local/remote equality pass.
