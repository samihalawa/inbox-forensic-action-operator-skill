# WhatsApp Adapter

## Current Devices And Routes

Use the current direct authenticated `/devices` response as primary proof when configured. Every returned `logged_in` device enters the coverage ledger. Use a proxy only after current proof it forwards the configured authentication. Never trust a dated/current-only device example.

Search names, phone, organization, aliases, and every raw JID domain. Preserve literal `@` in `/chat/{JID}/messages`. If behavior is uncertain, compare raw and encoded path forms once; a `%40` failure is route-shape failure, not missing history.

## Two Coverage Layers

Keep chat-list inventory and message-history coverage separate. Paginate every device chat list and reconcile unique JIDs. Chat-list `last_message_time`, `created_at`, and `updated_at` are discovery hints only.

For message histories:

1. record device, raw JID, direction, timestamp, provider message ID, text, sender context, and media metadata;
2. set `next_offset = current_offset + actual_returned_count`, never requested limit;
3. record declared total, each offset/returned count, unique stable-ID count, first empty offset, and deficit;
4. if declared total differs from unique returned, coverage is partial even after an empty page;
5. stop a loop when neither offset nor unique IDs advance, but preserve the unresolved deficit.

Recovery order is raw-JID retry, normalized limit/actual offset, native exact-chat/device history, provider export/backfill/database route, then explicit deficit and `partial`.

If list recency exceeds the hydrated newest message, or nonzero list time hydrates zero records, invalidate list-only exclusions. Widen discovery or use backfill/export; otherwise a global claim remains partial. Bounded attention candidate hydration is allowed only with sampled/partial coverage.

## Deduplication And Media

Deduplicate using device/context + provider message ID + raw JID + direction + sender context. Never merge device histories by JID alone. Use content/time only to detect ID collisions or as conservative fallback, never sole proof.

Track three counts separately: `media_metadata_count`, `binary_reachable_count`, and `semantic_inspected_count`. Generic bytes or `application/octet-stream` do not prove content. Route state-changing audio/image/video/document through transcription, OCR, or parsing; otherwise name exact proof debt.

Status, broadcast, and newsletter contexts remain in completeness accounting but stay out of attention ranking unless objective-linked.

Before an authorized send, verify current device, recipient/JID, newest chat, exact content/media, and whether another channel already completed the action. After ambiguity, reread message IDs before any retry.
