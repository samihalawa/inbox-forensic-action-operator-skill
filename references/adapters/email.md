# Email Adapter

## Identity And Route Preflight

1. Inventory native profiles/accounts and historical aliases before search. One connector's `me` never proves every account.
2. Use native connector/API or direct SMTP/IMAP. Follow current owner/runtime restrictions on Gmail UI: never use Gmail print views; browser access requires an explicitly permitted operation or visual proof. A route authentication failure does not prove the mailbox unavailable.
3. For direct configuration, read only explicitly named keys. Split each matching line at the first `=`, preserve the remainder literally, ignore blank/comment lines, never `source`, `eval`, interpolate, or print values, and fail the route if a required key is absent or duplicated.
4. After direct authentication, read back the actual mailbox identity and capabilities. Keep `account_window_coverage` separate from `requested_identity_coverage`.

## Discovery

- Search All Mail/equivalent plus Sent, Drafts, relevant Spam/Trash, attachments, calendar mail, relays, and provider notices required by the recipe.
- Search pivots without direction filters, then verify inbound and outbound. For Gmail use separate `from:me` and `to:me` or union `{from:me to:me}`. The AND query `from:me to:me` is only a self-mail/alias diagnostic.
- Define a half-open local interval in an IANA timezone, convert endpoints independently, query a safe superset, and post-filter message event timestamps.
- Force chronological order. `Most relevant` and `1–100 of many` are incomplete.
- Normalize rich and ID-only searches to one message/thread namespace before comparing sets.

### Census, hydration and continuity

For all/every/recent-correspondence work, exhaust an independent message-ID census before relevance filters, then hydrate complete bodies and consequential threads in provider-sized batches. Reconcile the union of census IDs and same-window IDs discovered through thread hydration. Rich search may omit objects despite normal pagination; its exhaustion alone is not proof. Retain successful bodies/cursors in runtime memory and fetch only missing slices. Detect thread caps, truncated responses and DST boundary omissions.

For Gmail, use exact epoch seconds plus timestamp post-filtering: date strings use PST midnight, API alias expansion differs from UI, and API search is not thread-wide. See [Gmail filtering contract](https://developers.google.com/workspace/gmail/api/guides/filtering). Include verified historical aliases and relevant folder sets; distinguish account-local coverage from all requested identities. A zero-result day during suspension/renaming/forwarding changes is an unresolved continuity slice until delivery/history evidence resolves it, not proof of zero incoming mail.

Keep recent messages, older context, unique threads, duplicates and per-account counts separate. No invented per-day totals. Recover malformed international text from raw RFC 2822 MIME and its declared charset; do not reconstruct corrupted rendered text by guessing.

### Exhaustive Recruiter Corpus

When scope is all/every recruiter or LinkedIn conversation, freeze the mailbox, time window, and query family, then exhaust every page before relevance filtering. Union full-message LinkedIn relays, digest-only notices, and direct human recruiter/employer email in the same window. Record separate counts and IDs for body-present relays, digest-only source signals, direct email, duplicates, and machine traffic. A relay-only query cannot support complete recruiter coverage.

Only after enumeration, group by exact person, organization, role/requisition, and opportunity; hydrate each full thread and later Sent, Drafts, direct replies, Calendar, closure, ATS/provider, and previous-attachment state. Preserve one exclusion reason per non-actionable entity.

## Cursor And Cursorless Proof

For paged routes record query, order, page token/range, returned IDs, declared total, duplicates, and final range.

For IMAP or another finite cursorless result record mailbox identity, UIDVALIDITY when exposed, search criteria, returned UID count, first/last UID, stable provider-ID dedupe count, and exact timestamp post-filter. Do not invent pagination when the protocol returns one complete finite set.

## Thread, Draft, And Send Proof

Read full message order, event times, From/To/CC/Reply-To, stable message/thread IDs, labels, attachments, failures, and drafts. Detect default message caps and reconcile oldest/newest boundaries.

Bind every failure or bounce to the exact message ID, recipient, and send window. A failed supplementary or relay message does not invalidate a separate main package unless provider evidence links that exact send.

Membership in Drafts or a source-native `DRAFT` label is authoritative. `From: me`, All Mail membership, body content, or an outbound-looking recipient never proves send. `Sent` requires Sent membership plus current thread/provider readback. A self-report with no matching Sent/thread evidence remains attempted/self-reported with mailbox proof debt.

Record draft age and current accuracy. Separate named-human/prior-contact drafts from cold/uncontacted batches; do not auto-send either because of age.

## Browser Completeness

Record visible account, query, chronological sort, displayed range/total, thread-versus-message namespace, pages exhausted, and event timestamps. A signed-in browser can recover a blocked connector route, but `of many`, relevance ordering, or thread-only timestamps remain partial.

An expected message that is absent is a signal: search Spam/Trash, aliases, provider/dashboard state, and delivery configuration before concluding nothing happened.
