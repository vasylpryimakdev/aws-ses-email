# AWS SES Email Sender

A minimal Serverless Framework project that deploys an AWS Lambda function to send email through Amazon SES, plus a simple Next.js client for submitting contact messages.

## Project overview

- `handler.js`: AWS Lambda handler using `@aws-sdk/client-ses`.
- `serverless.yml`: Serverless Framework service configuration and HTTP POST endpoint for `/contact-us`.
- `client/`: Next.js application with a contact form.

The Lambda function accepts a JSON POST request and sends an email using SES. The client app submits the form data to the deployed API.

## Features

- SES email sending with Node.js 24.x runtime
- HTTP POST API endpoint: `/contact-us`
- CORS support enabled for the Lambda response
- Next.js client form for `to`, `from`, `subject`, and `message`

## Requirements

- Node.js (recommended 18+ or compatible with Next.js and AWS Lambda Node.js 24.x)
- npm
- Serverless Framework CLI installed
- AWS credentials configured locally
- SES sender/recipient addresses verified if your SES account is in sandbox mode

## Setup

1. Install root dependencies:

```bash
npm install
```

2. Install client dependencies:

```bash
cd client
npm install
```

3. Configure AWS credentials and default region, for example with `aws configure`.

## Deploy

From the project root, deploy the service with Serverless Framework:

```bash
serverless deploy
```

After deployment, the HTTP endpoint will be available through API Gateway. The function is configured in `serverless.yml` as `createContact` and uses the `handler.createContact` export.

## Local development

Run the client app locally:

```bash
cd client
npm run dev
```

Then open `http://localhost:3000` in your browser.

> Note: `client/pages/index.js` currently uses a hard-coded API URL. Update that URL to the deployed API endpoint or wire it to an environment variable for local testing.

## Usage

Submit the contact form with:

- `to`: recipient email address
- `from`: sender email address
- `subject`: email subject
- `message`: email body text

The Lambda handler will send the email via SES and return a JSON response indicating success or failure.

## SES and AWS notes

- SES may require sender and recipient verification in sandbox mode.
- The function currently requests `ses:*` permission in `serverless.yml`.
- The Lambda runtime is `nodejs24.x` and architecture is `arm64`.

## File structure

- `handler.js` - Lambda function logic
- `serverless.yml` - Service definition and API event config
- `client/package.json` - Next.js client dependencies and scripts
- `client/pages/index.js` - Contact form UI and fetch call

## Troubleshooting

- If email sending fails, verify SES configuration and sandbox restrictions.
- Check CloudWatch logs for Lambda errors.
- Make sure the API endpoint in the client code points to the deployed API Gateway URL.

## License

MIT
