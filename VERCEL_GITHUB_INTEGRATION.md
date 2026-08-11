# Vercel GitHub Auto-Deployment Integration

## Problem
Vercel is not automatically deploying when you push to GitHub. The repository is not properly linked with Vercel.

## Root Cause
- Vercel GitHub integration not connected
- Repository not linked to Vercel project
- GitHub permissions not granted to Vercel

## Solution: Connect Vercel to GitHub

### Step 1: Go to Vercel Dashboard

**URL:** https://vercel.com/dashboard

1. Log in to your Vercel account
2. Click on your project: **ZYRO-Electric** or **zyro-electric**

### Step 2: Access Project Settings

1. Click **Settings** tab
2. Scroll down to **Git Repository**
3. Look for section: "Connected Repository" or "Source Control"

### Step 3: Connect GitHub Repository

**If not connected:**

1. Click **Connect Git Repository**
2. Choose **GitHub**
3. Select **Mostafa-SAID7/ZYRO-Electric** repository
4. Authorize Vercel to access your GitHub
5. Grant permissions:
   - ✅ Read repository contents
   - ✅ Write to deployments
   - ✅ Manage pull request checks
   - ✅ Manage checks

### Step 4: Verify Connection

After connecting, you should see:
```
✅ Connected Repository
   Repository: Mostafa-SAID7/ZYRO-Electric
   Branch: main
   Status: Connected
```

### Step 5: Enable Auto-Deployment

1. In **Settings → Git**, find **Auto-deployment**
2. Ensure these are enabled:
   - ✅ **Deploy on push to main** (Production)
   - ✅ **Deploy on pull requests** (Preview)
3. Click **Save**

### Step 6: Configure Production Branch

1. Go to **Settings → Git**
2. Set **Production branch** to: `main`
3. Click **Save**

### Step 7: Configure Preview Branches

1. Set **Preview branches** to trigger on:
   - ✅ All branches (default)
   - ✅ Or specific: `develop`, `feature/**`

## Verify Integration

### Check 1: GitHub Actions Integration

1. Go to your GitHub repo: https://github.com/Mostafa-SAID7/ZYRO-Electric
2. Click **Settings → Installed GitHub Apps**
3. You should see: **Vercel** or **Vercel (prod)**
4. Click **Configure** to verify permissions

### Check 2: Vercel Deployments

1. Go to **Vercel Dashboard → Deployments**
2. You should see deployments triggered by GitHub pushes
3. Look for **Commit** or **GitHub** in deployment source

### Check 3: Test Auto-Deployment

1. Make a small change to `README.md`:
   ```markdown
   # ZYRO - Electric Accessories
   Last deployed: August 11, 2026
   ```

2. Commit and push:
   ```bash
   git add README.md
   git commit -m "test: verify Vercel auto-deployment"
   git push origin main
   ```

3. Check Vercel within 30 seconds:
   - Should see **Building...** status
   - Deployment URL should appear
   - Check **Deployments** tab

## Troubleshooting

### Vercel Not Showing New Deployments

**Check:**
1. Is repository connected? (Settings → Git)
2. Is auto-deployment enabled? (Settings → Git)
3. Is `main` set as production branch? (Settings → Git)
4. Check GitHub Apps permissions (Settings → Installed apps)

**Fix:**
1. Disconnect and reconnect repository
2. Re-authorize Vercel in GitHub
3. Clear Vercel cache and redeploy

### GitHub Actions vs Vercel Deployment

**You have TWO deployment methods:**

**Method 1: Vercel (GitHub Integration)**
- Direct GitHub → Vercel connection
- Auto-triggers on push
- Shows as "Vercel" in deployments
- No secrets needed in GitHub

**Method 2: GitHub Actions (deploy-vercel.yml)**
- Uses GitHub Actions workflow
- Manually triggered or on push
- Uses `VERCEL_TOKEN` secret
- More control, explicit deployment

**Recommended:** Use both!
- Vercel auto-deploys on push (fast)
- GitHub Actions provides backup/control

## Step-by-Step Reconnection

If integration is broken, follow this:

### Complete Disconnect & Reconnect:

1. **Remove from Vercel:**
   - Vercel Dashboard → Settings → Git
   - Click **Disconnect repository**
   - Click **Connect Git Repository**

2. **Remove Vercel App from GitHub:**
   - GitHub → Settings → Applications → Installed GitHub Apps
   - Find **Vercel** (or similar)
   - Click **Uninstall**

3. **Reconnect:**
   - Go to Vercel: https://vercel.com/dashboard
   - Click **New Project**
   - Or edit existing project settings
   - Click **Connect Git Repository**
   - Select **GitHub**
   - Authorize and select **Mostafa-SAID7/ZYRO-Electric**

4. **Verify:**
   - Make a test push
   - Check Vercel deployments page
   - Should see deployment within 1 minute

## Expected Behavior

### After Proper Connection:

**On every push to `main`:**
```
1. GitHub receives push
   ↓
2. Vercel webhook triggered
   ↓
3. Vercel pulls latest code
   ↓
4. Vercel runs: npm run build
   ↓
5. Vercel deploys to production
   ↓
6. Live URL updated
   ↓
7. You see ✅ in Vercel Deployments
```

**Time:** ~2-3 minutes from push to live

### On Pull Requests:

```
1. Pull request created/updated
   ↓
2. Vercel webhook triggered
   ↓
3. Vercel creates preview deployment
   ↓
4. Comment added to PR with preview URL
   ↓
5. Preview live for testing
```

**Time:** ~2-3 minutes

## Production Domain

After connecting, your app should be at:
- **Production:** https://your-vercel-project.vercel.app
- **Preview:** https://your-pr-number.your-project.vercel.app

To see your exact URLs:
1. Go to Vercel Dashboard
2. Click project name
3. See **Production** and **Preview** domains

## Secrets NOT Needed for GitHub Integration

With proper Vercel GitHub integration:
- ❌ **VERCEL_TOKEN** not needed
- ❌ **VERCEL_ORG_ID** not needed  
- ❌ **VERCEL_PROJECT_ID** not needed

These are only needed if using GitHub Actions (deploy-vercel.yml).

## Both Methods Together

**Best Setup:**

1. **Vercel GitHub Integration (Primary)**
   - Auto-deploys on push to main
   - Fast and simple
   - Requires no secrets

2. **GitHub Actions (Secondary)**
   - Provides explicit control
   - Can manual trigger
   - Can deploy to other branches
   - Backup if integration fails

## Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Apps Settings:** https://github.com/settings/installations
- **Your Repo:** https://github.com/Mostafa-SAID7/ZYRO-Electric
- **Vercel Docs:** https://vercel.com/docs/concepts/git/vercel-for-github

## Quick Checklist

- [ ] Log in to Vercel
- [ ] Go to project settings
- [ ] Check "Connected Repository"
- [ ] Verify GitHub integration is active
- [ ] Enable auto-deployment
- [ ] Set production branch to `main`
- [ ] Authorize GitHub permissions
- [ ] Test with a push to main
- [ ] Verify deployment in Vercel
- [ ] Check production URL is live

## Support

If auto-deployment still doesn't work:

1. Check Vercel Deployments log
2. Check GitHub Actions logs
3. Verify GitHub permissions
4. Check Vercel GitHub App is installed
5. See Vercel documentation

---

**Status:** Auto-deployment should be working after connecting GitHub integration.

**Estimated Fix Time:** 5-10 minutes
