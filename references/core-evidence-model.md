# Core Evidence Model

## Entity And Event

Create one reversible record per real conversation, case, incident, opportunity, assignment, application, deal, or decision. Do not merge solely on organization, domain, sender, subject fragment, or contact.

For every event retain:

- `occurred_at` and timezone;
- `occurred_interval` when a recording/capture spans interactions;
- `observed_at` when indexed, synced, imported, or exposed;
- source identity, route, channel, direction, actor, and recipient;
- stable source ID and device/context;
- native versus semantic/OCR/summary match provenance;
- decisive evidence, requested/completed action, proof layer, and state effect.

Chronology uses entity-bound event time. Observation time explains late discovery and never rewrites the event.

## Proof Ladders

Keep communication states separate:

`candidate -> attempted -> drafted -> sent -> transport accepted -> no bounce observed -> delivery confirmed -> human reply`

Keep forms/providers separate:

`opened -> filled -> reviewed -> submitted -> confirmation displayed -> provider accepted -> externally decided`

Keep provider incidents separate:

`notification observed -> provider alert observed -> provider state verified -> remediation verified -> user-visible outcome verified`

Lower layers never prove higher layers. A payment, deployment, certificate, or security alert establishes `provider_alert_observed`, not current provider state or recovery.

## Meeting Evidence

`user_reported_completed` means the user described a meeting as having happened without independent participant/provider proof. It is below `completed`. Meeting-specific gates live in the meetings adapter.

## Ownership

Record both:

- `response_owner`: who owes the substantive response — user, them, system, shared, or none;
- `next_action_owner`: who must act now under a verified deadline/follow-up rule.

Waiting on them may still become a user-owned follow-up after an explicit promised date or established domain window passes. Do not invent an arbitrary deadline.

## Action Selection And Ranking

Include an action only when it is concrete, safe now, not already completed/duplicated, has an exact target, and its next-action owner is user/shared/system-with-user-remediation.

Group exact automation storms by sender, target, event type, and normalized subject; retain count, newest event, and source IDs. Keep status/newsletter/broadcast or generic alert traffic out of action ranking unless objective-linked.

Apply success/failure asymmetry: suppress a matched benign success with no remaining action, retain relevant declines, failures, cancellations, deadlines, and missing expected messages, and let the newest provider-owned event resolve conflicting success/failure state.

After one unanswered follow-up, check duplicate risk and choose among current verified alternate routes when escalation is due. Do not manufacture another message or hard-code a universal channel order.

Rank by hard deadline or irreversible expiry, concrete offer, warm human action, scheduled assessment/document, due follow-up or failed route with verified alternative, accurate stale draft, then cold/low-information work. Current objective impact beats urgency-sounding copy.

## Contradictions And Gaps

Confirm entity identity, compare event time, prefer the source that owns the event, and preserve facts that represent different proof layers. Every gap records:

- `failure_origin`: `skill`, `provider/source`, `route/environment`, or `unresolved`;
- route-specific failure label when available;
- `proof_remaining`: the exact next read that could resolve it.

One provider defect and one missing skill recovery step may coexist; never collapse them into one cause.
