---
title: "Add component tests for NotificationCenter empty and unread states"
labels: ["good first issue", "help wanted", "testing"]
---

## Background

`src/components/ui/NotificationCenter.tsx` renders unread counts, an empty state, and a mark-all-read action. There are currently no component tests for this UI.

## Scope

Add focused tests for NotificationCenter behavior using the existing Vitest and Testing Library setup.

## Implementation Guidance

- Mock `useData` from `src/lib/contexts/DataContext.tsx`.
- Test the empty state.
- Test unread count rendering.
- Test that the mark-all-read action calls the mocked handler.
- Avoid snapshot-only tests.

## Acceptance Criteria

- Tests cover at least empty and unread-notification states.
- Tests do not require Firebase, MongoDB, network calls, or browser notifications.
- Tests are deterministic.

## Testing Expectations

- Run `npm run test`.
- Run `npm run typecheck`.
