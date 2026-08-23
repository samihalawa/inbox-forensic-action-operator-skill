# Career And Opportunity Context Graph

Use this route for a person, recruiter, employer, client, role, application, interview, meeting, email, LinkedIn or WhatsApp exchange, recording, document request, or follow-up. The result is one current entity timeline and action decision, not a pile of disconnected source summaries.

## Context-check sequence

1. Resolve every plausible identity from name, email, phone, company, domain, role, requisition, thread, event, and native ID. Keep ambiguous matches separate.
2. Query the canonical CRM first when accessible, then reconcile the mailbox including Sent and Drafts, Calendar, the full platform/thread history, LinkedIn or ATS state, WhatsApp, recordings, and provider records relevant to the entity.
3. Read later events that can supersede the apparent state. A draft, unread inbound, stale CRM stage, notification, or prior report never decides the ball-in-court alone.
4. Classify the narrowest current state and owner: user owes, other side owes, scheduled, completed, submitted/under review, stale-escalate, dormant, closed, duplicate, or unresolved with the exact missing proof.
5. Immediately before action, repeat the decisive current reads. Execute under existing authority without asking for routine reconfirmation. Read the real result back and make it the new canonical state.

If one source is unavailable, use every other source, preserve the exact gap internally, and continue every action that the missing source cannot reverse. Context-checking is an execution precondition, never a reason to stop.

## Twenty two-wave retrieval

Do not claim one API call returns a full graph. Probe current metadata and representative records, then use two planned waves:

1. resolve seed record IDs;
2. fan out related reads in parallel and paginate until `pageInfo.hasNextPage` is false.

For a Person, retrieve the profile and Company; Opportunities where the person is point of contact; External Activities; calendar participation and related events; native communications through `messageParticipants -> messages -> messageThreads` and channel associations; and person-targeted Notes, Tasks, Attachments, and Timeline Activities. Inspect linked Companies, Opportunities, events, and External Activities for relevant two-hop context.

For a Company, retrieve the profile, owner, People, Opportunities, direct External Activities, Notes, Tasks, Attachments, and Timeline Activities. Reach meetings through Opportunities, people's calendar participation, or External Activities. Reach native messages through People.

For an Opportunity, retrieve Company, point of contact, owner, stage, value, close date, External Activities, Calendar Events, Notes, Tasks, Attachments, and Timeline Activities. For each event, retrieve participants, recordings, transcripts, summaries, and relevant linked activity. For each linked person, retrieve native message history.

For a meeting or interview, retrieve direct Calendar Event metadata, participants, cancellation state, linked Opportunity, External Activities, recordings, transcript, summary, audio/video references, and provider occurrence. Retrieve Notes, Tasks, Attachments, and Timeline indirectly through the linked Opportunity or External Activities, and native messages through participants.

Always inspect the two communication systems independently:

- native synchronized communications: `messageParticipants -> messages -> messageThreads` plus channel associations;
- External Activities (`interactions`) for `LINKEDIN`, `WHATSAPP`, `RECORDING`, and `OTHER`.

Do not assume an email, LinkedIn exchange, WhatsApp message, or recording exists in both. Calendar Events do not directly own Notes, Tasks, Attachments, Timeline Activities, or messages. Companies do not directly own meetings or native messages. Query the relevant relations instead of inventing edges.

## Unified result

Return or hold one deduplicated chronology tagged with source, native ID, direction, timestamp, and proof layer. Include identity and company/role confirmation; current opportunity or meeting state; requests, promises, decisions, blockers, deadlines, attachments, and next action; and exact checked-but-missing sources.

Never collapse distinct requisitions, roles, people, companies, or channels because names look similar. Never promote CRM acceptance, a draft, a sent claim, an invitation, a provider run status, or an export snapshot beyond the layer it proves.
