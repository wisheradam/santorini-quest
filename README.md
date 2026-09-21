# Santorini Quest

Santorini Quest is a web app for creating printable quests, exporting them as images, and sharing countdown pages lasting up to three months.

## Production architecture

- **Amazon S3** stores the compiled website privately.
- **Amazon CloudFront** serves the site globally over HTTPS.
- **Amazon Route 53** manages `santorini.quest` and `www.santorini.quest`.
- **AWS Certificate Manager** provides the TLS certificate.
- **GitHub Actions** deploys `site/` from the `main` branch using AWS OIDC. No long-lived AWS keys are stored in GitHub.

The first version is a lightweight placeholder. The quest editor and countdown backend will be added as the product is developed.

## Deployment

Every push to `main` deploys the contents of `site/` to production and invalidates the CloudFront cache. The workflow can also be run manually from the Actions tab.

Production URL: https://santorini.quest
