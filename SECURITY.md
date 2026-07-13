# Security Policy

## Supported Versions

JalRakshak is preparing an initial public `v0.1.0` prototype release. Only the current default branch and the latest tagged `0.x` release are expected to receive security fixes.

## Reporting a Vulnerability

Please report suspected vulnerabilities privately to the repository maintainers using GitHub private vulnerability reporting, if enabled for the repository. If private vulnerability reporting is not enabled, contact the maintainer through a private channel before opening a public issue.

Do not include secrets, exploit payloads, private user data, or production credentials in public issues, pull requests, screenshots, logs, or discussions.

## What To Include

- A short description of the issue and affected route, component, or configuration.
- Steps to reproduce using local test data or emulators.
- The impact and whether authentication is required.
- Any relevant dependency advisory links.

## Current Security Limitations

- Server-side Firebase ID-token verification is not implemented for the complaint API.
- Administrator authorization is currently derived in the client UI from account state and demo mode; it is not sufficient as a production authorization boundary.
- Firestore rules deny all reads and writes because Firestore is not currently used by the app.
- MongoDB-backed complaint routes require additional authentication, authorization, abuse prevention, and rate limiting before production use.
- The AI assistant is simulation-only in `v0.1.0`; do not paste private AI API keys into client-side code or forms.

## Secret Handling

Never commit `.env*` files, service-account JSON, private keys, database URLs, Firebase Admin credentials, Gemini API keys, or demo account passwords. If a secret is committed, revoke or rotate it first, then follow the remediation guidance in `docs/SECURITY_REMEDIATION.md`.
