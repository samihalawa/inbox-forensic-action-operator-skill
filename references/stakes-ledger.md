# Stakes Ledger

Ranking by money-in alone buries work whose whole importance is what breaks if it is ignored. Three unpaid $20 invoices are trivial as money and critical as consequence when the sender states the subscription is cancelled on a date. Every actionable item carries a stakes record, and the ledger has two sides.

## Kinds

- `CASH_IN` — money that arrives if the user acts: offers, contracts, invoices owed to him, paying students, bookings.
- `CASH_OUT` — money he loses or owes if he does not act: overdue invoices, penalties, late fees, auto-renewals he wants stopped, claims against him.
- `CAPABILITY` — a service, subscription, account, domain, certificate, API key, listing or access that degrades, suspends, downgrades or is deleted.
- `LEGAL` — a filing, dispute, claim, appeal, takedown, tax or regulator deadline naming him or his companies.
- `RELATIONSHIP` — a live process that dies from silence: interview, assessment, client thread, student, active negotiation.
- `NONE` — nothing is at risk; the item is not actionable and is not ranked.

`NONE` is the rare case, not the default. If the user owes an act at all, something is at stake.

## Fields

`amount` with its currency, `deadline` as an absolute date, `consequence` as one clause naming what happens once that date passes, `reversible` as YES / NO / UNKNOWN, and `remediationLeadTime` — how long the act itself takes once started.

Take every one from the source text only. An amount the source did not state stays blank; a deadline it did not state stays blank. Blank is an evidence gap and is shown as blank. Never substitute zero, never infer a date from a received timestamp, never total figures the sender kept separate. When the source expresses the date relative to itself — "in the next 30 days", "within 48 hours" — count forward from that message's own header date and use the result; that is reading the source. When a message carries both an elapsed date and a later cutoff, the deadline is the cutoff, because that is where the consequence sits.

Distinguish **not applicable** from **unknown**. A nonmonetary deadline has no amount and is complete; an invoice whose figure was never stated has an unknown amount and is incomplete. Only the second is an evidence gap.

## Ranking

Order by the cost of delay, not by irreversibility alone. Irreversibility and an explicit date are inputs to that judgement, never the whole of it.

1. **Act-now tier** — the time remaining is at or below the remediation lead time plus a safety margin, and the consequence is material. Within the tier, order by time remaining ascending, then by magnitude of consequence.
2. **Dated and material** — a named deadline with a material consequence and slack remaining. Order by time remaining ascending.
3. **Material but undated** — substantial value or consequence with no stated date, including contracted receivables. A substantial undated receivable outranks a small dated fee; do not let the presence of a date alone promote a trivial item above it.
4. **Minor dated** — a named deadline whose consequence is small, however permanent.
5. **Everything else** — by evidence credibility and user actionability.

`reversible: UNKNOWN` is ranked as if reversible, and carries an explicit verification task; it is never parked between tiers. An item whose stakes are plainly material but whose amount, deadline or consequence could not be read goes into a bounded verification queue at the top of tier 2, not to the bottom of the list — naming a gap must never be the mechanism that sinks time-critical work.

The critical-loss override still applies: an advanced, recoverable, expiring opportunity is never buried beneath new applications or completed vendor calls.

## Worked counterexamples the ranking must satisfy

- A production service suspended tomorrow, restorable by paying, outranks a permanent deletion of a dormant account in four months.
- A €9,000 contracted receivable with no stated due date outranks a €12 dated late fee.
- A dated compliance filing with no monetary amount is complete, not an evidence gap, and ranks on its consequence.
- An invoice whose amount the sender never stated ranks on its deadline and consequence, with the amount shown blank and queued for verification.
