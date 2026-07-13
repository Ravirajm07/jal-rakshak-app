---
title: "Expand Firebase Auth Emulator setup documentation"
labels: ["good first issue", "help wanted", "documentation"]
---

## Background

The README mentions the Firebase Authentication Emulator, and `firebase.json` includes emulator ports. New contributors would benefit from a fuller local setup guide.

## Scope

Add a short docs page or expand the README section for local Firebase Auth Emulator use.

## Implementation Guidance

- Use placeholder project IDs only, such as `demo-jalrakshak`.
- Explain `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true`.
- Mention that Firestore is not used by runtime code in v0.1.0.
- Do not include real Firebase project values, account emails, passwords, or API keys.

## Acceptance Criteria

- A new contributor can start the Auth Emulator and sign up locally.
- The docs link to `.env.example`.
- The docs clearly say no production credentials are required.

## Testing Expectations

- Run `npm run lint` if Markdown linting is added later; otherwise manually verify commands.
- Confirm no secrets or real project IDs appear in the documentation.
