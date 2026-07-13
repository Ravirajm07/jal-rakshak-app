---
title: "Improve keyboard accessibility for the report evidence upload control"
labels: ["good first issue", "help wanted", "accessibility"]
---

## Background

The report page includes a custom evidence upload area in `src/app/app/report/page.tsx`. It is clickable with a mouse, but the visible custom control should also be comfortable for keyboard and assistive-technology users.

## Scope

Improve the existing upload interaction without changing the report submission flow or adding a real file-upload backend.

## Implementation Guidance

- Review the upload area around the hidden `#evidence-upload` input.
- Make the visible control keyboard reachable and operable.
- Preserve accepted file types and the current local-only mock behavior.
- Add accessible text that makes the control purpose clear.

## Acceptance Criteria

- The upload control can be focused with the keyboard.
- Pressing Enter or Space opens the file picker.
- Screen-reader text or labels identify the control as an optional evidence upload.
- Existing report form behavior is unchanged.

## Testing Expectations

- Run `npm run lint`.
- Run `npm run typecheck`.
- Manually verify keyboard operation in the browser.
