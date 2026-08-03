# State And Action Model

## Canonical Entity Record

Create one reversible record per real opportunity, assignment, application, deal, or support case. Keep source pointers so merges can be undone.

Identity keys may include:

- organization and verified aliases;
- role, assignment, product, or requisition ID;
- contact identities and domains;
- thread, message, meeting, chat, application, provider, and CRM IDs;
- event-time sequence.

Never merge solely because two items share an employer, sender domain, recruiter, subject fragment, or contact.

## Event Model

Record:

- `occurred_at`: when the real event happened;
- `occurred_interval`: the entity-bound start/end when a recording, OCR capture, or batch spans multiple interactions;
- `observed_at`: when the system indexed, imported, synchronized, or exposed it;
- source/channel and direction;
- actor and recipient;
- stable source ID;
- match provenance: native identity/title/participant/interval or lower-confidence semantic/OCR/summary text;
- exact decisive evidence;
- action requested/completed;
- proof layer;
- effect on canonical state.

Sort primarily by the verified entity-bound `occurred_at` or `occurred_interval`. Use recording/detection intervals and `observed_at` to explain late discovery, not to rewrite chronology. Material outside the entity-bound interval cannot change that entity's state.

## Opportunity State Gates

Use the narrowest state supported by current evidence:

- `applied / no human reply`: submission proven, no relevant human response;
- `interview requested`: meeting proposed, slot not confirmed;
- `interview scheduled`: current event or explicit agreement proves the slot;
- `interview completed`: participant-bound attendance, an entity-bound transcript interval containing the interaction, or an explicit post-meeting confirmation proves occurrence;
- `next stage / assessment`: named round, assessment, references, vetting, or right-to-represent;
- `positive interest / no offer`: interest without concrete work and material terms;
- `work offered / terms pending`: concrete work proposed while rate, schedule, scope, contract, or start remains unresolved;
- `formal offer pending acceptance`: concrete role/assignment and material terms, without explicit user acceptance;
- `user accepted / employer confirmation pending`: user explicitly accepted, with no matching current employer confirmation or start evidence;
- `mutually accepted / agreement confirmed`: current evidence supports a concrete offer and explicit acceptance by both sides, but no employer/provider activation is yet proven;
- `hired / contracted`: the employer or provider confirms the employment, contract, or assignment is active;
- `pre-employment condition`: advancement or offer remains conditional on named checks, references, documents, approval, or budget;
- `onboarding`: mutual engagement is established and setup steps remain;
- `started`: actual start, completed onboarding, or performed assignment is proven externally;
- `rejected / closed`: explicit rejection, withdrawal, cancellation, expiry, or mutual closure;
- `unclear`: decisive evidence conflicts or required coverage remains partial; name the missing proof.

Never infer offer, selection, acceptance, or hire from `counting on you`, `move forward`, `next steps`, `shortlisted`, `vetting`, `right to represent`, `interview`, `availability`, `welcome`, or `approved` without identifying the approved object and later decisive evidence.

## Communication And Action Proof Ladder

Keep these states separate:

`candidate -> attempted -> drafted -> sent -> transport accepted -> no bounce observed -> delivery confirmed -> human reply`

Keep form/provider states separate:

`opened -> filled -> reviewed -> submitted -> confirmation displayed -> provider accepted -> externally decided`

Keep opportunity outcomes separate:

`interest -> next stage -> offer -> user acceptance -> mutual acceptance -> hired/contracted -> onboarding -> started`

Lower layers never prove higher layers.

## Ball-In-Court Has Two Axes

Record both:

- `response_owner`: who currently owes the substantive response — user, them, system, shared, or none;
- `next_action_owner`: who must act now under the follow-up/deadline policy — user, them, system, shared, or none.

This prevents the common error where `waiting on them` hides a follow-up that is already due.

Examples:

- user sent yesterday, normal response window open: response owner `them`; next action owner `them`;
- user sent one week ago, agreed follow-up date passed: response owner `them`; next action owner `user`; state `follow-up due`;
- user owes requested documents: both owners `user`;
- permanent bounce requires alternate route: response owner `system`; next action owner `user`.

## Follow-Up Policy

- Use an explicit promised date, deadline, service window, or user instruction when available.
- Otherwise infer no arbitrary deadline. State `none found` until a domain-appropriate policy is established.
- After one unanswered follow-up, run a duplicate-risk check and prefer the verified escalation ladder `email -> WhatsApp -> phone` where those routes are current and appropriate; do not manufacture a third email by default.
- Cross-channel escalation must reuse current context and avoid contacting the same person twice for the same ask.

## Action-Only Selection

Include only items with:

1. a concrete safe action the user can take now;
2. evidence that the action is not already complete or duplicated;
3. `next_action_owner` equal to user, shared, or system-with-user-remediation;
4. an exact target and next step.

Exclude:

- waiting on them and not yet due;
- benign confirmations;
- completed, closed, rejected, cancelled, or expired items without a new action;
- generic alerts, newsletters, promotions, receipts, and unrelated infrastructure;
- monitoring-only items unless the user asked for monitors or the check is due now.

## Pre-Triage Classification

Use native/source-side narrowing first, without broad fallback floodgates. Then classify compact sender, subject, headers, and snippet evidence as:

- `Actionable_Conversation`: a human exchange or concrete request that may require action;
- `Transactional_Receipt`: a receipt or benign confirmation with no unresolved failure;
- `System_Alert`: machine mail whose failure, decline, deadline, security, delivery, or provider state may affect the objective;
- `Marketing`: newsletters, bulk promotions, social alerts, and generic campaigns.

Only hydrate and deeply analyze candidates that can affect the requested objective: actionable conversations plus relevant system alerts. Use full thread/provider evidence before final state. Personalized automation can resemble a human message, so keywords and headers alone are not final classification.

Apply the success/failure asymmetry explicitly:

- matched success or completion confirmation with no remaining action: suppress from action-only output;
- decline, failure, cancellation, deadline, security incident, delayed/permanent delivery failure, or expected message missing: retain when relevant;
- conflicting success and failure: reconstruct the timeline and let the newest verified provider-owned event decide.

## Ranking

### Deduplication And Noise

- Normalize reply/forward prefixes and volatile machine IDs, timestamps, or dates only to identify the same machine-alert family.
- Group exact automation storms by normalized subject, sender, target identity, and event type; retain the message count, newest event time, and source IDs.
- Render grouped storms with a compact count such as `x12`; never let twelve copies occupy twelve attention rows.
- Never use subject normalization alone to merge distinct human opportunities, roles, conversations, or state-changing events.
- Exclude self-generated automation unless an external human participates, the automation changes external state, or it directly affects the requested objective.
- Keep excluded categories and grouped counts recoverable so a false-negative classification can be audited.

### Priority Order

Rank after deduplication:

1. hard deadline, concrete offer, or irreversible expiry;
2. warm human thread with user-owned action;
3. scheduled meeting, assessment, or required document/form;
4. due follow-up or failed route with a verified alternative;
5. stale draft that still reflects current truth;
6. low-information chatter or cold batch work.

Do not let a noisy alert storm outrank one high-value human action.
An accurate stale draft to a named human/prior contact inherits the warm-human rank; only stale cold batches remain at the bottom.
Do not rank on urgency-sounding wording alone. Use current user priorities, objective impact, money or opportunity movement, deadline proximity, human-versus-machine evidence, reversibility, and the verified next-action owner. Current live priorities must be recovered from the task or current durable sources; never hard-code dated priorities into the public skill.
