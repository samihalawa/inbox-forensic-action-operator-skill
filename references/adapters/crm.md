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
- current People, Companies, Opportunities, Tasks, Interactions, Notes, Calendar Events,
  Messages, status history, and synchronized events.

Forbidden in `audit`: login, reauthentication, OAuth-link creation, `connection ensure`, connection/workspace creation, default-workspace changes, new browser profiles, or any CRM write.

## Failure Taxonomy

Label each attempted route precisely: `binary_missing`, `workspace_missing`, `connection_missing`, `credential_missing`, `auth_invalid`, `provider_error`, `browser_control_blocked`, `browser_session_inaccessible`, `surface_loaded_unauthorized`, or `network_blocked`.

Also record `failure_origin` and `proof_remaining`. Browser control blocked does not prove signed out; no workspace does not prove no CRM account; one failed route does not prove the CRM source empty.

## Record And Timeline Rules

For Sami's current environment, use Twenty at
`${TWENTY_CRM_URL:-https://crm.megawebs.com}` with `TWENTY_CRM_API_KEY`. Probe the
live metadata and one representative response before relying on fields or filters.
Paginate with `pageInfo.hasNextPage` and `pageInfo.endCursor`; never treat one page as
complete.

Search organization, person, domain, phone/JID, role, requisition, and aliases before
creating anything. Preserve Twenty's native model: organization as Company, person as
Person, distinct role/assignment/deal as Opportunity, next action as Task, meeting as
Calendar Event, email as native Message/Message Thread, and freeform CRM context as
Note. Use the existing custom Interaction object only for external activity that lacks
a native representation.

Read current records and complete latest activities from both directions. Separate activity creation/sync time from the communication event time. CRM stages and labels are leads until primary communication/provider evidence supports them.

Prevent duplicate People, Companies, Opportunities, external Interactions, and open
action Tasks. Mutate only under explicit authority, using full live IDs or deterministic
source IDs, then read back every field, object, and relation. CRM organization is not
proof an external event occurred.

For a promised attention surface, keep one truthful pipeline and focused native views such as Action Now, Waiting, Scheduled, and Closed. Verify rendered filters, counts, placement, and zero-result states.
