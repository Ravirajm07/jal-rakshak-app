# Security Remediation Guide

This guide records maintainer actions required after credential-like material has appeared in tracked files or Git history.

Do not post secret values in issues, pull requests, release notes, screenshots, or commit messages.

## Immediate Actions

1. Revoke or rotate any Gemini API key that was committed in `list_models.js`.
2. Review the Firebase project referenced by the previous hardcoded web config and restrict API-key usage to the expected domains/apps.
3. Delete or rotate any Firebase Authentication demo users that reused the previously documented demo passwords.
4. Confirm no service-account JSON, Firebase Admin private key, MongoDB password, or production `.env` file has been committed.
5. Invalidate any exposed local credentials from `firebase-debug.log` if the Firebase CLI session is still active.

## Current Tree Remediation

The v0.1.0 readiness changes remove:

- `list_models.js`, which contained a Gemini API key.
- `gemini_models.json`, a stale generated model-list artifact.
- `firebase-debug.log`, a generated Firebase CLI debug log.
- Plaintext demo passwords from README content.
- Hardcoded Firebase web config from source code.

## Git History Cleanup

History rewrite is disruptive for collaborators and forks. Do not force-push without explicit maintainer approval and coordination.

Recommended process after secrets are revoked:

1. Announce a maintenance window to collaborators.
2. Create a fresh mirror clone:

   ```bash
   git clone --mirror https://github.com/Ravirajm07/jal-rakshak-app.git
   cd jal-rakshak-app.git
   ```

3. Use `git filter-repo` or BFG Repo-Cleaner to remove the affected paths and secret strings.

   Example with `git filter-repo` for removed helper/log files:

   ```bash
   git filter-repo --path list_models.js --path gemini_models.json --path firebase-debug.log --invert-paths
   ```

4. Run a secret scanner against the rewritten mirror.
5. Force-push only after maintainer approval:

   ```bash
   git push --force --mirror
   ```

6. Ask all contributors to reclone or carefully reset local branches after the rewrite.

## Verification Checklist

- `git grep` finds no private API keys, passwords, service-account JSON, or database URLs.
- `.env.example` contains only non-working placeholders.
- GitHub secret scanning and push protection are enabled where available.
- Firebase and Gemini keys have application restrictions.
- Production credentials are stored only in the hosting provider or secret manager.
