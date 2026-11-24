# Audit Recipes

## Contents

- Coverage
- Entity Status
- Attention
- Opportunity Truth Audit
- Complete Email Triage & Report Bundle
- Delivery
- Recovery
- Frozen Adjacent-Window Fanout
- Recipe Stop Record

Select one primary recipe (`coverage`, `entity-status`, `attention`, `delivery`, or `recovery`). Add another only when the request explicitly needs both outputs. `Opportunity Truth Audit` and `Complete Email Triage & Report Bundle` (`email-triage-report`) are composite report workflows built on those base recipes (`coverage` + `attention`, plus `entity-status` for Opportunity Truth Audit). Map requests containing `"fully"`, a bounded email window (e.g. 72h / 7d), or `"complete report"` automatically to `email-triage-report` without requiring the user to name the recipe.

## Coverage

Enumerate every required identity and viable route. Freeze bounds and ordering; exhaust cursors/ranges or prove a finite cursorless set; reconcile declared, returned, and deduplicated IDs; hydrate enough records to validate timestamps and direction. Output the coverage ledger and proof gaps. Do not rank actions or mutate.

## Entity Status

Start with broad source discovery. Build pivots from every verified identity, organization, role, subject, event, requisition, and stable ID. Read both directions and later events that can override older state. Keep separate opportunities/cases separate. Output one canonical timeline and latest-state verdict per entity.

## Attention

Narrow at the source where supported, then hydrate only candidates that can affect the current objective: human conversations, required documents/forms, deadlines, failures, declines, cancellations, security/provider incidents, and expected messages that are missing. Deduplicate machine storms, rank by current impact and verified deadlines, and show actions due now. Candidate selection based on list hints or sampling cannot support a global `all` claim.

## Opportunity Truth Audit

Use this recipe under current request/standing authority, respecting explicit read-only limits, for a complete last-72-hours and last-seven-days report of economic opportunities, missed or expiring obligations, meetings, pipeline movement, and real work effectiveness. Its objective is to protect and advance the largest credible amount of money closest to becoming real. Activity volume never outweighs an advanced, valuable, recoverable loss.

### Freeze The Windows

The explicit user window and runtime/client date override recipe defaults. Freeze one cutoff at the current client time and use Europe/Madrid unless the user specifies another timezone. Build two nested half-open rolling windows: the previous 72 hours and the previous seven days through the same cutoff. Identify events inside 72 hours, events only in days four through seven, and older material retrieved only as thread context. Never count older context as recent activity.

For any thread containing an in-window event, retrieve the older messages needed to establish origin, promises, and chronology plus all later events through the cutoff that may supersede the apparent state.

Inspect the next seven days of known deadlines from original emails, attachments, and native provider notices as a separate forward-obligation check, never as retrospective activity. Do not use Google Calendar for inbox triage or recurring inbox reports unless scheduling or meeting verification is explicitly requested; Calendar absence never excludes an inbox-only hearing, deadline, or obligation. Carry forward every unresolved material obligation found in an existing canonical state, prior cross-platform triage (`$seven-platform-chat-cli`), or current opportunity graph regardless of age. Do not call a seven-day message window a complete historical opportunity inventory.

### Enumerate Before Relevance Filtering

First manifest every accessible email account and verified owned alias plus Inbox, Sent, Archive/All Mail, Spam/Junk, Drafts, Trash/Deleted when accessible, categories, folders, and labels. Also manifest Calendar (only when calendar scheduling or meeting verification is explicitly requested; omit Google Calendar in inbox-only triage), CRM, LinkedIn/recruiter channels, ATS/employer portals, WhatsApp/business chat, recordings/transcripts, and every other connected native source that can prove opportunity state. A known but undiscovered, disconnected, inaccessible, or unauthenticated source is `unknown`, `missing`, or `blocked`, never covered.

Derive audit scope from current connection metadata and user-confirmed inclusions or exclusions, not the login address or every visible connector. When provider identity proves that current and former aliases resolve to one renamed mailbox, audit it once while preserving both addresses for direction checks. Do not double-count it as two accounts.

Enumerate every unique seven-day email before applying opportunity keywords, unread status, importance, sender, category, or relevance filters. Exhaust every page, cursor, range, or finite result set. Deduplicate messages and threads only by provider-native IDs while retaining every label, folder, and source occurrence.

For every unique message, read the complete body, including Spam and automated mail, and retain account, folder/labels, message/thread IDs, timestamp and original timezone, `From`, `To`, `Cc`, available `Bcc`, relevant `Reply-To`, direction, subject, first meaningful lines, attachment names, and attachment accessibility. Determine direction from actual headers, mailbox context, and verified owned identities, not display names, prose, signatures, or visible thread position.

Inspect decisive attachments, protected links, and instructions when read-only access exists. If an item cannot be read, name it and the conclusion it prevents. For every consequential opportunity, reconstruct the complete available entity thread and reconcile current Calendar (when scheduling or meeting verification is explicitly requested), CRM, ATS, LinkedIn, recording, message, and provider-owned state.

For every source record identity, route, bounds/order, cursors/ranges, returned and deduplicated counts, hydration, full-thread status, coverage, failure origin, and proof remaining. If any required source cannot be exhausted, the overall audit is partial and cannot return `all done`.

If subagents are available, use one coordinator to freeze scope and reconcile totals; mutually exclusive read-only collectors by account/source; stable-thread-ID analysts after collection; one ranker; and one independent verifier. Collectors return normalized evidence and coverage counts, not prose-only summaries. A subagent summary is not provider proof.

### CRM-First Graph, Native-State Override

After the source manifest, context-check Twenty first when accessible. Load `$twenty-crm-best-practices`, current-probe the live metadata and supported read routes, and use current People, Companies, Opportunities, activities, tasks, messages, meetings, and relations to seed exact entity IDs, stages, ball-in-court, next steps, due dates, and reconciliation freshness. Never hard-code remembered field names, enum values, object relations, or historical deployment contracts.

Then enumerate the complete seven-day mailbox corpus and other native sources independently of CRM relevance. CRM is the opportunity graph, not infallible event truth: a newer exact email, Calendar (when scheduling or meeting verification is explicitly requested), ATS, meeting, contract, payment, or provider record supersedes a stale CRM stage or next step. Mark the contradiction and stale layer; do not silently blend them. Folder names, labels, priority inboxes, custom views, and unread state are collection or triage signals, never proof of pipeline stage, owner, value, or importance.

Keep separate roles, requisitions, applications, or engagements under the same organization. Shared people, domains, subjects, or last-contact fields are pivots, not merge proof. Treat CRM aggregate application or submission counts as activity volume, not advancement, conversion, revenue, or evidence that critical obligations were protected.

Do not impose fixed age-decay buckets. Rank from explicit deadlines, current live state, latest substantive evidence, reconciliation freshness, current obligations, and credible revival. Older money, legal, operational, or advanced-process items remain active when current evidence supports them; otherwise retain them as history rather than inventing urgency or silently deleting them.

### Reconstruct Current Truth

Keep people, companies, roles, requisitions, applications, client engagements, meetings, and channels distinct unless native IDs or strong identity evidence connect them. For every consequential entity establish the original ask, material inbound/outbound events, drafts, automated provider events, latest meaningful human message, promised deliverables, verified deadline or absence, current stage, response owner, next-action owner, what happened, consequence of delay, contradictions, and strongest evidence with account, native ID, and time.

Keep these state layers distinct:

`discovered -> drafted -> attempted -> sent -> transport accepted -> no bounce observed -> delivered -> human reply`

`application started -> provider-confirmed submitted -> acknowledged -> screening invited -> scheduled -> completed -> passed/advanced -> assessment pending/submitted -> second round -> final stage -> offer -> accepted -> hired/contracted`

Also preserve rejected, withdrawn, expired, closed, waiting-on-user, waiting-on-them, and current-unknown. A generated CV is not attached; a click/upload/review page is not a confirmed submission; an invitation is not acceptance; acceptance is not attendance; attendance is not advancement; and advancement language is not an offer unless the approved object and later decisive state are proven.

### Classify Economic Direction

Classify each entity before ranking:

- `money-in`: employer/recruiter process, paid job, client, consulting, freelance/B2B, teaching, sale, contract, invoice, payment, renewal, or another credible direct income path;
- `strategic optionality`: credible future earning leverage without current direct payment;
- `money-out/vendor`: advisory firm, consultancy, coach, agency, vendor, paid community, lead seller, financial adviser, course, or another party primarily asking the user to spend;
- `administrative/security/legal/personal`;
- `noise/promotion/automation/unverified`.

For a general attention audit use the [Stakes Ledger](stakes-ledger.md) to compare obligations by cost of delay. For earning/opportunity rankings use the qualification, cash-profit and separate-output rules in [Opportunity Overlay](overlays/opportunity.md); no general stakes queue admits early leads into the qualified earning pipeline. Money-in, preventable money-out, capability loss and legal deadlines compete in that single queue, so an imminent material capability loss appears ahead of lower-priority income work in the final report. Keep other classes visible when they require action, create risk, consume meaningful time, or explain distorted attention. Retain automated messages when they prove submission, assessment, deadline, expiry, invitation, rejection, cancellation, reschedule, offer, onboarding, payment, or contract state; they are provider evidence, not human interest.

Preserve original amount, currency, period, source, time, and provenance. Separate guaranteed cash from bonus, commission, OTE, equity, tokens, ceilings, uncommitted extensions, and forecasts. Divide an explicit annual guaranteed amount by twelve. Normalize other rates only when currency, working time, minimum commitment, and duration support it. Undisclosed compensation is unknown, not zero. Do not invent probability or expected value.

### Rank Money-In And Preventable Loss

Apply the Opportunity Overlay qualification gate before ranking. The optional components below can explain a requested scorecard; they are not a required numerical scoring scheme or permission to merge public tenders, qualified commerce and obligations into one earning total:

- economic value: 0–30;
- verified stage/proximity to money: 0–25;
- deadline and preventable-loss urgency: 0–25;
- immediate user actionability: 0–10;
- opportunity/evidence credibility: 0–10.

Keep evidence confidence separate as high, medium, or low. Apply `CRITICAL_LOSS_OVERRIDE` above the score when the opportunity is credible money-in, warm/advanced or explicitly waits on the user, overdue/within 72 hours or needs missed-meeting recovery, and one concrete action may preserve it. Break remaining ties by stage, loss urgency, explicit guaranteed monthly cash, clear user ownership, and evidence strength. Explain any judgment override.

Classify separately: `confirmed missed/lost`, `damaged but recoverable`, `at risk`, `pending on user`, and `waiting on them`. Silence is not rejection. A passed date is not a miss until later completion, extension, reschedule, cancellation, rejection, withdrawal, and provider state are checked. Do not recommend a duplicate follow-up when the newest substantive action is the user's unless an evidenced deadline or follow-up threshold has passed.

For meetings distinguish proposed, invited, accepted, scheduled, rescheduled, declined, cancelled, independently completed, missed/no-show, user-reported completed, and attendance unknown. Calendar presence or acceptance does not prove attendance; attendance does not prove advancement. Rank a missed advanced interview or paying-client decision above a completed vendor call.

### Score Real Work

Score 72 hours and seven days independently:

- advanced-opportunity protection: 0–40;
- verified stage advancement: 0–30;
- response and deadline execution: 0–20;
- attention allocation: 0–10.

Report a total only when every component has enough evidence; otherwise show scoreable components and `overall score not defensible`. A provider-confirmed application is early-stage output, not equivalent to screening, later rounds, offer, contract, or revenue. Twenty starts never cancel one advanced-stage miss. Distinguish normal external-response lag from user neglect.

Also report two auditable control ratios when evidence supports them: `critical obligation control = verified on-time completions / material advanced user-owned obligations due`, and `advanced-process leakage = confirmed missed advanced user-owned obligations / advanced user-owned obligations due`. Show numerator, denominator, and supporting action IDs; use `N/A`, not 100%, when none were due. Preserve the priority and effective deadline at the time due. A later recovery remains a recovery and does not erase the original miss.

Give a non-compensatory headline verdict: `critical failure` for a confirmed missed material advanced-stage obligation, even if repaired later; `at risk` for a currently exposed material user-owned obligation; `controlled` when no material due obligation is unhandled in the verified scope; or `unverifiable` when coverage cannot support a reliable verdict. Confirmed failures remain visible inside an otherwise incomplete audit.

### Report Order

Use the requested deliverable and density first. For an earning ranking, use the two-table format in the Opportunity Overlay and concise separate obligations/leads/noncash benefits; do not force this full scorecard, raw census, or criticism quota. For an explicitly requested comprehensive effectiveness audit, return:

1. truth in one sentence;
2. executive verdict and audit coverage;
3. the ranked stakes queue — money-in and loss-prevention items together, ordered by cost of delay — with score components, stakes kind, money, owner, deadline, exact action, consequence, confidence, account, stable ID, and timestamp;
4. critical misses, damage, and near-misses separated by proof and recoverability;
5. consequential 72-hour chronology;
6. seven-day portfolio grouped by verified stage;
7. valuable work waiting on others;
8. meeting outcomes and economic relevance;
9. money-out, vendor, and distraction review;
10. real-work effectiveness scorecard;
11. three economically consequential evidence-based criticisms;
12. exact queue for now, 24 hours, 72 hours, later, verify, and no-action/waiting;
13. unknowns and smallest falsification checks;
14. source coverage ledger;
15. compact seven-day census of every unique email with timestamp, account, folder/labels, direction, sender, recipients, subject, first meaningful lines, category, human/automated, and full-thread-review state;
16. bottom line: highest-value action waiting on the user, largest plausible preventable loss, strongest verified seven-day outcome, and meaningful user-owned work remaining as yes/no/unknown.

Write directly and sentimentlessly for a standalone reader. Criticize observable process and outcomes, never personality or intent.

### Repeated Runs And Operational Zero

Every run refreshes native state. Load the existing canonical CRM/state register and prior report when available; never create a competing tracker merely because the current agent lacks chat history. Compare by stable IDs only when a prior report or shared canonical state is actually available; otherwise say no prior baseline was available. Classify prior items as new, advanced, resolved, unchanged, deteriorated, reopened, disappeared from accessible evidence, or previously misclassified. Remove an action only when current provider evidence proves the promised completion layer. Preserve deadline-at-the-time history and exact score denominators. Under read-only authority, return a normalized state delta and report snapshot for the caller; persist them only when the invocation authorizes the existing destination and the write is read back.

Operational zero requires every accessible source exhausted; no critical/high-value user-owned action, recoverable valuable miss, imminent valuable deadline, unresolved ownership, or unreconciled meeting; no draft/attempt mistaken for completion; and every remaining live process verified as waiting on others with an evidence-based monitoring date. Then say `No meaningful user-owned opportunity action remains at this time.` If coverage or ownership remains incomplete, return `unknown`/`CHECKPOINT` instead of `all done`.

## Complete Email Triage & Report Bundle

Use this composite workflow (`email-triage-report`, built on `coverage` + `attention`) whenever the user asks for a complete 72-hour or rolling-window email triage (`"fully"`, `"complete report"`, or bounded email window):

1. **Email-only scope & inline execution (no Calendar / no unasked CRM drift / zero scratch files):** Inventory accessible email accounts, aliases, and mail folders only; exclude Google Calendar unless scheduling or meeting verification is explicitly requested; do not drift into Twenty CRM writes or `$twenty-crm-sami-judge-skill` when running read-only `audit` or `email-triage-report` without CRM mutation/dashboard scope. Use WhatsApp/calls/SMS only when explicitly requested or needed to resolve a named consequential email, keeping counts strictly separate. Execute all queries, hydration, MIME repair, classification, and PDF rendering inline in memory (`python3 -`, `node -e`, `data:text/html;base64,...`) — never create helper scripts, temp JSON dumps, or intermediate HTML files.
2. **Zero-filter enumeration, arrival adjustment & secondary cache hydration:** Follow [Freeze The Windows](audit-recipes.md) (referencing `Freeze The Windows` above) and [Email adapter](adapters/email.md): exhaust Gmail `in:anywhere` (`includeSpamTrash=true`), repair MIME/UTF-8 mojibake, separate `"SENT" in labelIds` user-authored outbound from self-addressed service alerts, reconcile Apple Mail `Envelope Index` + `.emlx` RFC `Message-ID`s for `arrival-adjusted` rows, and enumerate/hydrate all in-window local rows on `cache-only` secondary accounts.
3. **Seven-platform miss recovery (`$seven-platform-chat-cli`):** Search Codex (active + archived), Claude Code, Antigravity, ChatGPT.com, Claude.ai, Gemini Web, and Grok.com for prior email/inbox/triage/report threads; record `searched`, `matched`, and `read (Done X / N)` per platform; treat prior threads as discovery leads for missed accounts, aliases, or carry-forward obligations and verify current state in primary mail/portals.
4. **Thread, Sent, Draft & release-history verification:** Check later `Sent` replies, `Drafts` (`Draft (unsent latest)` vs `Draft (superseded by Sent)`), and same-reference portal notices before flagging any thread as waiting on the user. Verify app/product release history against repo or store records so routine updates are not mislabeled as first launches. Sweep **all** outbound campaign and commercial/advertising replies (not only tenders or job recruiting), and keep framework/DPS/panel admissions distinct from awarded contracts.
5. **Noise separation with 100% accounting & global redaction:** Keep *settled/routine* billing, payment receipts, OTPs/PINs, *non-actionable* generic security notices, newsletters, and bulk automated tender digests out of executive action queues—while surfacing failed payments, paused/suspended subscriptions, and account-takeover/Takeout/unrecognized-login alerts (`PROVIDER-ALERT`)—account for every message in dynamic Topic Breakdown (`sum(topics) == N`), and redact all codes and credential-bearing URLs (`[code withheld]` / `[withheld]`) across Markdown, HTML, and CSV exports.
6. **Canonical deliverables & verification gates:** Persist only the requested deliverables to `AI_REPORTS_MASTER/` and update `INDEX.md`:
   - **Executive Markdown report:** headline verdict, Coverage & Provenance Ledger, Fresh Delta since the prior edition, Urgent Deadlines & Preventable-Loss Queue, People Waiting on User, Verified Achievements, Waiting on Others, Cross-Channel Corroboration (when in scope, kept separate), Seven-Platform Inventory (`Done X / N`), and 100% Topic Breakdown.
   - **Searchable interactive HTML census:** every message `1..N` in its dynamic topic table with live search, noise/actionable toggles, direct thread links, redacted fields, and 1-click CSV export. Verify `N == unique HTML rows == CSV rows` and zero unredacted codes or mojibake.
   - **Printable A4 PDF:** render the compact decision brief inline from the same verified state as the Markdown. Verify the actual PDF page count, all pages' readability, item ordering and parity with the intended paper edition.
   - **Verified audio (when requested):** generated only from the final verified report text and checked end-to-end with `ffprobe` and `ffmpeg -v error -i <file> -f null -`.
   - Read back saved files and the updated `INDEX.md` row before closing.

### Release And Repeat Print Checks

1. **Close the handoff.** Compare the stable identities of open obligations in prior reports, work lanes and the current native source. In execution mode, finish and read back the authorized actions you can complete before rendering. In audit mode, identify who can take each action. Every material item gets a verified outcome, external dependency, or tracked open next action. Preserve unresolved prior items even when they predate the new census. An absent row, unchanged headline or completed scheduler job never closes its obligation.
2. **Run the final delta.** Immediately before save, audio generation, print or delivery, sweep from the evidence cutoff to the release cutoff for new notices, later Sent replies, bounces, changes in deadline and new receipts. Apply material differences to the canonical state and regenerate affected output before release. Distinguish a pre-cutoff miss from a later arrival, and assign the next check to any inaccessible source.
3. **Bind completion to the act.** Match a receipt to the account, case or invoice, specific action and time. An older bid receipt cannot close a later cure, an upload cannot prove presentation, and an authentication challenge cannot reverse a payment acknowledgement. If mail is held, use the authorized official reply route when available and verify the new receipt before retiring the old blocker. Read back an uncertain act before retrying.
4. **Order the paper by consequence.** Lead with irreversible deadlines and credible loss, then cash close to receipt or a genuine binding step, then material relationships, recognition and scheduled decisions. Compare effective deadline or expected update, action owner, realistic value, how long the issue has been buried, and when and how prominently the last edition showed it. Keep lead, signed, award, held funds and settled cash distinct. An unchanged deadline or risk stays prominent when it still needs attention. A new low-stakes event does not displace it merely because it arrived later. A high-volume domain cannot displace more consequential items from other in-scope domains.
5. **Use the last verified edition.** Make the first print self-contained. Subsequent prints lead with what changed, what closed, and what still matters before the next expected update. Briefly carry live high-stakes items and suppress unchanged detail and routine noise from paper only. Use the last verified or actually printed edition as the comparison baseline when its content can be recovered. A print job without an identified document establishes a job, not the prior page contents. Where a supported partial reprint fits the request, verify the exact changed pages and job readback before any retry. Preserve all rows in the requested searchable companion and reuse the canonical report family.
6. **Inspect the rendered artifacts.** Keep raw message IDs, URLs, coverage internals and agent/tool narration out of the paper body unless needed to act on a decision. Keep dates, amounts, owners and the next step readable on A4. Where audio is requested, compare the actual spoken material claims, figures, deadlines and next actions against that edition as well as decoding the complete file.

For a retrospective, record each confirmed miss or near miss with the earliest discoverable source, when the workflow did or could have seen it, the point of failure, practical consequence, first successful recovery and the check that would have caught it. Keep later arrivals, still-open proof and confirmed preventable loss distinct.

When the canonical deliverable can store edition data, record the native act ID, verified state, edition and time last shown, its importance then, and the next expected update. Keep this in the existing canonical Markdown or searchable output. For unchanged open work, elapsed time since meaningful last visibility increases the case for resurfacing in proportion to its importance. A missed expected update or a deadline approaching the time needed to act can make an older item urgent. An unchanged waiting item with a future expected update can stay in the digital record until that date. Reuse the prior export when no material content changes and no new print is requested.

## Delivery

Inventory every claimed outbound action. Bind it to a source-native draft or Sent/chat/provider record, sender identity, recipient, stable ID, event time, failure/bounce state, and human reply. Keep this ladder separate:

`attempted -> drafted -> sent -> transport accepted -> no bounce observed -> delivery confirmed -> human reply`

An empty immediate bounce search is not permanent delivery.

## Recovery

Use current task/thread tools first to recover entities, scope, exclusions, authority, promises, and suspicious completion claims. Widen to histories only when the current task is insufficient. Prior summaries, dashboards, and agent claims are leads. Recovery never substitutes for current source reads.

## Frozen Adjacent-Window Fanout

1. Freeze one cutoff, timezone, identity set, route policy, exclusions, and authority before fanout.
2. Derive half-open windows mechanically. Adjacent windows share a boundary and never overlap; equality belongs to the later window.
3. Assign events by verified `occurred_at`, not observation/import time.
4. Preserve each window's observed route and coverage. Later route success does not retroactively make an earlier slice full.
5. Merge by source identity, stable provider ID, and device/context. Never merge on content/time alone.
6. Later events may update canonical state without deleting original event provenance or discovery window.
7. Aggregate coverage is full only when every required identity/window is full and compatible.
8. Freeze candidate sets before parallel hydration. Late pivots trigger an explicit second pass across affected windows.

## Recipe Stop Record

Every recipe ends with source rows, entity latest-state rows when relevant, unresolved proof count, `failure_origin`, `proof_remaining`, and either a supported result or `CHECKPOINT`.
