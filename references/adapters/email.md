# Email Adapter

## Identity And Route Preflight

1. Inventory native profiles/accounts and historical aliases before search. One connector's `me` never proves every account.
2. Use native connector/API first, direct transport second, and an already-authenticated browser third. Authentication failure blocks that route, not the mailbox.
3. For direct configuration, read only explicitly named keys. Split each matching line at the first `=`, preserve the remainder literally, ignore blank/comment lines, never `source`, `eval`, interpolate, or print values, and fail the route if a required key is absent or duplicated.
4. After direct authentication, read back the actual mailbox identity and capabilities. Keep `account_window_coverage` separate from `requested_identity_coverage`.

## Discovery

- Search All Mail/equivalent plus Sent, Drafts, relevant Spam/Trash, attachments, calendar mail, relays, and provider notices required by the recipe.
- Search pivots without direction filters, then verify inbound and outbound. For Gmail use separate `from:me` and `to:me` or union `{from:me to:me}`. The AND query `from:me to:me` is only a self-mail/alias diagnostic.
- Define a half-open local interval in an IANA timezone, convert endpoints independently, query a safe superset, and post-filter message event timestamps.
- Force chronological order. `Most relevant` and `1–100 of many` are incomplete.
- Normalize rich and ID-only searches to one message/thread namespace before comparing sets.

## Cursor And Cursorless Proof

For paged routes record query, order, page token/range, returned IDs, declared total, duplicates, and final range.

For IMAP or another finite cursorless result record mailbox identity, UIDVALIDITY when exposed, search criteria, returned UID count, first/last UID, stable provider-ID dedupe count, and exact timestamp post-filter. Do not invent pagination when the protocol returns one complete finite set.

## Thread, Draft, And Send Proof

Read full message order, event times, From/To/CC/Reply-To, stable message/thread IDs, labels, attachments, failures, and drafts. Detect default message caps and reconcile oldest/newest boundaries.

Membership in Drafts or a source-native `DRAFT` label is authoritative. `From: me`, All Mail membership, body content, or an outbound-looking recipient never proves send. `Sent` requires Sent membership plus current thread/provider readback. A self-report with no matching Sent/thread evidence remains attempted/self-reported with mailbox proof debt.

Record draft age and current accuracy. Separate named-human/prior-contact drafts from cold/uncontacted batches; do not auto-send either because of age.

## Browser Completeness

Record visible account, query, chronological sort, displayed range/total, thread-versus-message namespace, pages exhausted, and event timestamps. A signed-in browser can recover a blocked connector route, but `of many`, relevance ordering, or thread-only timestamps remain partial.

An expected message that is absent is a signal: search Spam/Trash, aliases, provider/dashboard state, and delivery configuration before concluding nothing happened.
