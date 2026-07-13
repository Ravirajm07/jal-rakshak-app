# Contributing

Thanks for helping improve JalRakshak. This project is a prototype civic-tech application, so accuracy and safety matter more than broad claims or feature polish.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies with `npm ci`.
3. Copy `.env.example` to `.env.local` and replace placeholders with your own Firebase and MongoDB test project values.
4. Run `npm run dev`.

Use the Firebase Authentication Emulator for local authentication experiments where possible. Do not use real production user accounts in tests or screenshots.

## Quality Checks

Run these before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Pull Request Guidelines

- Keep changes focused and explain the user-visible behavior.
- Add or update tests for logic, validation, routes, or security-sensitive changes.
- Update README or docs when behavior, setup, environment variables, deployment, or limitations change.
- Do not commit secrets, generated debug logs, local `.env*` files, Android build output, or private credentials.
- Avoid claiming official status, live sensor feeds, production security, adoption numbers, or performance metrics unless the code and evidence support them.

## Good First Contributions

Beginner-friendly work is tracked in `docs/BEGINNER_FRIENDLY_ISSUES.md`. Good first issues should be small, reproducible, and include clear acceptance criteria.

## License

By contributing, you agree that your contributions are licensed under the Apache License 2.0.
