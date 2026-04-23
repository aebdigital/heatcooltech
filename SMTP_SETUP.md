# SMTP2GO setup

This project sends the contact form through SMTP2GO.

## Required environment variables

Set these variables in Netlify and in your local `.env.local` when testing the form:

```env
CONTACT_FORM_RECIPIENT=info@example.com
SMTP2GO_API_KEY=api-xxxxxxxxxxxxxxxx
SMTP2GO_SENDER=Heatcooltech <no-reply@example.com>
```

## What is implemented

- `netlify/functions/contact.js`
  - Netlify serverless function for production form handling
- `app/api/contact/route.ts`
  - local Next.js API bridge for dev mode
- `netlify.toml`
  - rewrites `/api/contact` to the Netlify function in production

## SMTP2GO request format

The implementation uses SMTP2GO's standard `/email/send` endpoint with:

- `sender`
- `to`
- `subject`
- `text_body`
- `html_body`

and authenticates with the `X-Smtp2go-Api-Key` header.

## Local testing

1. Create `.env.local`
2. Add the three variables above
3. Run `npm run dev`
4. Submit the contact form from the site

In local development, the form posts to `app/api/contact/route.ts`.

## Netlify deployment

1. Add the three environment variables in the Netlify dashboard
2. Deploy the project
3. Netlify will route `/api/contact` to `/.netlify/functions/contact`

## Failure modes

- Missing env vars: the form returns a server configuration error
- SMTP2GO rejected request: the form shows the API error message when available
- Validation failure: the form requires name, email, message, and consent
