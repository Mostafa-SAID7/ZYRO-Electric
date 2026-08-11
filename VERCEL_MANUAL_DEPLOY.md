# Manual Vercel Deployment Guide

## Current Setup

You have GitHub Actions workflow that can manually or automatically deploy to Vercel.

**File:** `.github/workflows/deploy-vercel.yml`

**Triggers:**
- ✅ Push to `main` branch
- ✅ Push to `develop` branch
- ✅ Manual trigger via GitHub Actions
- ✅ Version tags (v1.0.7, etc.)

## How to Deploy

### Method 1: Automatic (Push to main)

```bash
# Make your changes
git add .
git commit -m "feat: add new features"

# Push to main
git push origin main

# Workflow automatically deploys
# Check: https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
```

**Result:** 
- ✅ Deployment starts in GitHub Actions
- ✅ Vercel gets deployed via CLI
- ✅ Live update in ~3-5 minutes

### Method 2: Manual Trigger via GitHub

1. Go to **Actions** tab: https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
2. Select **Deploy to Vercel** workflow
3. Click **Run workflow**
4. Select branch (main, develop, etc.)
5. Click **Run workflow**
6. Watch deployment progress

**Result:**
- ✅ Deployment triggered immediately
- ✅ No need to push code
- ✅ Useful for re-deploying same code

### Method 3: Direct Vercel CLI

If you have Vercel CLI installed locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel deploy --prod --token=YOUR_VERCEL_TOKEN
```

**Setup:**
1. Get token from: https://vercel.com/account/tokens
2. Set environment variables:
   ```bash
   export VERCEL_TOKEN=your_token_here
   export VERCEL_ORG_ID=your_org_id
   export VERCEL_PROJECT_ID=your_project_id
   ```
3. Deploy:
   ```bash
   vercel deploy --prod
   ```

## Vercel Secrets Status

Your GitHub secrets are configured:
- ✅ **VERCEL_TOKEN** - Set
- ✅ **VERCEL_ORG_ID** - Set (team_qtHEfgqPZSTu1viXoTU6aHrE)
- ✅ **VERCEL_PROJECT_ID** - Set (prj_3sHIHjO98w2aqnA4F7oukalspGRg)

These enable GitHub Actions to deploy to Vercel.

## Deployment Types

### Production Deployment
```
✅ Pushed to: main branch
✅ Result: Live URL updated
✅ Traffic: All users see new version
✅ Rollback: Can redeploy previous commit
```

### Preview Deployment
```
✅ Created: Pull requests
✅ Result: Temporary URL for testing
✅ Traffic: Only for testing
✅ Cleanup: Removed when PR closed
```

### Manual Deployment
```
✅ Triggered: Via GitHub Actions UI
✅ Result: Deploy without pushing
✅ Useful: For rollbacks or re-deploys
✅ Time: ~3-5 minutes
```

## Checking Deployment Status

### In GitHub Actions

1. Go to: https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
2. Select **Deploy to Vercel**
3. View latest run
4. Check steps:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build application
   - ✅ Deploy to Vercel

### In Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click **ZYRO-Electric** project
3. View **Deployments** tab
4. See latest deployment status
5. Click deployment to see details

### Checking Production URL

After deployment, visit:
- **Your project URL:** Check Vercel dashboard for exact URL
- Should show latest version
- Check browser console for any errors

## Troubleshooting Deployments

### Deployment Failed in GitHub Actions

1. Click failed workflow run
2. Expand **Deploy to Vercel** step
3. Check error message
4. Common issues:
   - ❌ `VERCEL_TOKEN` not set
   - ❌ `npm run build` failed
   - ❌ Network error
   - ❌ Build takes too long (>12 min timeout)

**Fix:**
```bash
# Verify secrets exist
# Then re-run workflow
```

### Build Failed

```
Error: Cannot find module @angular-devkit/...
```

**Fix:**
```bash
# Reinstall dependencies
npm install --legacy-peer-deps

# Try build locally
npm run build

# If works locally, push code
git add .
git commit -m "fix: dependencies"
git push origin main
```

### Deployment Timeout

Build takes longer than GitHub Actions timeout (12 minutes).

**Fix:**
1. Optimize Angular build
2. Check for large assets
3. Verify node_modules size
4. Check vercel.json for build command

### Vercel Secrets Missing

```
⚠️ Vercel secrets not configured - deployment skipped
```

**Fix:**
1. Go to: https://github.com/Mostafa-SAID7/ZYRO-Electric/settings/secrets/actions
2. Add secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## Deployment Pipeline

```
Code Push
   ↓
GitHub Actions Triggered
   ↓
Checkout Repository
   ↓
Setup Node.js 22.x
   ↓
Install Dependencies
   ↓
npm run build (Angular compilation)
   ↓
Vercel Deploy (CLI)
   ↓
Production Update
   ↓
URL Live
```

**Total Time:** ~5-7 minutes

## Production Checklist Before Deployment

- [ ] Code tested locally
- [ ] No console errors
- [ ] Build completes: `npm run build`
- [ ] All dependencies installed
- [ ] Environment variables correct
- [ ] Database connections work
- [ ] API endpoints respond
- [ ] No breaking changes

## After Deployment

1. **Verify:** Visit production URL
2. **Check:** No console errors
3. **Test:** Key features working
4. **Monitor:** Check Vercel logs
5. **Alert:** Notify team if issues

## Rollback

If deployment causes issues:

### Quick Rollback (Redeploy Previous)

1. Go to Vercel Deployments
2. Click previous working deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache**
5. Deployment starts
6. ~1 minute later, reverted

### Via GitHub Actions

1. Go to Actions
2. Trigger Deploy to Vercel manually
3. Select branch with working code
4. Redeploy

### Via Git Revert

```bash
# Find bad commit
git log --oneline

# Revert to previous commit
git revert <commit-hash>
git push origin main

# Deployment happens automatically
```

## Production URLs

### Main Production
- **URL:** See Vercel dashboard
- **Status:** Current live version
- **Build:** Latest from main branch

### Preview URLs
- Created for pull requests
- Format: `https://pr-xxx-project.vercel.app`
- Automatic cleanup after PR closed

## Monitoring Deployments

### Vercel Logs
1. Vercel Dashboard
2. Select deployment
3. Click **Logs**
4. See build and runtime logs

### GitHub Actions Logs
1. Actions tab
2. Select workflow run
3. Expand each step
4. See console output

### Application Logs
In production:
- Browser console (F12)
- Network tab for API calls
- Check for errors/warnings

## Deployment Frequency

**Recommended:**
- Small fixes: Deploy after testing
- Features: Deploy after code review
- Hotfixes: Deploy immediately
- Releases: Deploy with version bump

**Your Current Setup:**
- Auto-deploys on push to main
- Manual trigger available
- ~3-5 minutes per deployment

## Advanced: Custom Build Configuration

Edit `vercel.json` to customize:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/market",
  "nodeVersion": "22.x",
  "env": {
    "NODE_ENV": "production"
  }
}
```

Current configuration is optimal for Angular.

## Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Actions:** https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
- **Deployments:** https://github.com/Mostafa-SAID7/ZYRO-Electric/deployments
- **Production URL:** Check Vercel dashboard

---

**Last Updated:** August 11, 2026
**Status:** Ready for Production ✅
