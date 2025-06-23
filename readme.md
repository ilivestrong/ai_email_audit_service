# Email Audit Service

This service audits email files (`.eml`) for grammar, tone, clarity and other rules, ensuring they meet quality standards and include at least one image attachment. It uses OpenAI LLM for email content evaluation for enabled and configured rules and provides a JSON report.

## Features

- **Email Parsing:** Extracts text, subject, and detects image attachments from `.eml` files.
- **Dynamic rules engine:** Allows new rules to be integrated without changing core rules engine.
- **Rule-Based Auditing:** Checks grammar, tone, gretting etc using configurable LLM/ Non LLM-powered rules.
- **REST API:** Allows to Upload `.eml` files for auditing via a simple HTTP POST endpoint.
- **Docker Support:** Easily deployable with Docker and Docker Compose.

## Project Structure

```
.
├── src/
│   ├── app.ts                # Express server and API endpoint
│   ├── eml/
│   │   ├── emailParser.ts    # Parses .eml files
│   │   └── htmlToText.ts     # Converts HTML to plain text
│   ├── engine/
│   │   ├── loadRules.ts      # Loads enabled rules
│   │   ├── reportGenerator.ts# Generates audit reports
│   │   └── ruleEngine.ts     # Runs rules on email content
│   └── rules/
│       ├── grammarRule.ts    # Grammar checking rule
│       └── toneRule.ts       # Tone checking rule
├── uploads/                  # Uploaded .eml files (temporary)
├── email-samples/            # Sample .eml files for testing
├── package.json
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
└── .env.example              # Lists required .env fields
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://wwww.github.com/ilivestrong/ai_email_audit_service
   cd ai_email_audit_service
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in required values.

### Running the Service

#### Locally

```sh
npm start
```

#### With Docker

```sh
docker-compose up
```

### Port

The RESTful API server runs on port _3149_ by default for local run. You can chanage it in the .env file. For Docker, port mapping can be updated in docker-compose file.

### API Usage

#### Endpoint

`POST /email/audit`

- **Form field:** `email` (file, `.eml` format)

#### Example with `curl`:

```sh
curl -F "email=@email-samples/polite email with image.eml" http://localhost:3149/email/audit
```

#### Sample Response

```json
{
  "totalScore": "0/3",
  "results": [
    {
      "pass": false,
      "explanation": "The tone is disrespectful and unprofessional, using insults and harsh language."
    },
    {
      "pass": false,
      "explanation": "The email contains grammatical errors, including improper sentence structure, missing auxiliary verbs, and punctuation issues."
    },
    {
      "pass": false,
      "explanation": "Greeting is missing or unclear at the beginning of the email."
    }
  ],
  "summary": "The email demonstrates significant weaknesses in professionalism and tone, with disrespectful language. It also contains grammatical errors and lacks a proper greeting. Improvements should focus on adopting a respectful tone, correcting grammatical issues, and including a clear greeting at the start."
}
```

## Configuration

- **Rules:** Enable or disable rules in [`src/rules/rules.config.json`](src/rules/rules.config.json). Make sure that rule file name
  matches the rule key in rules.config.json.
- **Uploads:** Uploaded files are stored in the `uploads/` directory and deleted after processing.

## Development

- **Add new rules:** Implement a class in [`src/rules/`](src/rules/) that extends `BaseRule`.

## Testing

- For testing purpose some sample .eml files are provide in /email-samples folder

## License

MIT

---

**Note:** This project uses OpenAI LLM for email content evaluation. Ensure your provided OpenAI API key in .env file is valid and have enough credits. It is required for this application to run successfully.
