# Channel Runbooks

Load only the sections relevant to the requested sources. Never copy credentials, private account identifiers, or dated user priorities into this public skill.

## Tool And Coverage Preflight

1. Inventory callable native connectors and lazy-load relevant app tools before declaring a source unavailable.
2. Call the available profile/account/device inventory first. Record the exact address, workspace, device, or profile actually queried and whether the route can enumerate siblings.
3. Detect authentication failure, relevance sorting, pagination, result caps, sampling, truncation, missing cursors, declared-total mismatches, default thread-message limits, and semantic-search false positives.
4. Preserve the query, sort mode, absolute bounds, page token/offset, returned count, declared total, first/last stable identifier, and deduplicated stable-ID count per page.
5. Use native connector or API first, direct transport second, authenticated browser/Computer Use third when the preceding route lacks required fields or same-layer proof.
6. After a failed route, inspect the primary error and test realistic alternatives. Connector reauthentication failure means that route is blocked; try a separately configured native/API or direct-transport route, then an authenticated browser. Do not turn one timeout, empty page, 403, authentication failure, or selector miss into a permanent missing-source conclusion.

## Gmail And Email

### Discovery

- Call the profile endpoint or inspect the account selector before searching. Inventory every relevant mailbox/account and historical alias; do not assume one connector's `me` spans them all. If the connector cannot enumerate/switch accounts, label broader account coverage partial unless independent evidence proves only that mailbox is in scope.
- Search All Mail or equivalent, not Inbox alone. Include sent, archive, drafts, relevant spam/trash, attachments, calendar mail, relay addresses, and provider notifications when the scope requires them.
- Use a broad window query, then pivot by exact domain, participant, role, subject root, recruiter agency, relay address, and requisition/application ID.
- Search pivots without direction filters, then verify inbound and outbound explicitly.
- Run separate `from:me` and `to:me` searches or the Gmail union form `{from:me to:me}` when the goal is sent-or-received coverage, then add alias/domain pivots. The AND form `from:me to:me` is only a self-mail/alias probe and never global coverage proof.
- Define the requested interval as half-open `[local_start, local_end)` in an explicit IANA timezone. Convert both endpoints independently to UTC using current DST rules. Prefer epoch bounds when the source supports them; otherwise query a one-day-safe superset, read returned event timestamps, post-filter to the half-open interval, and probe the boundary band. A date-only Gmail query can include the adjacent local day and is not exact cutoff proof.
- In Gmail UI, switch `Most relevant` to `Most recent` before chronological pagination. `1–100 of many` is explicitly incomplete.
- Consume every cursor/page before claiming full coverage. For each page record the range/token, returned IDs, declared total, and duplicates. The lane remains partial if the connector cannot expose completeness or if counts/totals disagree.
- When both rich search and ID-only search exist, first record whether each returns message IDs or thread IDs. Normalize both routes to one namespace after equivalent query, labels, sort, window, and page exhaustion, then compare deduplicated sets. A disagreement is proof debt, not an empty or full result.

### Thread Read

- Open the complete thread and read message order, event time, From, To, CC, Reply-To, Message-ID/thread ID, labels, delivery notices, attachments, and drafts. Detect any default returned-count cap, raise the limit or use message-level fallback, and reconcile returned/declared counts plus oldest/newest boundaries. Label the thread partial while any boundary remains unknown; a most-recent-message cap such as 20 is only one example.
- Treat snippets as discovery leads only.
- Check later messages from both sides. The newest verified event-time state overrides older content.
- Resolve the RFC-compliant recipient and sender alias. Do not reply to a display name, no-reply address, or relay address without proving it is the valid route.
- Preserve the original thread and reply headers. Decide `reply` versus `reply all` from current participants and context, not by default.

### Drafts, Delivery, And Bounces

- Search existing drafts in the same thread before creating another. Update or remove a stale draft only after proving it is superseded and preserving useful content.
- Read back exact To/CC/BCC, From, subject, body, attachments, draft ID, and thread ID.
- After sending, read Sent and the thread. Bind delivery-failure searches to the exact recipient, message/thread ID, and send window.
- An empty immediate bounce query means `transport accepted / no bounce observed`, not delivered. Reserve `delivery confirmed` for recipient/provider evidence. When outcome matters, perform or schedule a delayed check and record it as pending until completed.

## Close Or Another CRM

- Search exact organization, contact, domain, phone, role, requisition, and known aliases before creating anything.
- Reuse the canonical lead/opportunity. Do not create parallel records or pipelines to avoid reconciling the existing one.
- Read the full lead, contacts, opportunities, latest task, latest activity, notes, status history, and synchronized email/meeting/WhatsApp events.
- Distinguish activity `date_created` or sync time from the communication's real event time.
- Treat labels, notes, opportunity stages, and imported activities as leads until matched to primary communication/provider evidence.
- Prevent duplicate opportunities and duplicate open follow-up tasks. Keep one truthful current action task per real next action unless the workflow genuinely requires multiple owners.
- Resolve full live IDs before mutation, mutate narrowly, and read back every changed field/object.
- Update CRM only after external truth is known; CRM organization is not proof the external event occurred.

## Meetings, Calendar, And Pocket

- Search participant, organization, role, meeting title, calendar event ID, and date.
- Treat semantic Pocket hits as candidates. Record why the hit matched. Verify a source-native recording title/ID, date, participants, and the relevant transcript interval because a role name in a pasted prompt, OCR, summary, footer, or unrelated meeting is not entity evidence.
- Prefer transcript, recording metadata, attendee evidence, calendar event, and post-meeting messages over an AI summary.
- Distinguish proposed, invited, accepted, scheduled, rescheduled, cancelled, attended, no-show, and completed.
- Invitation proves scheduling only. Completion requires participant-bound attendance evidence, an entity-bound transcript interval containing the target interaction, or a post-meeting message that explicitly confirms the meeting occurred. Empty recordings, automated notices, and no-show messages do not prove attendance; retain `scheduled`, `no-show`, or `unclear` as supported.
- When a calendar and transcript disagree, compare event IDs, participants, and occurred-at times before merging them.
- Partition anomalously long recordings into contiguous target intervals. If app/session context, participants, or topic diverges, create a separate candidate interval; material from the unrelated interval cannot update the target entity.
- If participant, context, or time boundaries cannot be established, keep state-changing material unbound and label the recording lane partial. Never guess an entity interval from semantic proximity.
- Preserve `occurred_interval`, recording/detection interval, and `observed_at` separately. A later UI view or detector end time must not rewrite the event chronology.

## GOWA WhatsApp

- Prefer `gowa-whatsapp-api` when installed; otherwise use the available GOWA REST/API capability with the same read and proof rules. The absence of the sibling skill is not proof that WhatsApp is unavailable.
- Call `/devices` in the current run and inventory every `logged_in` device before deciding relevance. Inspect each device for the requested scope and classify it as matched, empty, partial, or blocked. Never assume the first or previously used device owns all chats.
- Search by contact name, phone, raw JID, organization, and aliases. Preserve every JID domain returned by the API; do not restrict discovery to person/group suffixes. Read `/chat/{JID}/messages` with the raw `@`, correct `device_id`, and full pagination.
- Record device ID, JID, direction, timestamp, message ID, text, and media/voice metadata.
- Deduplicate cross-device messages by provider message ID plus raw chat/JID, direction, and participant context, never by JID alone. Use content/time only to detect ID collisions or as a conservative fallback; it is never sole merge proof.
- Reconcile `results.pagination.total` with returned records and later offsets. If a page declares more records than can be retrieved, message coverage is partial even when the final offset is empty.
- Treat chat-list `last_message_time`, `created_at`, and `updated_at` as discovery hints only. Validate recency against hydrated message timestamps; a mismatch requires a wider message/backfill route and blocks an all-window claim.
- Load and inspect relevant media/voice when possible; otherwise mark that lane partial.
- Before sending, verify the current device, recipient number/JID, newest chat messages, and whether email or CRM already proves the intended action occurred.
- After an ambiguous send or timeout, re-read the chat/message IDs before any retry.
- Never copy literal authorization headers or credentials from a connector skill/example. Resolve secrets through the configured provider or environment and keep values out of logs, public skills, and reports.

## ATS, Providers, And Authenticated Forms

- Use authenticated browser or Computer Use for profile-dependent forms; inspect the real current input/output shape before filling.
- Resolve the exact organization, role, requisition/application ID, account/profile, and current submission state.
- Distinguish `opened`, `filled`, `reviewed`, `submitted`, `confirmation displayed`, `provider accepted`, and `externally decided`.
- Read validation errors and conditional sections literally. Do not infer hidden defaults or reuse remembered field schemas.
- Before retrying after a timeout or navigation error, re-open the application/provider dashboard and search for a created submission.
- Preserve exact confirmation text, timestamp, application/submission ID, and resulting status.

## Cross-Channel Contradictions

When sources disagree:

1. Confirm entity identity first.
2. Compare occurred-at time, not sync/import time.
3. Prefer the source that directly owns the event.
4. Preserve both facts when they represent different proof layers.
5. Mark the canonical state `unclear` only when the conflict affects the decision and cannot be resolved safely.
