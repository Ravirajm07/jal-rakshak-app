# 🛠️ Troubleshooting: GitHub Deployment

## Error: Permission Denied (403)
**Error Message:**
> `remote: Permission to Ravirajm07/jal-rakshak-app.git denied to Sanskar-24alt.`

**Cause:**
Your computer is currently logged in to GitHub as user **`Sanskar-24alt`**, but you are trying to push to a repository owned by **`Ravirajm07`**. You interpret this as "Permission Denied" because `Sanskar-24alt` is not a collaborator on `Ravirajm07`'s repo.

## ✅ Solutions

### Option 1: Switch Accounts (Recommended)
You need to sign out of the old account on your machine.
1. Open **Start Menu** and search for **"Credential Manager"**.
2. Click **Windows Credentials**.
3. Look for `git:https://github.com`.
4. Click it and select **Remove**.
5. Go back to your terminal and run:
   ```powershell
   git push -u origin main
   ```
6. A popup will ask you to login. Sign in as **`Ravirajm07`**.

### Option 2: Add Collaborator
If you own both accounts, you can give permission to the current user.
1. Log in to [GitHub.com](https://github.com) as **`Ravirajm07`**.
2. Go to the repository **Settings** > **Collaborators**.
3. Click **Add people** and invite **`Sanskar-24alt`**.
4. Accept the invitation (via email) as `Sanskar-24alt`.
5. Run the push command again.

### Option 3: Force Re-authentication via Terminal
Run this command to clear the cached credential for the current folder:
```powershell
cmdkey /delete:git:https://github.com
```
Then try pushing again.
