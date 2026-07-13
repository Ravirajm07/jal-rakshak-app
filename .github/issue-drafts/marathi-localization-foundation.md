---
title: "Create a small Marathi localization foundation for navigation labels"
labels: ["good first issue", "help wanted", "localization"]
---

## Background

JalRakshak is civic-tech software for local water and flood workflows. A future Marathi localization layer would make the interface more approachable, but the current navigation labels are hardcoded in `src/config/navigation.ts`.

## Scope

Introduce a small, typed localization foundation for navigation labels only. Do not translate the whole app in this issue.

## Implementation Guidance

- Start with English labels as the default.
- Add Marathi label fields or a small translation map for `MAIN_NAV_ITEMS`, `FOOTER_NAV_ITEMS`, and `MOBILE_NAV_ITEMS`.
- Keep existing routes and role filtering unchanged.
- Avoid adding a full i18n framework for this small first step.

## Acceptance Criteria

- Navigation labels can be read from a typed structure.
- Existing English UI behavior remains unchanged.
- The structure can support Marathi labels in a follow-up.

## Testing Expectations

- Run `npm run typecheck`.
- Run `npm run lint`.
