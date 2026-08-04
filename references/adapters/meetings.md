# Meetings Adapter

Search participant, organization, role, title, event ID, and date across calendar, meeting provider, recordings/transcripts, email, CRM, and messages.

Keep these states separate: proposed, invited, accepted, scheduled, rescheduled, cancelled, no-show, `user_reported_completed`, and completed.

- Invitation or join link proves scheduling only.
- A self-authored “thanks for the call” or post-hoc calendar row supports only `user_reported_completed`.
- Completed requires counterparty acknowledgment, participant-bound attendance, an entity-bound transcript/recording interval, or provider-owned occurrence evidence.
- A matching provider cancellation overrides the original invitation.
- Empty recordings, automated notices, and no-show messages do not prove attendance.

Treat semantic transcript/OCR/summary hits as candidates. Bind native recording ID/title, participants, dates, and the relevant interval. Partition anomalously long recordings; unrelated intervals cannot update the entity. If boundaries are not defensible, keep state-changing material unbound and coverage partial.

Calendar caches and direct event tables are separate source shapes. If an occurrence cache is empty, inspect the direct event table/provider and record the disagreement before claiming no event.

Preserve event time, recording/detection interval, calendar creation/sync time, and observation time separately.
