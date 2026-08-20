# INDEX

contact routing | native LinkedIn Contact info can expose a verified direct route, while domain guessing and partial mailbox reads cause wrong or duplicate outreach | inspect Contact info, exact-thread dedupe in Gmail, follow current routing, and delegate contact persistence to CardDAV | do not infer email from domain, send in audit, or treat a PUT as saved | replay Contact-info, Gmail, and CardDAV-readback fixtures
LinkedIn export evidence | partitioned CSVs, multiline cells, preambles and unsorted bidirectional messages can create plausible incomplete timelines | inventory all file families, parse logical rows and reconcile snapshots with live sources | do not trust one file, line counts, folder/order direction or snapshot outcomes | replay five LinkedIn-export fixtures and current-source override
career application pipelines | summaries, CRM labels, verification emails and outbound clicks can be mistaken for confirmed progress | reconcile native confirmations, raw requisition IDs, tracker cohort membership and newest thread direction | do not inherit counts, duplicate follow-ups or promote verification gates to submissions | replay ATS code, cohort recount, wrong-CV correction and latest-direction fixtures
live adapter execution | prose rules detect gaps but do not select or recover routes deterministically | select one audit recipe, enforce adapter contracts, and stop only on reconciliation or named proof debt | do not infer source absence from route failure or combine partial slices into full | run v3 route fixtures plus live email Close GOWA browser and meeting probes
attention quality | technically complete source recovery still surfaces wrong actions | apply success/failure asymmetry, stale warm/cold draft policy, current-priority ranking, missing-mail checks, and focused CRM views | do not equate accurate inventory with useful attention output | replay action-ranking and CRM-view fixtures
source completeness | connector success or list metadata treated as full truth | bind identity, bounds, sort, cursors, totals, and hydrated event IDs | do not infer all from relevance, one account/device, or declared totals | replay real pagination and boundary fixtures
proof and authority | transport/no-bounce or acceptance collapsed into higher outcomes | keep delivery, acceptance, hire, onboarding, and start separate; use final self-readback plus native send confirmation | do not let source access grant mutation authority or reopen authority already granted | run package invariants and acceptance scenarios
inbox/action recovery | output filters replaced full discovery | recover globally, filter presentation last | do not infer completeness from recent or human-only results | require source ledger and latest-state proof

## 2026-08-11 — CURRENT — LinkedIn Contact info and CardDAV are explicit routing and persistence boundaries

- Project: `inbox-forensic-action-operator-skill`; surface: live LinkedIn profile Contact info, Gmail full-thread dedupe, and authorized iCloud contact maintenance.
- Regression caught: export-only LinkedIn coverage can miss an observed direct address; guessed domain addresses or a partial mailbox view can create duplicate/wrong-channel outreach; CardDAV PUT success can be mistaken for persisted contact state.
- Superior route: inspect native Contact info when available, bind the displayed address to the exact profile, deduplicate the complete Gmail thread, obey current channel preference, and delegate authorized persistence to the dedicated CardDAV workflow.
- Trigger terms: `Contact info`, `LinkedIn email`, `direct email`, `save contact`, `AI JOBS`, `iCloud`, `CardDAV`.
- Do: preserve native LinkedIn as the fallback channel; require fresh ETag, full-vCard preservation, and post-write REPORT for any CardDAV update.
- Don't: infer email from a domain, send in audit, or claim a contact saved from PUT status alone.
- Verify before reuse: Contact-info/Gmail-dedupe and CardDAV-readback acceptance fixtures.

## 2026-08-06 — CURRENT — LinkedIn exports require partition and logical-record reconciliation

- Project: `inbox-forensic-action-operator-skill`; surface: LinkedIn application, message, connection, saved-answer and Services Marketplace exports.
- Regression caught: one unsuffixed CSV, physical line counts, first-row header assumptions, or file/folder ordering can undercount events and reverse the latest-message direction.
- Superior route: inventory every semantic family/numbered partition, observe headers, parse logical CSV records, validate widths, preserve source rows, sort timestamps and reconcile snapshots with current native evidence.
- Evidence: a current export split applications across three numbered partitions; multiline message cells broke physical-line counts, conversations mixed both directions and ordering, and Connections used a notes preamble.
- Trigger terms: `LinkedIn export`, `messages.csv`, `Job Applications_1`, `all applications`, `screening answers`, `latest reply`.
- Do: keep `export_application_snapshot`, saved, preference, message, invitation and marketplace proof types separate.
- Don't: promote snapshot/application/saved-answer rows into live receipt, reply, offer, acceptance, hire, current fact, or send authority.
- Verify before reuse: all partitions inventoried, logical row widths valid, conversation chronology rebuilt, and newer live evidence checked.

## 2026-08-04 — CURRENT — Career pipelines require native confirmation, cohort and direction reconciliation

- Project: `inbox-forensic-action-operator-skill`; surface: job applications, recruiter threads, CV corrections, meetings, tracker and CRM status.
- Regression caught: prior summaries and lane labels could overstate quota progress; ATS verification mail could be promoted to submission; warm contacts could receive duplicate follow-ups; and a wrong CV could remain unrepaired or create duplicate CRM state.
- Superior route: reconcile raw job/requisition IDs and literal receipts into the requested cohort, bind the selected CV/contact read-back, determine latest-message direction, and correct a mismatched document once in the existing thread.
- Evidence: 4 Aug 2026 Arize split-code Greenhouse flow, tracker-wide recount, Freedom Consulting direction check, Duvo meeting reconciliation and Zooplus same-thread CV repair.
- Trigger terms: `30 more`, `submitted`, `verification code`, `wrong CV`, `follow up all`, `meeting`, `tracker`, `warm opportunity`.
- Do: preserve each proof layer, application identity and historical correction event.
- Don't: count clicks/emails, inherit summary totals, send when newest message is outbound, or duplicate an opportunity.
- Verify before reuse: exact ATS receipt, full-width tracker parse, canonical cohort membership, Sent/thread attachment read-back and current calendar/CRM state.

## 2026-08-04 — CURRENT — Live adapters require deterministic route and stop contracts

- Project: `inbox-forensic-action-operator-skill`; surface: email, Close, browser, GOWA, meeting, provider, and parallel-window audits.
- Regression caught: broad prose detected incomplete sources but left dotenv parsing, audit-safe CRM access, cursorless mail, JID paths/offsets, backfill, media semantics, browser totals, and window merges to agent improvisation.
- Superior route: select one audit recipe, apply only in-scope adapters, record identity/range/totals/hydration/failure origin/proof remaining, and stop on reconciliation or explicit `CHECKPOINT`.
- Evidence: seven adjacent live 48-hour audits (four Terra, three Sol), independent Sol package review, and Terra cross-model comparison in `live-skill-evaluation-2026-08-04`.
- Trigger terms: `all`, `last N days`, `audit`, `delivery`, `Close`, `GOWA`, `drafts`, `of many`, `pagination`, `again`.
- Do: use current identities, literal named-key loading, read-only Close allowlist, raw JIDs, actual-returned offsets, and same-layer state proof.
- Don't: setup auth in audit, call authored Drafts sent, promote alerts/invites/self-reports, or union partial slices into full.
- Verify before reuse: v3 structured fixtures, installed/source equality, and fresh read-only email/Close/GOWA/browser/meeting probes.

## 2026-08-04 — CURRENT — Attention quality requires post-recovery action policy

- Project: `inbox-forensic-action-operator-skill`; surface: triage ranking, drafts, escalation, and CRM attention views.
- Regression caught: strong source-completeness rules still omitted success/failure asymmetry, 3-day warm/cold draft handling, missing expected mail, current-priority scoring, numeric claim labels, and a focused CRM daily view.
- Superior route: narrow at source, pre-classify conservatively, hydrate objective-relevant conversations/alerts, rank on live impact/deadlines, and render only actionable native views.
- Evidence: EMAIL AI MASTER instructions plus the 59-message critique; `v2.2.0` grep showed only generic stale/cold mentions and no executable invariants for these lanes.
- Trigger terms: `many missing`, `attention`, `stale drafts`, `urgent`, `declined`, `expected email`, `Action Now`, `numbers`.
- Do: preserve warm/cold age, success/failure state, channel ladder, number type/as-of, and CRM object/view proof.
- Don't: auto-send old batches, rank urgency copy, suppress missing expected mail, or call a 200-card backlog usable.
- Verify before reuse: package validator scenarios 50–59 plus rendered CRM filter/count proof when a live view is promised.

## 2026-08-03 — CURRENT — Completeness is an executable source contract

- Project: `inbox-forensic-action-operator-skill`; surface: mailbox, transcript, and multi-device source discovery.
- Regression caught: one connector route, relevance-sorted UI, date-only bounds, transcript-level entity binding, and declared pagination totals could each produce plausible but incomplete truth.
- Superior route: record exact source identity; enforce absolute bounds, chronological order, cursor exhaustion, stable-ID deduplication, total reconciliation, interval-level provenance, and hydrated message timestamps.
- Evidence: live seven-day Gmail browser pagination; independent Gmail, Pocket/Screenpipe, and GOWA read-only audits on 2026-08-03.
- Trigger terms: `all`, `last N days`, `every account`, `every device`, `meeting`, `transcript`, `pagination`, `no assumptions`.
- Do: treat route, identity, query/order/bounds, pages/totals, and event-level provenance as separate proof fields.
- Don't: treat authentication failure as mailbox emptiness or list/summary metadata as complete event history.
- Verify before reuse: replay boundary, sort, account/device, pagination-mismatch, long-recording, semantic-hit, and raw-JID acceptance fixtures.

## 2026-08-03 — CURRENT — Proof taxonomy and mutation authority stay separate

- Project: `inbox-forensic-action-operator-skill`; surface: delivery/outcome states and external actions.
- Regression caught: delivery inferred merely from no observed bounce, acceptance collapsed with hire, and a same-message send-confirmation bypass could overstate outcomes or weaken the real-send guard.
- Superior route: use transport/no-bounce as lower proof, split mutual acceptance from hire/onboarding/start, internally review the final preview, and execute without reconfirmation when the current request authorizes the exact action or defined batch.
- Evidence: independent critique of `247ce6a`; full 31-message report; current safety-affordance requirements.
- Trigger terms: `sent`, `delivered`, `accepted`, `hired`, `execute`, `submit`, `send now`.
- Do: treat source coverage, proof state, and authorized mutation classes as independent dimensions.
- Don't: infer write authority from reading a source or retry an ambiguous external action blindly.
- Verify before reuse: package validator, exact target read-back, idempotency search, and same-layer external proof.

## 2026-08-03 — CURRENT — Global discovery before action-only output

- Project: `inbox-forensic-action-operator-skill`; surface: cross-channel inbox and action recovery.
- Regression: prior runs answered an all-opportunity acceptance audit with recent generic alerts, then treated `new`, `human`, and `action-only` as discovery limits.
- Superior route: recover the owner conversation, build the complete entity inventory, search both directions across Gmail and Close, inspect meetings, inventory every logged-in GOWA device before relevance filtering, and check current forms/providers before filtering the rendered result.
- Evidence: sequential recovery of the originating correction-heavy conversation; skill acceptance scenarios 1, 6, 7, and 8.
- Trigger terms: `all`, `reanalyze`, `no assumptions`, `accepted`, `offer`, `only action`, `new`.
- Do: keep discovery scope, output scope, action authority, and proof layer separate.
- Don't: claim `all`, `accepted`, `sent`, or `submitted` from a sampled query, CRM label, draft, or API acknowledgement.
- Verify before reuse: current source ledger, complete pagination, latest event on both sides, and same-layer read-back for every mutation.
