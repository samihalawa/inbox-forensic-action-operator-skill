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

#### Dual-Surface Enumeration & Arrival-Adjustment Protocol (Inline-Only)

1. **Inline-only execution (zero incidental files):** Execute all census queries, hydration, MIME decoding, classification, and report rendering strictly inline in memory (`python3 -`, `node -e`, stdin/pipes, `data:` URLs). Never create helper scripts, temp JSON dumps, intermediate HTML files, or external tracker files; write only the explicitly requested final report artifacts.
2. **Authoritative epoch-buffered census & direction union:** Query Gmail with `in:anywhere after:<start_epoch - 86400> before:<end_epoch + 3600>` and `includeSpamTrash=true`, paging `maxResults=500` until `nextPageToken` is absent. Never pre-filter by sender, topic, label, or read state. Run supplemental `from:me` / `to:me` checks only to union missing IDs into the same candidate set, then post-filter strictly on `internalDate` ms in `[start_ms, end_ms)`.
3. **Bounded retry & route fallback:** Hydrate `format=full` with bounded concurrency (~10 workers). On `429`, `5xx`, or transient quota `403`, honor `Retry-After` or bounded exponential backoff with jitter (max ~5–6 attempts); on non-transient scope/auth `403`, stop retrying that route and switch immediately down the fallback chain: direct OAuth REST API (in-memory refresh only) -> local `gmail` CLI (`readonly read --page-token`, with `AGY_ACCOUNT=<email>` per connected account) -> IMAP -> permitted signed-in browser. Retain successes in memory, retry only failed IDs, deduplicate by stable provider ID, and disclose any residual gap.
4. **Direction vs. sent-state separation (self-addressed service alerts):** Keep `direction` (`Received` / `Sent` / `Draft`) distinct from mailbox folder/labels. Derive `Draft` from `DRAFT` label or live `/drafts` membership (`Draft (unsent latest)` vs `Draft (superseded by Sent)`). Derive `Sent` only when `SENT` is in `labelIds` AND the message is user-authored (`From` is an owned identity and not an automated server/monitoring/no-reply service). A service-originated or automated self-addressed alert (such as server disk/monitoring mail) addressed to an owned address is `Received`, even if Gmail placed it in `SENT`.
5. **MIME transfer + UTF-8-first decoding & mojibake repair:** Decode `Content-Transfer-Encoding` (`base64` / `quoted-printable`) to raw bytes and decode RFC 2047 headers first. Because some mailers mislabel UTF-8 bytes as `iso-8859-1` or `windows-1252`, attempt strict UTF-8 decoding when high bytes form valid UTF-8 (and run a Latin-1/CP1252-to-UTF-8 repair pass when UTF-8 mojibake sequences appear) before falling back to the declared charset with replacement; mark undecodable parts rather than guessing.
6. **Apple Mail `Envelope Index` arrival-adjustment & full local secondary census:** Query `~/Library/Mail/V*/MailData/Envelope Index` (typically `V10`, SQLite `?mode=ro`) joining `messages m`, `mailboxes mb ON m.mailbox = mb.ROWID`, `subjects s ON m.subject = s.ROWID`, and `addresses a ON m.sender = a.ROWID` for `m.date_received >= start_epoch AND m.date_received < end_epoch`, mapping mailbox URL UUIDs via `~/Library/Accounts/Accounts4.sqlite` (`ZACCOUNT.ZIDENTIFIER` -> `ZUSERNAME`). For primary accounts, locate `.emlx` files under `~/Library/Mail/V*/<UUID>/` by `m.ROWID`, parse raw RFC headers (skipping the byte-count line), normalize `<Message-ID>` (lowercase, strip angle brackets), and fetch any in-window delivery whose Gmail `internalDate` preceded `start_ms` via `rfc822msgid:<id>` tagged `arrival-adjusted` (recording unmatched/duplicate counts). For unauthenticated secondary local accounts, do **not** stop at `MAX(date_received)`: enumerate and hydrate **all** in-window `date_received` rows and `.emlx` headers/bodies, deduplicate against live sources, record the `MAX(date_received)` watermark, and label coverage `partial (cache-only)`.
7. **Classification ordering & sensitive-redaction gate:** Check procurement/RFP portals, human replies in `Spam`/`Trash`, LinkedIn human DMs, account-suspension/payment-failure alerts, and security/Takeout warnings **before** generic OTP/receipt/newsletter rules so real buyer receipts (`proposal`/`rfp`/`time limit for receipt`) or paused-subscription notices are never buried as noise. Before writing any Markdown, HTML, or CSV output, run a global redaction pass across **subject, sender, body, snippet, and attachment excerpts** replacing OTPs, PINs, confirmation/recovery/authorization codes, and long URL query/path credentials (`adt`, `t`, `k`, `jwt`, `magic`, `ticket`, `oobCode`, `session`, `upn`, `params`, or auth tokens) with `[code withheld]` / `[withheld]`.

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
