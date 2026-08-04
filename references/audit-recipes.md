# Audit Recipes

Select one primary recipe. Add another only when the request explicitly needs both outputs.

## Coverage

Enumerate every required identity and viable route. Freeze bounds and ordering; exhaust cursors/ranges or prove a finite cursorless set; reconcile declared, returned, and deduplicated IDs; hydrate enough records to validate timestamps and direction. Output the coverage ledger and proof gaps. Do not rank actions or mutate.

## Entity Status

Start with broad source discovery. Build pivots from every verified identity, organization, role, subject, event, requisition, and stable ID. Read both directions and later events that can override older state. Keep separate opportunities/cases separate. Output one canonical timeline and latest-state verdict per entity.

## Attention

Narrow at the source where supported, then hydrate only candidates that can affect the current objective: human conversations, required documents/forms, deadlines, failures, declines, cancellations, security/provider incidents, and expected messages that are missing. Deduplicate machine storms, rank by current impact and verified deadlines, and show actions due now. Candidate selection based on list hints or sampling cannot support a global `all` claim.

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
