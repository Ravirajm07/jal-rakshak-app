# Open Source Readiness Audit

Date: 2026-07-13  
Branch: `chore/open-source-readiness-v0.1.0`  
Repository: `https://github.com/Ravirajm07/jal-rakshak-app`

This audit intentionally omits secret values.

## Baseline Commands

| Command | Result |
| --- | --- |
| `git status --short` | Clean at start of audit |
| `git branch --show-current` | `main` before branch creation |
| `git remote -v` | `origin` points to `https://github.com/Ravirajm07/jal-rakshak-app.git` |
| `node --version` | `v22.16.0` |
| `npm --version` | `10.9.2` |
| `npm ci` | Passed; initially reported 17 vulnerabilities |
| `npm run lint` | Failed before remediation because ESLint scanned generated Android/Next build artifacts |
| `npm run build` | Passed before remediation |

The working tree was clean before creating `chore/open-source-readiness-v0.1.0`.

## Current Architecture Found In Code

- Next.js App Router application under `src/app`.
- Client-side app context in `src/lib/contexts/DataContext.tsx` holds user role, simulated water/alert state, notifications, complaints, and demo mode.
- Firebase Authentication client SDK handles sign-up, sign-in, auth state, and sign-out.
- Next.js route handlers under `src/app/api/complaints` provide complaint list/create/update endpoints.
- MongoDB/Mongoose are used by complaint route handlers through `src/lib/db.ts` and `src/models/Complaint.ts`.
- When MongoDB is unavailable, complaint routes fall back to `src/lib/demo-store.ts`, an in-memory process-local store.
- Browser `localStorage` is used for demo complaint persistence and role/demo state.
- Leaflet/OpenStreetMap renders the map with static sample markers.
- Dashboard, analytics, flood-risk, water-quality, alert, camera, and assistant data are simulated.
- Capacitor Android scaffold exists under `android/`, but normal `npm run build` does not emit the `out/` directory referenced by `capacitor.config.ts`.

## Actual Database and Data Services Used

| Service | Current Use |
| --- | --- |
| Firebase Authentication | Client-side auth for sign-up/sign-in/sign-out |
| Firestore | Not used by runtime application code in v0.1.0 |
| MongoDB | Complaint persistence when `MONGODB_URI` is set and reachable |
| In-memory demo store | Fallback complaint API data when MongoDB is unavailable |
| Browser localStorage | Demo complaints and role/demo-mode state |

The old README described Firestore as the primary database. The actual runtime complaint backend is MongoDB/Mongoose. Firestore rules now deny all access by default because no Firestore data model is active.

## Authentication and Authorization

- `src/app/login/page.tsx` uses Firebase Auth email/password sign-up and sign-in.
- `DataContext` derives the admin role client-side when the user email contains `admin`.
- Demo mode can switch roles in the client UI.
- Protected app routes are redirected client-side from `src/app/app/layout.tsx` when no role is present.
- Complaint API routes do not verify Firebase ID tokens server-side.
- Admin-only actions such as complaint status updates and exports are not protected at the server/database boundary.

Client-side role hiding is not sufficient authorization. Server-side Firebase token verification and admin claims are required before production use.

## AI Integration

- `src/lib/services/gemini.ts` is simulation-only in v0.1.0.
- The tracked Gemini model-list helper containing a private-looking API key was removed from the current tree.
- The settings page no longer asks users to paste a Gemini key into the client.
- Any future live Gemini integration should be implemented server-side with authentication, input validation, abuse prevention, and safe logging.

## Environment Variables Found

Current runtime environment variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_USE_FIREBASE_EMULATOR`
- `MONGODB_URI`

`.env.example` contains only non-working placeholders.

## Documentation Inconsistencies Found

Fixed in this branch:

- Incorrect clone URL and `npm install` setup flow.
- Plaintext demo passwords.
- Firestore-as-primary-database claim.
- MongoDB deployment step presented without explaining MongoDB's actual role.
- Claims of live/official/real-time sensor data beyond what the code supports.
- Gemini API wording implying live AI calls.
- Unsupported Android offline-map claims.
- About page text implying official municipal deployment and v1.0.0 beta status.

## Security Concerns

Fixed in current tree:

- Removed tracked Gemini-key helper script.
- Removed tracked Firebase debug log from Git.
- Removed plaintext demo passwords from README.
- Moved Firebase web configuration into environment variables.
- Added `.gitignore` entries for env files, Firebase debug logs, private keys, and service-account JSON.
- Added complaint create/update validation and mass-assignment rejection.
- Added deny-by-default Firestore rules because Firestore is not active.

Requires maintainer action:

- Revoke or rotate the exposed Gemini API key from history.
- Restrict or rotate Firebase web API keys as appropriate.
- Delete or rotate any real Firebase demo users that used the previously documented passwords.
- Decide whether to rewrite Git history after secret rotation.
- Add server-side Firebase ID-token verification to complaint API routes.
- Implement reliable admin authorization with custom claims or another server-verified role source.
- Add rate limiting and abuse prevention to write routes.
- Review CSP settings; the app currently allows `unsafe-inline` and `unsafe-eval`.
- Review UI patterns such as `dangerouslySetInnerHTML` before accepting untrusted AI/API output.
- Decide whether to keep or revise IP camera URL support because user-entered camera URLs can expose private network endpoints in the browser.

## Secret and Credential Search

Searches covered passwords, API keys, access tokens, private keys, service-account markers, Firebase Admin markers, Gemini keys, MongoDB connection strings, demo accounts, `NEXT_PUBLIC` variables, `.env` files, Firebase debug logs, JSON, TypeScript, JavaScript, and Markdown.

Findings:

- A tracked helper script contained a private-looking Gemini API key.
- README contained plaintext demo email/password combinations.
- `firebase-debug.log` was tracked and contained Firebase CLI diagnostic output.
- Firebase web config was hardcoded in `src/lib/firebase.ts`.
- No service-account JSON, private key block, Firebase Admin credential, or MongoDB connection string was found in the current tracked tree.

History search found API-key-like material and demo passwords in earlier commits. This branch does not rewrite history.

## Dependency and Ownership Review

- Git history currently shows contributions from `Sanskar` and `RAVIRAJ MORE`.
- Copyright is attributed to `JalRakshak contributors`.
- Standard generated project material exists from Next.js, Capacitor, Android/Gradle, and package dependencies.
- No repo-specific third-party NOTICE file was found that needed preservation.
- Installed dependency metadata had no unknown licenses. Notable transitive licenses for maintainer review included `Hippocratic-2.1`, `Apache-2.0 AND LGPL-3.0-or-later`, `Python-2.0`, and `CC-BY-4.0`.

## Test Gaps

Fixed in this branch:

- Added Vitest.
- Added complaint validation tests.
- Added `npm test` and `npm run typecheck` scripts.

Still missing:

- Route-handler tests for `/api/complaints`.
- MongoDB integration tests.
- Firebase Authentication emulator tests.
- Firestore rules tests; current rules deny all because Firestore is unused.
- UI tests for auth routing, role-specific navigation, report creation, and admin update flows.
- Android/Capacitor build tests.

## CI Gaps

Fixed in this branch:

- Added GitHub Actions workflow for `npm ci`, lint, typecheck, tests, and build.
- Adjusted ESLint ignores so generated Android build artifacts are not linted.

Still missing:

- Secret scanning workflow or documented GitHub secret scanning enforcement.
- Dependency review workflow.
- Firebase emulator/rules test workflow.
- Android build workflow.

## Release Blockers

Must be resolved before any production/public-safety use:

- Server-side authorization for complaint APIs.
- Maintainer-led secret revocation/rotation.
- Abuse prevention and rate limiting on write routes.
- Android/Capacitor release strategy.
- Replacement of simulated data with verified data integrations, or explicit continued simulation labeling.

Should be resolved before tagging v0.1.0 if maintainers require a clean security audit:

- Remaining `npm audit` moderate advisory tied to Next.js nested PostCSS metadata. `npm audit fix --force` suggests an unsafe major downgrade path, so it was not applied.

## Fixed Automatically

- Added Apache-2.0 license and package metadata.
- Rewrote README accurately.
- Added security, contribution, support, code-of-conduct, release, and remediation docs.
- Added GitHub Actions CI and issue/PR templates.
- Removed current tracked credential/log exposure.
- Added `.env.example`.
- Added complaint validation and tests.
- Added deny-by-default Firestore rules and Firebase emulator config.
- Reduced dependency audit findings from 17 to 2 moderate findings with non-force updates.

## Requires Maintainer Action

- Rotate/revoke exposed API keys and any reused demo credentials.
- Decide whether to clean Git history and force-push after coordination.
- Enable GitHub private vulnerability reporting, secret scanning, and push protection where available.
- Configure real deployment secrets in Vercel or another secret store.
- Add server-side auth and authorization before production use.
- Decide whether Firestore is intentionally unused or should receive a real data model and rule tests.

## Not Applicable

- Firebase Admin credentials are not present in the current tracked tree.
- Firestore collection permissions for active app data are not applicable because Firestore is not used by runtime code.
- A NOTICE file was not added because no project-specific third-party notice file was found.

## Intentionally Deferred

- Git history rewrite.
- Production RBAC implementation.
- Rate limiting.
- Full MongoDB route integration tests.
- Android release packaging.
- Live Gemini API integration.
- Official sensor, CCTV, alert, or government data integrations.
