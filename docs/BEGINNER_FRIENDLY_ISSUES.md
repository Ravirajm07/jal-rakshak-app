# Beginner-Friendly Issue Drafts

These drafts can be copied into GitHub issues after the v0.1.0 readiness branch is opened. They are scoped for first-time contributors and avoid security-sensitive credentials or production claims.

## 1. Replace Hardcoded Profile Placeholder Text

Labels: `good first issue`, `frontend`, `documentation`

The profile page currently displays placeholder values such as a static name, phone number, and location. Update the page so it clearly shows placeholder/demo state when no authenticated profile data is available.

Acceptance criteria:
- No fake personal phone number is shown.
- The page uses the current Firebase user display name or email when available.
- Empty states are clear and do not imply verified identity.
- `npm run lint` and `npm run typecheck` pass.

## 2. Improve Complaint Table Empty States

Labels: `good first issue`, `frontend`

The complaint management screens should have clearer empty states when there are no complaints or filters return no results.

Acceptance criteria:
- Empty states explain whether there are no complaints or no filter matches.
- Layout remains usable on mobile and desktop.
- No new external dependencies are added.
- `npm run lint` passes.

## 3. Document Firebase Auth Emulator Setup With Screenshots-Free Steps

Labels: `good first issue`, `documentation`

Expand the README or a new docs page with a short Firebase Authentication Emulator setup flow for local development.

Acceptance criteria:
- Uses placeholders and local emulator values only.
- Does not include real Firebase project IDs, API keys, accounts, or passwords.
- Explains `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true`.
- Links back to `.env.example`.

## 4. Add Tests for DemoStore Behavior

Labels: `good first issue`, `tests`

Add unit tests for `src/lib/demo-store.ts` to verify that demo complaints can be listed, added, and updated.

Acceptance criteria:
- Tests do not require MongoDB or Firebase.
- Tests are deterministic and do not depend on test order.
- `npm test` passes.

## 5. Replace Garbled Characters in User-Facing Labels

Labels: `good first issue`, `frontend`, `accessibility`

Some UI text contains mojibake characters from earlier emoji encoding. Replace those labels with clear ASCII text or properly encoded accessible labels.

Acceptance criteria:
- User-facing labels are readable in source and browser.
- Buttons and links remain understandable without emoji.
- `npm run lint` passes.

## 6. Add a Server-Side Auth Design Doc

Labels: `good first issue`, `documentation`, `security`

Write a short design document describing how Firebase ID-token verification and admin claims should protect the MongoDB complaint API routes.

Acceptance criteria:
- No implementation required.
- Explains citizen versus admin permissions.
- Notes that client-side role switching is not a security boundary.
- Does not include service-account credentials.
