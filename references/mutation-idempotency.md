# Mutation And Idempotency

Load this reference only for `organize`, `draft`, `send`, or `execute`.

## Freshness Gate

Immediately before each mutation, reread the newest state in every relevant channel. Confirm the action is still needed, no newer reply/cancellation/send/draft/task/provider state supersedes it, and the exact sender, target, thread/object, body, attachments, and authority are resolved.

Build an action fingerprint from source identity, target ID, operation, normalized payload, relevant entity, and current source event. Search for that fingerprint before execution.

## Consequential Facts

Do not fabricate consequential facts. Use current user wording or primary-source values and block only the affected action. For numeric claims preserve type, scope, source, currency/unit, and as-of date. Do not mix actual, projection, GMV, revenue, balance, rate, or run-rate.

## Drafts And Attachments

Search the current thread/entity for existing drafts before creating another. A draft is successful only when exact From/To/CC/BCC, subject, body, attachments, draft ID, and thread ID read back correctly.

Before transmission, verify every required attachment exists, is the intended current version, opens, matches its filename/type, and is actually attached. Do not claim an absent attachment.

For recruiter or application-document corrections, first read the whole thread and identify the exact file previously sent. Send a corrected document only when the mismatch is real and the user authorized follow-through. Keep the correction in the existing thread, name the role-relevant file clearly, verify the exact attachment after send, and do not add another follow-up when the newest message is already outbound.

## Live Send Gate

1. Reread the newest thread/chat and existing drafts.
2. Freeze and internally review the exact final sender, recipients, subject, body, attachments, and thread.
3. When the current request authorizes the exact action or a defined batch containing it, transmit without asking again; that authority persists across items, forms, providers, and retries unless the user changes it. If target, payload, or mutation scope is genuinely absent, request only the missing fact at this boundary.
4. Send exactly once.
5. Read back Sent/thread or chat/provider message ID and current target.
6. Search for immediate failure bound to the exact recipient, ID, and send window.

## Ambiguous Results

If a mutation times out or returns an ambiguous response, do not retry immediately. Reopen the target and search by action fingerprint, stable ID, recipient, timestamp, and payload. Retry only when same-layer evidence proves the first action did not happen.

## Forms, CRM, Calendar, And Providers

Before submit/book/update, reopen the live target and verify identity, current state, required fields, dates/timezone, and validation errors. Inspect the final review page/state and never bypass the target's own final confirmation control. Execute when the current request authorizes the exact action or a defined batch containing it; do not reopen that authority for each item. If the target, consequential values, or mutation scope are genuinely absent, request only the missing fact before the affected mutation.

After action, preserve literal confirmation text, timestamp, stable ID, and resulting state. An API acknowledgement is not a user-visible/provider outcome.

For quota goals, append the result to the canonical tracker only after literal confirmation. Store the raw requisition/job ID, canonical URL, selected filename, contact read-back, required factual answers, confirmation text, timestamp, proof type, and blocker when any. Re-parse the whole tracker after each write and reject malformed-width rows. Recompute the requested cohort from tracker evidence; never carry forward a summary count without reconciling its exact membership.

## Delivery Follow-Through

SMTP/API handoff is below delivery. Empty immediate bounce search is only `no bounce observed`. When outcome matters, perform or schedule a delayed provider/thread check. Update CRM/internal state only after external truth is known.
