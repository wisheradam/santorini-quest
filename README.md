# Santorini Quest

Santorini Quest lets visitors create a personalized quest, share its live countdown, print it, or save it as an image.

## Current features

- Quest name and participant name input
- Adventure date selection, limited to three months
- Shareable countdown page
- Print-friendly quest layout
- PNG image export
- Automatic expiration after the selected date
- Check2Go attribution and website link

## Production architecture

- **Amazon S3** stores the website privately.
- **Amazon CloudFront** serves it globally over HTTPS.
- **Amazon Route 53** manages `santorini.quest` and `www.santorini.quest`.
- **AWS Certificate Manager** provides the TLS certificate.
- **API Gateway + Lambda** validate, create, and retrieve quests.
- **DynamoDB** stores quest records and automatically removes them using TTL.
- **GitHub Actions** deploys `site/` from `main` using AWS OIDC. No permanent AWS credentials are stored in GitHub.

Expired quests are rejected immediately by the API. DynamoDB TTL then removes their stored records automatically.

## Deployment

Every change under `site/` pushed to `main` deploys to production and refreshes CloudFront.

Production: https://santorini.quest
