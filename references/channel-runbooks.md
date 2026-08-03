# Channel Runbooks

Load only the sections relevant to the requested sources. Never copy credentials, private account identifiers, or dated user priorities into this public skill.

## Tool And Coverage Preflight

1. Inventory callable native connectors and lazy-load relevant app tools before declaring a source unavailable.
2. Record the account, mailbox, workspace, device, or profile actually queried.
3. Detect pagination, result caps, sampling, truncation, missing cursors, and semantic-search false positives.
4. Preserve query, page/result counts, and stable identifiers.
5. Use native connector or API first, direct transport second, authenticated browser/Computer Use third when the preceding route lacks required fields or same-layer proof.
6. After a failed route, inspect the primary error and test realistic alternatives; do not turn one timeout, empty page, 403, or selector miss into a permanent missing-source conclusion.

## Gmail And Email

### Discovery

- Inventory every relevant mailbox/account and historical alias; do not assume one connector's `me` spans them all.
- Search All Mail or equivalent, not Inbox alone. Include sent, archive, drafts, relevant spam/trash, attachments, calendar mail, relay addresses, and provider notifications when the scope requires them.
- Use a broad window query, then pivot by exact domain, participant, role, subject root, recruiter agency, relay address, and requisition/application ID.
- Search pivots without direction filters, then verify inbound and outbound explicitly.
- Run separate `from:me` and `to:me` searches or the Gmail union form `{from:me to:me}` when the goal is sent-or-received coverage, then add alias/domain pivots. The AND form `from:me to:me` is only a self-mail/alias probe and never global coverage proof.
- For Gmail browser syntax, prefer explicit bounded queries such as `in:anywhere after:YYYY/MM/DD before:YYYY/MM/DD`, followed by entity pivots. Confirm timezone boundaries.
- Consume every cursor/page before claiming full coverage. If the connector cannot expose completeness, label the lane partial.

### Thread Read

- Open the complete thread and read message order, event time, From, To, CC, Reply-To, Message-ID/thread ID, labels, delivery notices, attachments, and drafts.
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
- Treat semantic Pocket hits as candidates. Verify recording title, date, participants, and the relevant transcript segment because semantically related but unrelated meetings can be returned.
- Prefer transcript, recording metadata, attendee evidence, calendar event, and post-meeting messages over an AI summary.
- Distinguish proposed, invited, accepted, scheduled, rescheduled, cancelled, attended, no-show, and completed.
- Invitation proves scheduling only. Attendance, transcript, or a verified post-meeting event proves occurrence.
- When a calendar and transcript disagree, compare event IDs, participants, and occurred-at times before merging them.

## GOWA WhatsApp

- Use `gowa-whatsapp-api`, not a WhatsApp MCP wrapper.
- Call `/devices` in the current run and inspect every relevant `logged_in` device. Never assume the first or previously used device owns all chats.
- Search by contact name, phone, raw JID, organization, and aliases. Read `/chat/{JID}/messages` with the raw `@`, correct `device_id`, and full pagination.
- Record device ID, JID, direction, timestamp, message ID, text, and media/voice metadata.
- Load and inspect relevant media/voice when possible; otherwise mark that lane partial.
- Before sending, verify the current device, recipient number/JID, newest chat messages, and whether email or CRM already proves the intended action occurred.
- After an ambiguous send or timeout, re-read the chat/message IDs before any retry.

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
