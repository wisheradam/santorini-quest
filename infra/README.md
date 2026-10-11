# Santorini.quest email activation

The email implementation is intentionally inactive in production until all security and delivery prerequisites are complete.

## Current safety state

- The public email form is rendered with `hidden` and `aria-hidden="true"`.
- `site/email.js` exits immediately while the form is hidden.
- No email API route has been added to API Gateway.
- The prepared Lambda source in `infra/index.py` has not replaced the production function.
- No Turnstile secret or other credential is stored in this repository.

## Activation checklist

1. Create a managed Cloudflare Turnstile widget named `santorini-quest-email` for `santorini.quest`, `www.santorini.quest`, `localhost`, and `127.0.0.1`.
2. Use action `send_itinerary` only for `POST /quests/{id}/email`.
3. Store the widget secret in AWS Systems Manager Parameter Store as a SecureString; never commit it or expose it to the browser.
4. Set the production backend hostname allowlist to `santorini.quest,www.santorini.quest` only.
5. Add the public sitekey to the Turnstile widget in `site/index.html` and load Cloudflare's official Turnstile script.
6. Verify SES DKIM and confirm SES production access.
7. Deploy the prepared Lambda code with least-privilege permissions for SES, DynamoDB updates, and the two SSM parameters.
8. Add the email and unsubscribe API routes with throttling.
9. Test a valid token, invalid token, action mismatch, hostname mismatch, and token replay. The backend must fail closed.
10. Remove `hidden aria-hidden="true"` from `#emailAdventureForm` only after every preceding check passes.
