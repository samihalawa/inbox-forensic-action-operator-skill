# LinkedIn Export Adapter

Use a LinkedIn data export as a dated discovery and reconciliation snapshot. It is not a substitute for current LinkedIn, ATS, email, calendar, or CRM state.

## Inventory And Parse

1. Record the export root, archive/as-of date when known, timezone assumptions, and every relevant file path.
2. Discover semantic file families across the whole root. Include unsuffixed and numbered partitions such as `Job Applications.csv`, `_1`, and `_2`; do not assume one file is complete or that suffix order is chronological.
3. Observe the real header of every file before mapping. Some exports contain notes or blank rows before the true header.
4. Parse with an RFC 4180-aware CSV reader. Count logical records, not physical lines: message bodies and question/answer cells may contain embedded newlines, commas, or quotes.
5. For every file record exact headers, logical row count, row-width errors, first/last parsed event time, declared totals when any, stable IDs, duplicates, and coverage. Preserve source filename plus logical row number for every canonical event.

Union partitions only after per-file validation. Deduplicate with the strongest observed key rather than a remembered schema. For applications prefer the raw LinkedIn job ID parsed from the observed Job URL; otherwise preserve the narrowest exact composite and mark unresolved collisions. Sort on parsed event timestamps explicitly.

## Evidence Types

- `Job Applications*` supports `export_application_snapshot` at the export time. It can corroborate or backfill an application event, but it does not prove a current receipt, delivery, reply, interview, offer, acceptance, hire, or start.
- `Saved Jobs` supports candidate/saved only, never applied.
- saved screening answers, application answers, and job-seeker preferences are historical user-entered leads. They do not authorize reuse and are not current consequential facts until verified against current user wording or canonical profile evidence.
- `messages.csv` contains both inbound and outbound records. Group by conversation ID; preserve sender/recipient profile URLs, subject, folder, attachments, and content; parse `DATE`; sort chronologically; and derive latest direction from the newest bound event. Folder and file order do not prove direction.
- invitations and connections provide identity pivots. Preserve profile URLs and direction; handle note/preamble rows before the actual connection header.
- Services Marketplace opportunities, engagements, and provider records are separate event families. Do not collapse them into job applications or infer delivery/outcome from configuration or status text alone.

## Reconcile And Stop

Bind export events to the canonical application/opportunity entity using stable job/requisition IDs, canonical URL, company, role, profile/contact identities, conversation ID, and timestamps. Keep export observation time separate from event time. Search later inbound and outbound messages and current native sources; newer decisive evidence may override the snapshot without erasing it.

Coverage is full only when every relevant file family and numbered partition is inventoried, every logical record is parsed with valid width, union/deduplication counts reconcile, and decisive threads are chronologically hydrated. Otherwise retain a per-file `partial`, `missing`, or `blocked` row and exact proof remaining.
