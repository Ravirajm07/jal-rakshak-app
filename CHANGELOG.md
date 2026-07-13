# Changelog

All notable project changes should be documented in this file.

## 0.1.0 - 2026-07-13

Initial public open-source readiness release preparation.

### Added

- Apache-2.0 license and community-health documentation.
- Security policy, contribution guide, support note, issue templates, pull request template, and CI workflow.
- Environment example for Firebase Auth and MongoDB configuration.
- Complaint payload validation and unit tests.
- Firebase emulator configuration scaffold and deny-by-default Firestore rules.

### Changed

- README rewritten to match the current prototype architecture.
- Firebase web configuration moved out of source code and into `NEXT_PUBLIC_FIREBASE_*` variables.
- AI assistant documented and presented as simulation-only in this release.
- Dependency baseline updated with non-force audit fixes where practical.

### Removed

- Plaintext demo passwords from tracked documentation.
- Tracked Firebase debug log.
- Tracked helper files containing or derived from private Gemini API usage.

### Known Limitations

- Complaint API routes do not yet verify Firebase ID tokens server-side.
- Administrator authorization is not enforced at the server/database boundary.
- Firestore is not used by the app; rules deny all reads and writes.
- Android/Capacitor packaging requires a static-export or hosted-web strategy before release builds are reliable.
- `npm audit` still reports a moderate advisory in Next.js' nested PostCSS dependency metadata; see the readiness audit.
