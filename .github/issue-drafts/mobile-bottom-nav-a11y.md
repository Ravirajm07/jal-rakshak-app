---
title: "Improve mobile bottom navigation accessibility labels"
labels: ["good first issue", "help wanted", "mobile"]
---

## Background

The mobile bottom navigation in `src/components/layout/BottomNav.tsx` renders icon-and-text links. It can be improved with clearer active-state semantics for assistive technologies.

## Scope

Improve accessibility attributes for the existing bottom navigation. Do not redesign the navigation or change available routes.

## Implementation Guidance

- Add `aria-current="page"` to the active link.
- Ensure each link has clear accessible text.
- Keep role-based filtering unchanged.
- Check that active styling still works.

## Acceptance Criteria

- The active mobile nav item exposes `aria-current="page"`.
- All nav links remain keyboard accessible.
- No visual regression to desktop navigation.

## Testing Expectations

- Run `npm run lint`.
- Run `npm run typecheck`.
- Manually verify navigation with keyboard focus in a narrow viewport.
