# Forms And Provider Adapter

Use an existing authenticated browser or native provider route for profile-dependent ATS/forms. Inspect the current input/output shape before filling.

Resolve exact organization, role/case, requisition/submission ID, account/profile, and current state. Keep these layers separate:

`opened -> filled -> reviewed -> submitted -> confirmation displayed -> provider accepted -> externally decided`

Read validation errors and conditional sections literally. Do not infer hidden defaults or remembered schemas. Before retrying after timeout/navigation failure, reopen the provider dashboard and search for a created submission.

Preserve confirmation text, timestamp, stable ID, and resulting status. A blank reusable form is not proof of submission; receipt is not interview/offer/acceptance; provider alert mail is not current provider state or remediation.

Any authorized submission follows the mutation/idempotency reference and same-layer readback.

## Email Verification Gates

When an ATS sends a one-time application code, bind the newest code message to the exact employer, requisition, recipient, and current submission attempt. Read the current email body; do not reuse a code from another employer or earlier attempt. Inspect the live form input shape before entering it: a visually single code control may be eight separate one-character inputs. Read back every character, confirm the final submit control is enabled, submit once, and require the ATS confirmation page. The security email and an enabled button are intermediate proof only.
