---
name: inbox-forensic-action-operator-skill
description: This skill should be used to reconstruct complete email, CRM, meeting, WhatsApp, calendar, ATS, and browser-action timelines before triaging, drafting, sending, updating records, or submitting forms. It applies to attention audits, unanswered-message checks, job or sales opportunity status, offer or acceptance verification, cross-channel follow-up, stale drafts, recruiter pipelines, and recovery after narrow searches, stale context, unsupported assumptions, duplicate actions, or false completion.
version: 2.2.0
---

# Inbox Forensic Action Operator

## Outcome

Recover the current truth for every in-scope entity, identify the real latest ball-in-court, and execute only the actions authorized by the user. Treat email, CRM, meetings, WhatsApp, calendars, forms, and provider state as one evidence graph without collapsing their distinct proof layers.

Research must unblock execution. Action must never outrun source truth.

## Interpret The Request

Normalize even typo-heavy wording into:

`entities + discovery scope + output filter + time window + classifications + exclusions + permitted mutations + required proof`

Keep three dimensions separate:

1. **Discovery scope** — where and how broadly to search.
2. **Output scope** — which verified results to show.
3. **Action authority** — what may be drafted, sent, changed, or submitted.

Interpret recurring phrases precisely:

- `all`, `every`, `massive`, `do not filter out`: discover globally and check the latest state per entity;
- `new`, `last N days`, `only recent`: enforce the exact cutoff after broad-enough discovery;
- `only action`: show only items with a concrete action due now; do not hide an overdue follow-up merely because the other party still owes the reply;
- `continue`, `again`, `reanalyze`, `previous`: reopen prior conclusions and recover the closest owner task;
- `draft`: create drafts only;
- `send`, `reply`, `fire it`: prepare the exact final action and apply the live-send gate;
- `complete`, `execute`, `take action`: perform every safe step only within the mutation classes explicitly authorized by the request; naming or reading a source never grants write authority.

Do not let a later short request erase durable constraints from the same task unless the user explicitly reverses them.

## Select The Authorized Mode

- `audit`: read and classify; no mutations;
- `organize`: update requested internal CRM/task/label/view objects after read-back; no external communication;
- `draft`: create drafts or prepare form answers; nothing is sent or submitted;
- `send`: transmit only after recipient, sender identity, subject, body, attachments, thread, and confirmation pass the send gate;
- `execute`: complete only the explicitly authorized mutation classes across communication, CRM, calendar, ATS, provider, or authenticated browser surfaces and verify each mutation externally.

Never expand `audit` into mutation, treat a draft as sent, treat a filled form as submitted, or treat an API acknowledgement as the promised external outcome.

Source access and mutation authority are independent. Reading Gmail, Close, Pocket, GOWA, a calendar, or a form does not authorize sending, updating, booking, or submitting there.

## Source Precedence

When sources conflict, use:

1. latest user wording in the current task;
2. current primary communication or provider surface;
3. fresh mailbox, CRM, transcript, WhatsApp, calendar, ATS, browser, or database evidence;
4. verified project-local operating positions;
5. user-provided source documents;
6. Codex tasks, Notion instructions, Chronicle, Screenpipe, and session histories;
7. prior summaries, dashboards, CRM labels, reports, and agent claims.

Compare the real event time, not merely import, synchronization, indexing, or observation time. A CRM activity synced today may represent an email sent last week.

## Core Workflow

### 1. Recover Context

For continuation, correction, referenced-task, or prior-failure work:

1. Use Codex task tools first. When installed, use `codex-internal-tools-threads-plans-goals-skill` for routing; otherwise use the available task/thread/goal capabilities directly.
2. Read selected messages sequentially when complete or line-by-line analysis is requested.
3. Record counts, coverage, promises, proven mutations, corrections, exclusions, and suspicious completion claims.
4. When installed, use `conversation-history-recovery-skill` only when the Codex task is insufficient or cross-source reconstruction is explicitly required; otherwise recover through the available primary conversation/history sources and record the missing capability.
5. Treat Notion, Chronicle, Screenpipe, memory, and histories as evidence or reusable guidance, never as authority over the current request.

### 2. Build The Coverage Ledger

Before conclusions, maintain:

| Source identity | Route | Exact scope/window | Inbound | Outbound | Archive/drafts | Attachments/media | Pages/results/totals | Coverage |
|---|---|---|---:|---:|---:|---:|---:|---|

Use only `full`, `partial`, `sampled`, `missing`, or `blocked`. One label, account, alias, result page, device, date slice, semantic hit, or convenience view is never global coverage.

Record the exact mailbox address, workspace, account, profile, and device returned by the source. If a connector exposes only one identity and cannot enumerate others, that identity may be full while requested multi-account coverage remains partial.

Discover or lazy-load relevant connectors before calling a source unavailable. If a connector fails authentication, caps, truncates, samples, sorts by relevance, omits a cursor, or disagrees with its declared total, record the exact limitation and continue through the viable native/API, direct-transport, and authenticated-browser routes. A failed route is blocked; the source is not necessarily blocked.

Load [Channel Runbooks](references/channel-runbooks.md) for the sources in scope.

### 3. Discover Broadly, Then Pivot

1. Start with the strongest native source.
2. Include both directions and the relevant archive, sent, draft, attachment, media, calendar, and provider states.
3. Build pivots from organization, domain, contact, address, phone/JID, role, subject root, ATS/requisition ID, calendar title, and aliases.
4. Search each pivot without a direction filter, then verify inbound and outbound explicitly.
5. Define the requested window as half-open `[local_start, local_end)` in an explicit IANA timezone. Convert both endpoints independently to UTC with current DST rules, use a source query that safely contains the window, then post-filter by real event timestamps; boundary dates alone are not exact proof.
6. Force chronological ordering when a UI defaults to relevance. Paginate until the cursor is absent or the final range is reached, deduplicate stable IDs, and reconcile returned counts against declared totals.
7. Re-run pivots discovered later.
8. Stop only after every discovered entity has a latest-state check and every gap is explicit.

### 4. Construct Canonical Timelines

Keep distinct roles, applications, assignments, deals, and decisions separate even when they share one organization or contact. Deduplicate only when evidence proves identity.

For every event retain:

- `occurred_at` and timezone;
- `occurred_interval` when a recording or capture spans more than one interaction;
- `observed_at` or sync time when different;
- channel and direction;
- sender, recipient, and source identity;
- stable thread/message/activity/form/provider identifier;
- match provenance: source-native title/participant/ID/interval versus semantic text, OCR, prompt, or summary;
- exact decisive evidence;
- requested or completed action;
- proof state and whether it changes the prior state.

Load [State And Action Model](references/state-and-action-model.md) for canonicalization, offer/acceptance gates, ball-in-court, follow-up-due logic, and action-only selection.

### 5. Re-Read Immediately Before Mutation

Before drafting, sending, submitting, booking, or updating:

1. Re-read the newest state in every relevant channel.
2. Confirm no newer reply, cancellation, send, draft, task, or provider state makes the action stale or duplicate.
3. Resolve exact sender identity, recipient, thread, attachments, target object, and form.
4. Execute once from the strongest working route.
5. If the result is ambiguous, inspect the target system before retrying; never repeat a real action blindly.

Load [Execution Safety And Idempotency](references/execution-safety.md) before any mutation.

### 6. Verify At The Promised Layer

Read every output literally. Record the keys, text, IDs, timestamps, and direction that drive each conclusion.

- Search result is not a complete thread.
- Draft is not sent.
- SMTP/API handoff is not delivery.
- Empty immediate bounce search is not permanent delivery.
- Invitation is not attendance.
- Filled form is not submission.
- Submission is not provider acceptance.
- CRM status is not external outcome.
- Offer is not acceptance; acceptance is not start.

Use `CHECKPOINT` when a required global source or promised layer remains partial. Name the exact missing proof and next probe.

## No-Invention Gate

Never invent or infer salary, rate, availability, work authorization, sponsorship, notice period, residence, phone, experience years, role preference, demographics, references, interview slots, acceptance, or attachment completion.

Use verified current user wording, current profile/CV data, exact thread facts, or live form/provider values. If a consequential fact remains externally undiscoverable, block only that action and continue independent safe work.

## Output Contract

Lead with the direct answer. For an opportunity audit, distinguish:

- user accepted, mutual acceptance confirmed, hired/contracted, onboarding, or started;
- concrete offer pending acceptance or terms;
- conditional commitment or onboarding check;
- interview/assessment/next stage;
- positive interest without offer;
- pending on the user;
- waiting on them, not yet due;
- follow-up due now;
- rejected/closed;
- unclear because of named proof debt.

Then provide:

| Entity | Opportunity | Latest state | Decisive evidence | Event date | Ball-in-court | Action due | Next action |
|---|---|---|---|---|---|---|---|

Finish with coverage, latest-event corrections, excluded categories, executed mutations with read-back proof, ambiguous results resolved, and a flat unresolved inventory.

For conversation critique or recovery artifacts, load [Recovery And Acceptance Tests](references/recovery-and-acceptance-tests.md).

## Completion Gate

Before closure, prove:

- discovery scope, output filter, and action authority remained separate;
- every requested source has an honest coverage label;
- global searches were paginated and checked both directions;
- source identity, chronological sort mode, exact absolute bounds, cursor exhaustion, stable-ID deduplication, and declared-total reconciliation were recorded;
- event time was separated from sync/observation time;
- long recordings were partitioned into entity-bound intervals and semantic/OCR hits were not treated as entity proof;
- every entity has a canonical latest-state record;
- separate opportunities were not merged by employer or domain alone;
- follow-up-due items were not hidden as merely waiting;
- drafts, sends, delivery, replies, forms, offers, acceptance, and start remain separate;
- duplicate drafts/actions and ambiguous retries were prevented;
- attachments and sender/recipient/thread identity were read back;
- delayed-bounce or later-provider checks are scheduled or explicitly pending when relevant;
- no consequential user fact was invented;
- every mutation has same-layer proof;
- unresolved proof debt is counted and paired with the next exact probe.

If any required item remains false, close as `CHECKPOINT`, not completion.

## Package Validation

After changing this skill, run:

```bash
node scripts/validate-package.mjs
```

Publish only after structural validation, acceptance-scenario review, installed-copy equality, and local/remote equality pass.
