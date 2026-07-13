# Contributing

Thanks for helping improve JalRakshak. This is a prototype civic-tech project, so contributions should be accurate, testable, and careful about public-safety language.

## Project Scope

JalRakshak explores water-quality views, flood-risk indicators, sanitation reporting, citizen alerts, and administrative complaint workflows. Current sensor, CCTV, alert, and assistant data may be simulated. Do not describe the project as official, production-grade, or suitable for emergency decisions unless that is backed by code and evidence.

## Expected Behavior

- Be respectful and constructive.
- Keep public-safety and security claims conservative.
- Protect private data and credentials.
- Ask for clarification when a change could alter architecture, security, or deployment assumptions.

## Development Setup

1. Fork and clone the repository.
2. Use Node.js 20.9.0 or newer. Node.js 22 is used in CI.
3. Install dependencies:

   ```bash
   npm ci
   ```

4. Copy `.env.example` to `.env.local` and replace placeholders with your own local or emulator values.
5. Start the development server:

   ```bash
   npm run dev
   ```

## Environment Configuration

- Use Firebase Authentication Emulator where possible for local auth testing.
- Use a local or disposable MongoDB database for complaint persistence testing.
- Do not use production citizen data, production Firebase users, production database URLs, Gemini keys, service-account JSON, or private credentials.
- Keep `.env.example` as placeholders only.

## Branch Naming

Use concise branch names:

- `docs/readme-installation`
- `test/complaint-validation`
- `fix/report-empty-state`
- `feat/marathi-localization-foundation`

## Choosing Issues

For first contributions:

1. Pick an issue labeled `good first issue` and `help wanted`.
2. Comment that you would like to work on it.
3. Wait for maintainer confirmation if the issue is already active.
4. Keep the pull request scoped to the issue.

Good first issue drafts live in `.github/issue-drafts/` before maintainers publish them.

## Coding Standards

- Prefer TypeScript types over `any`.
- Keep utility logic small and testable.
- Avoid broad `eslint-disable`, `@ts-ignore`, skipped tests, and silent catch blocks.
- Do not introduce new frameworks or services without a clear reason.
- Keep generated files, build output, logs, and caches out of Git.

## Required Checks

Run these before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run check` runs the same sequence.

## Tests

Add or update tests for validation logic, utilities, route boundaries, security-sensitive behavior, and user-visible flows. Tests must not connect to real Firebase, MongoDB, Gemini, production endpoints, or private services.

## Commits

Use clear, scoped commit messages when practical:

- `docs: correct Firebase setup instructions`
- `test: add complaint validation coverage`
- `fix: escape complaint CSV export`

Do not include secrets or vulnerability details in commit messages.

## Pull Request Checklist

- The change is scoped and explained.
- Required checks pass locally.
- Tests were added or updated when behavior changed.
- Documentation was updated when setup, architecture, security, or deployment changed.
- No secrets, `.env*` files, debug logs, generated Android builds, or private data are committed.
- Public-safety, security, performance, adoption, and release claims are evidence-backed.

## Documentation Requirements

Update README or docs when changing:

- environment variables
- Firebase/Auth behavior
- MongoDB complaint persistence
- deployment steps
- testing commands
- Android/Capacitor behavior
- security limitations
- simulated versus live data behavior

## Security Reporting Rules

Do not report vulnerabilities in public issues or pull requests. Follow `SECURITY.md`. Remove secrets, tokens, private citizen data, screenshots with credentials, and exploit payloads before sharing logs privately.

## Contributor Licensing

By contributing, you agree that your contribution is submitted under the Apache License 2.0 and can be included in this project under that license.
