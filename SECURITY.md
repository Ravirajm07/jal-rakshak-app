# Security Policy

## Supported Versions

After the initial `v0.1.0` release, security updates are planned for the `0.1.x` release line and the current default branch.

| Version | Supported |
| --- | --- |
| `0.1.x` | Yes, after release |
| Earlier versions | No |

## Responsible Disclosure

Please do not disclose vulnerabilities in public GitHub issues, pull requests, discussions, screenshots, logs, or social posts.

Preferred reporting method:

1. Go to the repository Security tab.
2. Open **Report a vulnerability** / **New security advisory**.
3. Submit the report privately through GitHub private vulnerability reporting.

If private vulnerability reporting is not enabled, use a private maintainer contact path available from GitHub. Do not publish the details publicly while a fix is being prepared.

## What To Include

Please include:

- A concise description of the vulnerability.
- Affected route, component, API, configuration, dependency, or workflow.
- Reproduction steps using local test data, emulators, or a fork.
- Impact and likely severity.
- Whether authentication is required.
- Any relevant logs with secrets and private citizen data removed.
- Dependency advisory links, if applicable.

## Response Goals

These are goals, not guarantees:

- Initial acknowledgement: within 7 days.
- Triage decision: within 14 days.
- Fix or mitigation plan for confirmed high-impact issues: within 30 days when maintainers are available.

The maintainers may need more time for volunteer availability, dependency availability, or coordinated disclosure.

## Scope

In scope:

- Source code in this repository.
- GitHub Actions workflows and repository configuration.
- Documentation that could cause unsafe deployment or credential exposure.
- Dependency vulnerabilities that affect the shipped application.

Out of scope:

- Third-party services not controlled by this repository.
- Denial-of-service testing against public deployments.
- Social engineering, phishing, spam, or physical attacks.
- Issues requiring real citizen data, production credentials, or unauthorized access.
- Vulnerabilities in unofficial forks or modified deployments.

## No Bug Bounty

This project does not currently operate a bug-bounty program. Please do not expect payment, rewards, swag, or compensation for reports.

## Secret Handling

Never commit `.env*` files, service-account JSON, private keys, database URLs, Firebase Admin credentials, Gemini API keys, or demo account passwords. If a secret is committed, revoke or rotate it first, then follow `docs/SECURITY_REMEDIATION.md`.
