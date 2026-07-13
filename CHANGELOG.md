# Changelog

All notable changes to this project are documented in this file.

This project follows Keep a Changelog-style headings and uses semantic versioning for public releases.

## [Unreleased]

### Added

- No unreleased changes yet.

## [0.1.0] - 2026-07-13

### Added

- Apache-2.0 license and package license metadata.
- Security policy, contribution guide, code of conduct, support note, CODEOWNERS, pull request template, issue templates, and issue drafts.
- GitHub Actions CI, CodeQL workflow, dependency review workflow, and Dependabot configuration.
- `.env.example` with placeholder-only Firebase Auth and MongoDB variables.
- Firebase emulator configuration and deny-by-default Firestore rules.
- Vitest test stack with Testing Library, jsdom, jest-dom, user-event, and v8 coverage support.
- Tests for complaint validation, water/flood classification, and complaint CSV export escaping.
- v0.1.0 release notes and open-source readiness audit.

### Changed

- README rewritten to match the current source code and setup flow.
- Node.js prerequisite corrected to Next.js 16.2.10's `node >=20.9.0` engine requirement.
- Firebase web configuration moved from source code to environment variables.
- AI assistant documentation and UI text clarified as simulation-only for this release.
- Complaint create/update routes now validate supported fields and reject malformed payloads before persistence or demo fallback.
- CSV export now uses shared escaping logic.
- Dependency baseline updated with safe non-breaking fixes where practical.

### Removed

- Plaintext demo passwords from tracked documentation.
- Tracked Firebase debug log.
- Tracked helper/model files containing or derived from private Gemini API usage.
- Public client-side Gemini API-key entry UI.

### Known Limitations

- Complaint API routes do not yet verify Firebase ID tokens server-side.
- Administrator authorization is not enforced at the server/database boundary.
- Firestore is not used by runtime app code; included rules deny all reads and writes.
- Android/Capacitor packaging remains experimental until a static-export or hosted-web strategy is chosen.
- `npm audit` still reports two moderate findings tied to Next.js' nested PostCSS dependency metadata; npm's suggested remediation is an unsafe major downgrade path.
