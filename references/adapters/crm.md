# CRM Adapter

## Audit No-Write Allowlist

In `audit`, allowed discovery is limited to:

- callable-tool/connector inventory;
- CLI version, status, and config reads;
- current/default workspace reads;
- existing connection list/read;
- named credential-key presence without values;
- direct read-only API calls;
- already-authenticated browser reads;
- current leads, contacts, opportunities, tasks, activities, notes, status history, meetings, and synchronized events.

Forbidden in `audit`: login, reauthentication, OAuth-link creation, `connection ensure`, connection/workspace creation, default-workspace changes, new browser profiles, or any CRM write.

## Failure Taxonomy

Label each attempted route precisely: `binary_missing`, `workspace_missing`, `connection_missing`, `credential_missing`, `auth_invalid`, `provider_error`, `browser_control_blocked`, `browser_session_inaccessible`, `surface_loaded_unauthorized`, or `network_blocked`.

Also record `failure_origin` and `proof_remaining`. Browser control blocked does not prove signed out; no workspace does not prove no CRM account; one failed route does not prove the CRM source empty.

## Record And Timeline Rules

Search organization, contact, domain, phone/JID, role, requisition, and aliases before creating anything. Preserve the native model: company/account as Lead, person as Contact, distinct role/assignment/deal as Opportunity, next action as Task, and communication as Activity/Note.

Read current records and complete latest activities from both directions. Separate activity creation/sync time from the communication event time. CRM stages and labels are leads until primary communication/provider evidence supports them.

Prevent duplicate leads, contacts, opportunities, and open action tasks. Mutate only under explicit authority, using full live IDs, then read back every field/object. CRM organization is not proof an external event occurred.

For a promised attention surface, keep one truthful pipeline and focused native views such as Action Now, Waiting, Scheduled, and Closed. Verify rendered filters, counts, placement, and zero-result states.
