# Execution Safety And Idempotency

## Pre-Mutation Freshness Gate

Immediately before every external mutation:

1. Re-read the target thread/chat/form/event/CRM object.
2. Search for a newer reply, send, draft, submission, cancellation, reschedule, or status change.
3. Confirm exact account/sender identity, recipient, target object, thread, and current mode.
4. Compare the proposed action against prior sent content and current drafts.
5. Stop or recompute if the state changed.

## Verified Facts Only

Use facts from current user wording, the exact current profile/CV, primary communication, or current provider fields. Never invent salary, rate, availability, authorization, sponsorship, notice period, residence, phone, experience, role preference, demographics, references, interview slots, or attachments.

If one consequential fact is unknown, block only the affected action and continue independent safe actions.

## Draft Creation

- Read the complete latest thread, relevant sent history, meeting/CRM context, required attachments, and current form fields.
- Search existing drafts in the same thread and compare content before creating a new one.
- Preserve the original language, voice, sender identity, thread, and actual request.
- Resolve the correct brand/account identity and restrict claims to facts proven for that identity; do not borrow product, employer, financial, or ownership claims from another sender persona.
- Match the user's current verified voice and the thread's language; keep replies concise, direct, and next-step focused without apology padding, fake enthusiasm, or corporate filler.
- Re-verify every numeric claim. Preserve the number's type and scope—actual, projection, GMV, revenue, balance, rate, salary, recovery, or run-rate—and its as-of date. Never blend unlike numbers or inherit a figure from an old draft.
- In dispute, ownership, legal, settlement, or other high-consequence lanes, draft only from exact current-thread facts and the explicitly authorized position; never intensify or invent an assertion.
- Do not leave silent placeholders or assert unverified facts.
- Read back draft ID, thread ID, From, To/CC/BCC, subject, body, and attachments.
- A draft is never action proof beyond `drafted`.

## Attachment Gate

Before a send or submission:

- resolve the intended file and current version;
- open or parse it enough to confirm it is readable and relevant;
- verify filename, file type, size, and attachment count;
- confirm it is attached to the exact draft/form;
- ensure the message does not claim an attachment that is absent;
- read back the final attachment list after creation and after send/submission when exposed.

## Live Email Or WhatsApp Send Gate

Preserve the real-send safety affordance:

1. Show exact sender identity, To/CC/BCC or WhatsApp recipient/device, subject when applicable, final body, attachments, and new-thread/reply status.
2. Announce that the next action creates a real external send.
3. Require explicit final confirmation immediately before transmission. Never bypass this final preview-and-confirm step.
4. Send once.
5. Read back Sent/thread or GOWA message ID and current chat.

Never silently convert audit, simulation, or draft mode into a real send.

For outbound campaigns, keep unconfirmed batches in draft mode, review the exact final text and recipients, send only the explicitly confirmed batch, and prioritize reply handling over additional send volume. Never turn a stale batch into a blast.

## Idempotency And Ambiguous Results

Before mutation, form a stable action fingerprint from the available target fields, such as:

`channel + sender/account + recipient/target ID + thread/application ID + normalized content + attachment identities`

Use it to search for an equivalent completed or pending action.

If a send, form submission, event booking, or provider mutation times out or returns an ambiguous response:

1. Do not retry immediately.
2. Re-read the target system for the fingerprint, message/submission/event ID, timestamp, confirmation, or changed status.
3. Check related mailbox/provider notifications.
4. Retry only when same-layer evidence proves the first action did not occur.
5. If still ambiguous, mark `CHECKPOINT — outcome ambiguous` with the exact probe remaining.

## Forms And Applications

- Read the current schema and conditional questions before answering.
- Fill only verified facts.
- Inspect the final review page and exact target identity.
- Never bypass the platform's final confirmation affordance.
- Submit only under explicitly authorized form/submission scope. If the current request does not specify the exact target and consequential values, show the final review state and require confirmation before submission.
- Capture confirmation text, timestamp, application/submission ID, and provider status.
- After browser errors, reload the application/dashboard before retrying.

## CRM, Calendar, And Internal Mutations

- Resolve full object IDs and current versions.
- Mutate narrowly and read back changed fields.
- Prevent duplicate opportunities, contacts, tasks, events, or notes.
- A calendar event must be re-read for time, timezone, attendees, conferencing link, and cancellation state.
- Internal organization never proves external communication or provider outcome.

## Delivery And Follow-Through

- SMTP/API success means handoff only.
- Verify Sent/thread or GOWA message state immediately.
- Search exact-recipient bounce/failure notifications after the send.
- Keep status `transport accepted / no bounce observed` until recipient/provider delivery evidence or a stronger outcome exists.
- When delivery matters, perform or schedule a delayed bounce check and record the due time.
- A human reply supersedes bounce uncertainty for that communication route.

## Mutation Proof Record

For every external action retain:

- action fingerprint;
- source and target identifiers;
- exact final payload summary;
- mutation timestamp and timezone;
- API/browser response fields;
- same-layer read-back;
- delivery/provider follow-up status;
- unresolved ambiguity, if any.
