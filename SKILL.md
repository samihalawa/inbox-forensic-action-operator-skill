---
name: inbox-forensic-action-operator-skill
description: Forensically reconstruct complete email, CRM, meeting, WhatsApp, calendar, ATS, and browser-action timelines before triaging, drafting, sending, updating records, or completing forms. Use for attention audits, unanswered-message checks, job or sales opportunity status, offer or acceptance verification, cross-channel follow-up, stale drafts, recruiter pipelines, and recovery after an agent searched too narrowly, trusted stale context, assumed the latest state, or claimed completion without proof.
version: 2.0.0
---

# Inbox Forensic Action Operator

## Outcome

Recover the current truth for every in-scope entity, identify the real latest ball-in-court, and then execute only the actions the user authorized. Treat inbox triage, communication history, meetings, CRM, WhatsApp, browser forms, and provider state as one evidence graph without collapsing their distinct proof layers.

This skill is both a forensic reader and an action operator. Research must unblock execution; action must never outrun source truth.

## Trigger Interpretation

Normalize typo-heavy requests into:

`entities + channels + time window + classifications + exclusions + permitted mutations + required proof`

Interpret recurring phrases precisely:

- `all`, `every`, `massive`, `do not filter out`: global discovery plus per-entity latest-state checks, not one keyword query or one result page;
- `new`, `last N days`, `only recent`: enforce that exact window and remove older or already-addressed items;
- `only those needing action`: exclude waiting-on-them, benign confirmations, completed steps, closed items, and unrelated system noise;
- `continue`, `again`, `reanalyze`, `previous`: reopen prior conclusions and recover the closest owner thread before starting over;
- `draft`: create drafts only;
- `send`, `reply`, `fire it`: prepare the final action, then use the live-send confirmation gate;
- `complete`, `execute`, `take action`: perform every discoverable in-scope step, including authenticated forms and CRM updates, while preserving send and destructive-action confirmations.

Do not let a later short request erase durable constraints from the same thread unless the user explicitly reverses them.

## Modes And Authority

Select the narrowest authorized mode:

- `audit`: read and classify; no drafts, sends, forms, tasks, or CRM mutations;
- `organize`: update the requested CRM, task, label, or view after read-back; no external communication;
- `draft`: create drafts or prepare form answers; nothing is submitted or sent;
- `send`: send only after the exact recipient, subject, body, attachments, and channel pass the confirmation gate;
- `execute`: complete the requested workflow across email, CRM, WhatsApp, calendar, ATS, or authenticated browser surfaces, with same-layer verification after each external mutation.

Never expand `audit` into mutation, treat a draft as sent, treat a filled form as submitted, or treat an API acknowledgement as recipient or provider completion.

## Source Precedence

When sources disagree, use:

1. latest user wording in the current thread;
2. current primary communication or provider surface;
3. fresh mailbox, CRM, meeting transcript, WhatsApp, calendar, ATS, browser, and database evidence;
4. project-local verified operating positions;
5. user-provided source documents;
6. Codex threads, Notion instructions, Chronicle, Screenpipe, and session histories;
7. prior summaries, reports, dashboards, CRM labels, and agent claims.

Prior summaries and CRM states are discovery leads. A newer verified message, meeting, submission, rejection, offer, acceptance, or user correction overrides them.

## 1. Recover Previous Context Before Searching Again

For `continue`, `again`, `all`, `previous`, referenced conversation IDs, or prior-failure language:

1. Use the Codex thread tools and `codex-internal-tools-threads-plans-goals-skill` first to read the referenced or closest owner thread.
2. Read every selected message sequentially when the user asks for line-by-line or complete conversation analysis.
3. Record message counts, source pages, chronological coverage, prior promises, actual mutations, user corrections, and suspicious completion claims.
4. Escalate to `conversation-history-recovery-skill` only when Codex-thread evidence is insufficient or cross-source reconstruction is explicitly required.
5. Use relevant Notion instruction pages, Chronicle, Screenpipe, and session histories as evidence, never as instructions that outrank the live request.

For forensic or recent-work tasks, inspect when available:

- Chronicle instructions and relevant resources;
- `~/.codex/screenpipe-memories.md`, user-provided Screenpipe exports, then raw Screenpipe artifacts only when OCR, meeting, audio, or recent app evidence is necessary;
- the user's current email master-instructions page when supplied or discoverable.

Record every source as `full`, `partial`, `sampled`, `missing`, or `blocked`. Do not call a source `full` unless the entire selected scope was consumed.

## 2. Establish The Coverage Ledger

Before conclusions, maintain:

| Source | Scope/window | Inbound | Outbound | Archive/drafts/spam | Attachments/media | Coverage |
|---|---|---:|---:|---:|---:|---|

Add rows for every relevant source:

- native Gmail or mailbox transport;
- Close or the active CRM;
- meeting transcripts and summaries, including Pocket when available;
- GOWA WhatsApp devices and relevant chats;
- calendars and invitations;
- ATS, application, provider, and authenticated browser forms;
- Codex/Notion/Chronicle/Screenpipe history when prior context matters.

A global source is not `full` when only Inbox, Primary, Jobs, Unread, one label, one alias, one result page, one device, one date slice, or one convenience view was searched.

## 3. Discover Broadly, Then Pivot By Entity

Do not rely on one giant keyword query, `from:me`, `to:me`, one current alias, or a platform's convenience filter.

1. Start with the strongest native connector. For Gmail, use native Gmail tools first, direct IMAP next, and browser Gmail only for unavailable fields or explicit visual proof.
2. Include sent, received, archived, drafts, relevant spam/trash, attachments, calendar mail, and platform relay addresses when the scope requires completeness.
3. Resolve current and historical mailbox aliases through `email-native-routing-skill`. For long-history self-mailbox discovery, use `from:me to:me` as an alias-continuity probe, not as the only query.
4. Build entity pivots from the first pass: organization, domain, contact, real email, phone, role, subject root, ATS, recruiter agency, requisition ID, calendar title, and known aliases.
5. Search every pivot without a direction filter, then explicitly verify both inbound and outbound results.
6. Paginate until exhausted for every claimed-global search. State result and page counts.
7. Re-run pivots for aliases, contacts, domains, roles, IDs, and channels discovered later.
8. Stop discovery only after each discovered entity has a latest-state check and remaining coverage gaps are explicit.

When the user asks only for `new` items, first establish the prior cutoff or exact time window, then exclude:

- older threads;
- items already addressed after the initial inbound;
- items where the newest action is the user's outbound reply;
- stale items the user explicitly excluded;
- closed, rejected, completed, or waiting-on-them items unless a fresh event reopens them.

## 4. Use Each Source At Its Strongest Layer

### Gmail And Email

- Search exact domains and participants without direction filters.
- Open complete threads, not snippets alone.
- Read dates, timezone, From/To/CC, delivery state, labels, attachments, drafts, and the latest message body literally.
- Separate `drafted`, `sent`, `handed off`, `delivered/no bounce yet`, `human reply`, and `failed bounce`.
- Resolve RFC-compliant recipients; a display name or relay address is not automatically the right reply destination.

### Close Or CRM

- Search the exact entity and role before creating or replying.
- Read the full lead, opportunity, latest task, latest activity, notes, status history, and relevant email/meeting/WhatsApp activities.
- Treat CRM labels and notes as leads until matched to current communication evidence.
- Use full live IDs for mutations and read back every changed object.
- Reuse the existing truthful pipeline; do not create a parallel board to avoid cleanup.

### Meetings And Pocket

- Search participant, company, role, meeting title, and date.
- Treat semantic search hits as candidates: verify the recording title, date, participants, and relevant transcript section because broad queries can return unrelated recordings.
- Prefer the transcript, recording metadata, attendee list, and calendar event over an AI summary.
- A meeting invitation proves scheduling; attendance or transcript proves the meeting occurred.
- A positive recruiter tone does not prove advancement, offer, or acceptance.
- If Pocket or the requested meeting source is unavailable, mark that lane `missing` or `blocked`; do not substitute a CRM summary and call it complete.

### GOWA WhatsApp

- Use `gowa-whatsapp-api`, never a WhatsApp MCP wrapper.
- Call `/devices` first in the current run. Inspect every relevant `logged_in` device; do not assume the first device contains all conversations.
- Search chats by contact name, phone, JID, company, and aliases; then read `/chat/{JID}/messages` with full pagination when needed.
- Read direction, timestamps, content, and media or voice metadata. Mark unread media/voice coverage partial.
- Before sending, verify the number, current device, newest messages, and whether email or CRM already records the action.

### Calendar, ATS, Providers, And Browser Forms

- Read the real current page or API response shape before acting.
- Verify whether the event is upcoming, cancelled, rescheduled, attended, or obsolete.
- For forms, distinguish `opened`, `filled`, `submitted`, `confirmation displayed`, and `provider accepted`.
- Use authenticated browser or Computer Use for profile-dependent forms; inspect the exact final review page before submission.
- Never invent salary, rate, availability, work authorization, sponsorship, notice period, residence, phone, role preference, experience years, demographics, references, or attachment completion.
- Preserve current thread context and reuse verified profile/CV facts. If a required factual answer is externally undiscoverable and costly to guess, stop only that submission and continue other safe work.

## 5. Normalize And Reconstruct One Canonical Timeline

Create one reversible canonical record per real entity/opportunity.

- Normalize subject roots by removing reply/forward prefixes and variable IDs or dates.
- Deduplicate exact alert storms before ranking; retain count and newest timestamp.
- Merge company aliases, recruiter agencies, ATS domains, relay addresses, phone numbers, and contact aliases only when evidence proves they refer to the same opportunity.
- Keep distinct roles, assignments, applications, or commercial deals separate when their outcomes can diverge.
- Retain pointers to every contributing thread, activity, meeting, chat, form, and provider record.

Order concrete events:

`contact -> application/proposal -> reply -> meeting -> assessment -> follow-up -> decision/offer -> acceptance/decline -> onboarding/start/closure`

For every event record:

- timestamp and timezone;
- channel and direction;
- sender and recipient;
- exact decisive evidence fragment;
- requested or completed action;
- proof state;
- whether it changes the prior state.

Always check for later messages from either side. The newest verified event overrides an older status.

## 6. Apply Strict State Gates

Use the narrowest supported state:

- `applied / no human reply`: submission is proven but no recruiter or hiring-team response exists;
- `interview requested`: a meeting was proposed but no slot is confirmed;
- `interview scheduled`: a current calendar event or explicit agreement proves the slot;
- `interview completed`: attendance, transcript, or a post-meeting message proves it occurred;
- `next stage / assessment`: the process advanced to a named round, assessment, references, vetting, or right-to-represent step;
- `positive interest / no offer`: a human expressed interest without concrete work and material terms;
- `formal offer pending acceptance`: a concrete role or paid assignment with material terms, but no explicit acceptance;
- `work offered / terms pending`: concrete work proposed while rate, schedule, scope, contract, or start remains unresolved;
- `user accepted / employer confirmation pending`: the user explicitly accepted but no matching employer confirmation or start evidence exists;
- `accepted / hired`: both sides' current evidence supports the role or assignment and acceptance;
- `onboarding / background check`: acceptance or progression is conditional on named checks, references, documents, or setup;
- `started`: actual start, worked assignment, or onboarding completion is proven at the employer/provider layer;
- `verbal or conditional commitment`: clear intent conditional on checks, availability, budget, approval, or paperwork;
- `pending on user`: newest verified request requires the user's reply, document, decision, scheduling, form, or other action;
- `waiting on them`: the user completed the latest requested action and no later request or decision exists;
- `rejected / closed`: explicit rejection, withdrawal, cancellation, expiry, or mutually closed process;
- `unclear`: evidence conflicts or a decisive source remains partial; name the missing proof.

Never infer offer, selection, acceptance, or hire from `counting on you`, `move forward`, `next steps`, `shortlisted`, `vetting`, `right to represent`, `interview`, `availability`, `welcome`, or `approved` without identifying exactly what was approved.

Keep separate roles or assignments at the same employer in separate states; one rejection or offer cannot silently update its siblings.

## 7. Determine The Real Action State

Track these separately:

`candidate -> attempted -> drafted -> sent -> handoff accepted -> delivered/no bounce yet -> human reply -> meeting booked -> decision/offer -> accepted -> started`

Also distinguish `form opened`, `form filled`, `form submitted`, `provider confirmed`, `failed bounce`, `cancelled`, `expired`, and `blocked external`.

For every actionable item record:

- `ball-in-court`: user, them, system, shared, or none;
- `next action`: one smallest concrete action;
- `due`: exact date/time or `none found`;
- `action proof`: direct thread/activity/form/provider identifier or link;
- `current exclusions`: why nearby noise or older items were omitted.

## 8. Suppress Noise Without Hiding Signal

Exclude self-generated automation, newsletters, promotions, benign confirmations, receipts, generic job alerts, unrelated infrastructure, and already-completed actions unless they directly affect the requested objective.

Preserve:

- new human replies;
- explicit deadlines;
- concrete offers;
- rejections and cancellations that change state;
- missing expected machine mail;
- failed delivery;
- time-bound logistics;
- warm drafts or forms the user still owns;
- fresh provider or CRM state contradicting an old thread.

Deduplicate before ranking. Never silently broaden a strict query into a noisy fallback. Keep an excluded-category log so false negatives can be recovered.

## 9. Execute Actions From The Proven State

When action is authorized, continue from the strongest working route instead of stopping with an audit.

### Drafts

1. Read the exact latest thread and prior sent messages.
2. Read required attachments, CV/profile, meeting transcript, CRM context, and current form fields.
3. Draft in the correct language, voice, identity, and original thread.
4. Leave no invented values or silent placeholders.
5. Read back the created draft and attachment list.

### Live Email Or WhatsApp Sends

Preserve the existing safety affordance:

1. Resolve the real recipient/channel and verify newest cross-channel state.
2. Show exact To/CC/BCC, subject, body, attachments, sender identity, and whether this is a new thread or reply.
3. Announce that the next step creates a real external send.
4. Require explicit final confirmation immediately before transmission unless the same current user message supplied the exact final text, recipient, and an unambiguous immediate-send command.
5. Send once.
6. Verify the sent item or GOWA send response, then re-read the thread/chat when feasible.

Never silently collapse simulation/draft mode into real send mode.

### Forms, Calendar, CRM, And Provider Actions

1. Read the current live object and exact input shape.
2. Fill only verified facts and preserve optional unanswered fields when appropriate.
3. Inspect the final review state.
4. Submit only when submission is within the authorized mode.
5. Capture the literal confirmation page, provider state, event state, or read-back object.
6. Update CRM only after the external truth is known; never use a CRM update as proof the external action occurred.

If one action is blocked, try three materially different source/tool routes where realistic, continue independent safe actions, and return an exact unresolved inventory.

## 10. Same-Layer Proof And Observation Rules

Read every output literally before using it.

- Email search: quote the query and decisive message fields.
- Thread: quote the latest state-changing fragment.
- CRM: name full object ID, status, latest activity, and read-back values.
- WhatsApp: name device ID, JID, timestamp, direction, and decisive content.
- Meeting: name event date, participants, transcript/attendance evidence, and whether it occurred.
- Form: quote the confirmation text and resulting provider/application status.
- Send: record message/send ID and verify the sent layer; do not call it delivered or replied without higher-layer evidence.

Adjacent proof never closes the promise: API 200 is not action success, draft is not sent, invitation is not attendance, form page is not submission, CRM status is not external outcome, and provider submission is not acceptance.

## 11. Output Contract

Lead with the direct answer. For job/opportunity audits, say exactly whether any item is:

- accepted/hired/started;
- concretely offered but not accepted;
- conditionally committed;
- merely advanced;
- pending on the user;
- waiting on the other party;
- rejected/closed;
- unclear due to named missing proof.

Then provide:

| Entity | Opportunity | Latest state | Decisive evidence | Latest date | Ball-in-court | Next action |
|---|---|---|---|---|---|---|

Finish with:

- source coverage and gaps;
- latest-message override corrections;
- excluded noise categories;
- prior mistakes caught;
- mutations executed with exact read-back proof;
- unresolved inventory with the next exact probe.

Use `CHECKPOINT` when a requested global source remains partial. Never claim `all`, `complete`, `sent`, `submitted`, `accepted`, or `hired` from sampled coverage or a prior agent summary.

## 12. Conversation Recovery Artifact

When the user requests a conversation analyzer or recovery prompt, produce:

1. true goal in one sentence;
2. message/speaker counts and chronological topic map;
3. message-by-message ledger with request, implicit constraint, evidence/failure, and `correct`, `partial`, `failed`, `corrected`, or `ignored` status;
4. issue table separating user issue, assistant issue, and tool/system issue;
5. root causes;
6. corrected current task state;
7. one copy-paste master recovery prompt;
8. verification checklist.

Do not let analysis substitute for the requested action when execution is authorized.

## Default Recovery Prompt

Use this internal contract when a prior email/action workflow failed:

```text
Reconstruct the requested entities, channels, time window, exclusions, and authorized mutations from the current and referenced threads. Treat prior assistant conclusions and CRM labels as leads only. Build a coverage ledger, search native Gmail both directions across alias continuity, pivot every discovered entity by domain/contact/role/ID, read complete threads and drafts, read exact Close records and latest activities, inspect Pocket or the primary meeting transcript, enumerate current GOWA logged-in devices and search relevant chats on each, and inspect calendar/ATS/provider/browser form state. Reconstruct one chronological timeline per entity, apply strict offer/acceptance gates, let the newest verified event override stale state, and separate drafted/sent/delivered/replied/submitted/accepted. Execute only the authorized actions, preserving the final live-send confirmation, and verify each mutation at the same external layer. Return direct status, action ledger, source coverage, corrections, proof, and exact unresolved inventory. Never claim all when any requested source is sampled or missing.
```

## Completion Gate

Before closure, verify:

- [ ] every selected conversation message was read sequentially when complete transcript analysis was requested;
- [ ] every requested source has an honest coverage label;
- [ ] global searches were paginated and both directions were checked;
- [ ] mailbox alias continuity and newly discovered entity pivots were searched;
- [ ] every discovered entity has a canonical record and latest-state check;
- [ ] complete Gmail threads, drafts, attachments, and later messages were inspected where relevant;
- [ ] exact Close opportunity/task/latest activity was read and any mutation read back;
- [ ] Pocket/meeting evidence distinguishes scheduled from actually held;
- [ ] every relevant logged-in GOWA device and chat lane was checked;
- [ ] form, ATS, calendar, and provider actions have confirmation-layer proof;
- [ ] offer, acceptance, hire, and start labels pass the strict gate;
- [ ] drafted, sent, delivered, replied, filled, submitted, accepted, and started remain separate;
- [ ] user exclusions and freshness window were honored;
- [ ] no salary, availability, authorization, sponsorship, residence, phone, rate, preference, experience, or attachments were invented;
- [ ] live sends preserved the final confirmation affordance and were read back;
- [ ] no prior `done`, CRM label, summary, or API success was treated as current external truth;
- [ ] unresolved proof debt is flat, counted, and paired with the next exact probe.

If any required item remains false, close as `CHECKPOINT`, not completion.

## Acceptance Scenarios

Before publishing or materially changing this skill, mentally or operationally test:

1. An offer exists only in Sent or an archived thread: broad discovery must still find it.
2. `Welcome`, `next steps`, or `we count on you` appears without mutual acceptance: never label accepted.
3. A Pocket transcript contradicts a stale Close stage: expose the contradiction and use the newest primary evidence.
4. Two roles share one employer: retain two canonical timelines.
5. The user excludes payments and GitHub: honor that run's exclusions without hard-coding a permanent global suppression.
6. GOWA exposes multiple logged-in devices: search every relevant device after current `/devices` discovery.
7. A query, connector, or view is capped: label coverage `partial`, never `all`.
8. An item lacks ball-in-court or a concrete next action: it cannot enter an action-only result.
9. Sent mail, Close, or GOWA already proves a reply: suppress the duplicate action.
10. A form asks for an unknown consequential fact: block that submission rather than inventing the value.
11. A mutation returns only API 200 or SMTP handoff: keep higher-layer outcome unverified.
12. A public skill draft contains dated priorities, personal aliases, account IDs, phones, or credentials: remove them and discover them dynamically at runtime.
