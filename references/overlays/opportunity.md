# Opportunity Overlay

Load only for career, teaching, freelance, consulting, sales, deal, contract, or work-offer classification.

## Job-Search Progression Doctrine

For a hiring opportunity, default a plausibly relevant role or warm process to `apply / proceed`. A lower salary or rate, employment format, title mismatch, missing preferred technology, or imperfect wishlist match is not itself a rejection reason. Discover compensation with its currency, unit, and meaning plus the real responsibilities, seniority, ownership, contract, duration, location, work model, travel, and onsite cadence; never convert one opportunity's number into a universal minimum.

Keep permanent, contract, freelance/B2B, remote, hybrid, hourly, daily, monthly, commission, and adjacent strong-fit AI/software paths open unless the user explicitly excludes them. Tailor with the strongest truthful production evidence and clear employment/founder/consulting/project chronology; never manufacture facts. Default a viable recruiter interaction to concise interest, immediate availability, the requested information, and a concrete next step.

Prioritize warm human replies, requested CVs or documents, screening questions, assessments, deadlines, and scheduling above cold applications. If the latest complete message is already outbound and the employer or recruiter owes the next move, record `waiting_on_employer` and do not draft or send a duplicate follow-up unless a real deadline has passed. Keep other processes alive while waiting.

Use the narrowest state supported by current evidence:

- `candidate / not applied`;
- `applied / no human reply`;
- `application confirmed / monitoring`;
- `application blocked / factual answer required`;
- `application blocked / route or authentication`;
- `interview requested`;
- `interview scheduled`;
- `user_reported_completed`;
- `interview completed` with participant/provider proof;
- `next stage / assessment`;
- `positive interest / no offer`;
- `work offered / terms pending`;
- `formal offer pending acceptance`;
- `user accepted / employer confirmation pending`;
- `mutually accepted / agreement confirmed`;
- `hired / contracted`;
- `pre-employment condition`;
- `onboarding`;
- `started`;
- `rejected / closed`;
- `unclear` with named proof debt.

Never infer offer, selection, acceptance, hire, or start from `counting on you`, `move forward`, `next steps`, `shortlisted`, `vetting`, `right to represent`, `interview`, `availability`, `welcome`, or `approved` without identifying the approved object and later decisive evidence.

Keep distinct roles, assignments, applications, and deals separate even when they share employer/contact. Offer is not acceptance; acceptance is not contract activation; onboarding is not start.

## Career Pipeline Reconciliation

- Treat LinkedIn data exports as dated snapshot evidence. Inventory every numbered partition, parse logical CSV records, preserve source row provenance, and sort conversation events by parsed time. An export application row is `export_application_snapshot`, not current receipt, reply, interview, offer, acceptance, or hire; saved jobs and saved answers are weaker, distinct evidence types.
- Bind each application to raw platform job ID or requisition ID, canonical URL, employer, title, submission timestamp, selected CV, contact details, and literal confirmation. Similar titles or employer names do not deduplicate different requisitions; location mirrors and same-title reposts require an explicit identity decision.
- Treat tracker rows, CRM opportunities, recruiter threads, calendar events, and ATS records as separate evidence layers. Repair stale internal status only after the source-native latest event is read.
- Determine current-message direction before follow-up. Latest inbound plus an unresolved request may justify one tailored response; latest outbound normally means wait unless an explicit deadline has passed. Never send a generic follow-up merely because an application exists.
- Rank warm human replies, document corrections, scheduled meetings, explicit deadlines, and requested screening information above cold applications. A meeting invite is scheduled, not completed; a recruiter acknowledgement is interest, not an offer.
- When a wrong CV was sent, preserve the original event, send the correct role-relevant CV in the same thread once, verify the attachment in Sent/thread, and record the correction. Do not erase history or create a second CRM opportunity for the same requisition.
- Count quota progress from literal native confirmations in the requested cohort. `Apply` clicks, review screens, verification emails, drafts, saved applications, and tracker labels without native proof do not count.
