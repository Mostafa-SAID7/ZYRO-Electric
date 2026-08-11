# 🚀 ZYRO Deployment Checklist - Complete Setup Guide

## Current Status

✅ **Code**: Ready for deployment  
✅ **Build**: Working (Angular 18.2.0)  
✅ **Docker**: Optimized (Node 22.22.3, npm ci)  
✅ **npm Publish**: Fixed (version 1.0.6)  
⏳ **Vercel Deploy**: Waiting for secrets  

---

## Why Vercel Shows "Old Deploy"

Your Vercel dashboard shows the old deployment because:

1. **GitHub workflow has secret check**: `if: secrets.VERCEL_TOKEN != ''`
2. **No secrets configured yet** → Condition = FALSE
3. **Deployment step is SKIPPED** → Vercel not updated
4. **Old deployment remains active**

**Once you add secrets → Next push auto-deploys new version**

---

## ✅ Step-by-Step Deployment Setup

### Phase 1: Add GitHub Secrets (Required for Vercel Deploy)

#### Step 1: Get Vercel Credentials

**Get VERCEL_TOKEN:**
- Visit: https://vercel.com/account/tokens
- Click "Create Token"
- Name: `GitHub Actions ZYRO`
- Expiration: "No expiration" (recommended for CI/CD)
- Click "Create"
- **COPY the token** (shown only once!)

**Get VERCEL_ORG_ID:**
- Visit: https://vercel.com/account/settings
- Find "Organization ID" or "Team ID"
- **COPY this ID**

**Get VERCEL_PROJECT_ID:**
- Visit your Vercel project dashboard
- Go to "Settings" tab
- Find "Project ID"
- **COPY this ID**

#### Step 2: Add Secrets to GitHub

**Option A: Via GitHub Web UI (Easiest)**

1. Go to your GitHub repository
2. Click **Settings** (top menu bar)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions**
5. Click **"New repository secret"** button
6. Fill in:
   ```
   Name: VERCEL_TOKEN
   Value: [paste from Step 1]
   ```
7. Click **"Add secret"**

Repeat steps 5-7 for:
   - `VERCEL_ORG_ID` (value from Step 1)
   - `VERCEL_PROJECT_ID` (value from Step 1)

**Option B: Via GitHub CLI**

```bash
gh secret set VERCEL_TOKEN --body "your-token-here"
gh secret set VERCEL_ORG_ID --body "your-org-id-here"
gh secret set VERCEL_PROJECT_ID --body "your-project-id-here"
```

#### Step 3: Verify Secrets Added

Go to GitHub repo > Settings > Secrets and variables > Actions

You should see:
- ✓ VERCEL_TOKEN
- ✓ VERCEL_ORG_ID
- ✓ VERCEL_PROJECT_ID

(Values are masked for security)

---

### Phase 2: Trigger Deployment

#### Option A: Automatic (Recommended)

Any push to `main` branch triggers auto-deployment:

```bash
git push origin main
```

#### Option B: Manual Trigger

1. Go to GitHub repo
2. Click **Actions** tab
3. Click **"Deploy to Vercel"** workflow
4. Click **"Run workflow"** button
5. Select branch: `main`
6. Click **"Run workflow"**

#### Option C: Create a Release

```bash
git tag v1.0.6
git push origin v1.0.6
```

This also triggers deployment.

---

### Phase 3: Monitor Deployment

#### Check GitHub Actions

1. Go to your GitHub repository
2. Click **Actions** tab
3. Look for "Deploy to Vercel" workflow
4. Click to see live logs
5. Watch for:
   - ✅ "Checkout code"
   - ✅ "Setup Node.js"
   - ✅ "Install dependencies"
   - ✅ "Build application"
   - ✅ "Deploy to Vercel (Production)"
   - ✅ "Deployment status"

#### Check Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click on ZYRO project
3. Watch for new deployment in "Deployments" tab
4. Status should show:
   - Building... → Ready ✓
   - URL: `https://zyro-electric.vercel.app`

#### Check Your App

Visit: https://zyro-electric.vercel.app

Verify you see:
- New product data (45 products from 9 niches)
- Correct styling
- No errors in console

---

## 🧪 Deployment Workflow Details

### What Happens on Each Push to `main`

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Step 1: Checkout code ✓
Step 2: Setup Node 22.x ✓
Step 3: Install npm dependencies ✓
Step 4: Build Angular app (npm run build) ✓
Step 5: Check if VERCEL_TOKEN exists
    │
    ├─ If NO: Skip deployment, show warning
    │   "Vercel secrets not configured"
    │
    └─ If YES: Deploy to Vercel
        ├─ npm install -g vercel
        ├─ vercel deploy --prod
        └─ New version live! ✓
Step 6: Post deployment status
    ↓
Done!
```

### What Happens on Pull Request

```
Create PR to main
    ↓
GitHub Actions triggered
    ↓
Same build steps (1-4)
    ↓
Step 5: Deploy Preview (if secrets exist)
    ├─ Creates temporary preview URL
    ├─ Shows in PR as comment
    └─ Reviewers can test changes
    ↓
Done!
```

---

## 📊 Current Deployments

### Package Publishing (npm)

**Workflow**: `publish-packages.yml`

Triggers on: Push to main, tags, releases

What it does:
1. Checks for version changes
2. Builds and tests package
3. Publishes to: https://npm.pkg.github.com

**Status**: ✅ Ready
- Latest version: 1.0.6 (just bumped)
- Will publish on next push

### Docker Image Building

**Workflow**: `build-docker.yml`

Triggers on: Push to main, tags, releases

What it does:
1. Builds production image: `msaid356/zyro-electric:latest`
2. Builds dev image: `msaid356/zyro-electric:dev`
3. (Optional: push to Docker Hub if credentials configured)

**Status**: ✅ Ready
- Production image: ~60MB
- Dev image: ~700MB

### Vercel Deployment

**Workflow**: `deploy-vercel.yml`

Triggers on: Push to main, PR to main

What it does:
1. Build Angular app
2. Deploy to Vercel production
3. Create preview URLs for PRs

**Status**: ⏳ Waiting for secrets
- Will auto-deploy once secrets added
- Main: Production deployment
- PR: Preview deployment

---

## 🔄 Full CI/CD Pipeline Overview

```
┌─────────────────────────────────────────────────┐
│           You: git push origin main             │
└──────────────────┬──────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         ↓                   ↓
    ┌─────────┐          ┌──────────┐
    │ GitHub  │          │  GitHub  │
    │ Actions │          │ Actions  │
    └────┬────┘          └────┬─────┘
         │                    │
    ┌────▼──────┐        ┌────▼────────┐
    │   Build   │        │  Publish    │
    │   Check   │        │  npm pkg    │
    │   Lint    │        │  @v1.0.6    │
    │   Tests   │        │             │
    └────┬──────┘        └────┬────────┘
         │                    │
         ▼                    ▼
    ┌──────────────────────────────────┐
    │   Build Docker Images            │
    │ • msaid356/zyro:latest (60MB)    │
    │ • msaid356/zyro:dev (700MB)      │
    └────────────┬─────────────────────┘
                 │
    ┌────────────▼──────────────┐
    │   Deploy to Vercel (if    │
    │   secrets configured)     │
    │                           │
    │ ✓ Production: main branch │
    │ ✓ Preview: PRs           │
    └─────────────┬────────────┘
                  │
                  ▼
        ┌──────────────────┐
        │ LIVE! 🚀         │
        │ zyro-electric    │
        │ .vercel.app      │
        └──────────────────┘
```

---

## 🔐 Secrets Reference

### Required Secrets

| Secret Name | Where to Get | Used By |
|-------------|-------------|---------|
| `VERCEL_TOKEN` | vercel.com/account/tokens | Vercel CLI deploy |
| `VERCEL_ORG_ID` | vercel.com/account/settings | Vercel project lookup |
| `VERCEL_PROJECT_ID` | Vercel project settings | Vercel project deploy |

### Already Configured Secrets

| Secret Name | Used By | Status |
|-------------|---------|--------|
| `GITHUB_TOKEN` | GitHub Actions | ✅ Auto-provided |
| `NPM_TOKEN` | npm publish | ✅ Configure per your needs |

---

## 🚨 Troubleshooting

### "Deployment still shows old version"

**Cause**: Secrets not added yet

**Fix**:
1. Add 3 secrets to GitHub (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
2. Push a new commit: `git push origin main`
3. Check GitHub Actions for deployment logs
4. Verify Vercel dashboard shows new deployment

### "npm publish still fails with 409"

**Cause**: Running workflow with old version number

**Fix**:
1. Version bumped to 1.0.6
2. Next workflow run publishes successfully
3. No action needed - wait for next push

### "GitHub Actions workflow fails"

**Check**:
1. Click Actions > Deploy to Vercel > Latest run
2. Look for red ✗ step
3. Click that step for detailed error logs
4. Common issues:
   - Missing secrets (fix: add to GitHub)
   - Build failed (fix: check build logs, npm install)
   - Vercel API error (fix: verify org/project IDs are correct)

### "Build takes too long"

**Check**: node_modules layer caching

Docker now uses `npm ci` which is faster than `npm install` on subsequent builds because it respects package-lock.json exactly.

---

## 📈 After Deployment Success

### Verify Live Deployment

1. **Check Vercel URL**: https://zyro-electric.vercel.app
2. **Check Product Data**: Should see 45 products from 9 niches
3. **Check Console**: No errors
4. **Test Features**: 
   - Browse products
   - Filter by niche
   - Add to cart
   - View details

### Monitor Performance

1. Go to Vercel dashboard
2. Click "Analytics" tab
3. Watch Core Web Vitals
4. Monitor deployment health

### Create Production Release

```bash
git tag v1.0.6
git push origin v1.0.6
```

---

## 🎯 Next Steps

### Immediate (Required)

1. ✅ Add 3 Vercel secrets to GitHub
2. ✅ Push a commit to main
3. ✅ Verify deployment in Actions tab
4. ✅ Test live app

### Optional (Nice to Have)

1. Setup Docker Hub credentials for image pushing
2. Configure npm token for private packages
3. Setup GitHub Pages for documentation
4. Configure monitoring/alerts

---

## Quick Reference

**Add Secrets**: GitHub > Settings > Secrets and variables > Actions  
**Monitor Deploy**: GitHub > Actions > Deploy to Vercel  
**View Live App**: https://zyro-electric.vercel.app  
**Vercel Dashboard**: https://vercel.com/dashboard  
**GitHub Repo**: https://github.com/Mostafa-SAID7/ZYRO-Electric

---

## Summary

| Component | Status | Action |
|-----------|--------|--------|
| Code ready | ✅ | None |
| Build ready | ✅ | None |
| Docker ready | ✅ | None |
| npm publish ready | ✅ | None |
| Vercel deploy ready | ⏳ | **Add 3 secrets** |
| Live app | 🔴 | After secrets + push |

**Blocker**: GitHub secrets not configured  
**Solution**: Follow Phase 1 above  
**Time to deploy**: ~5 minutes to add secrets, then auto-deploys on next push  

---

**Everything is ready. You just need to add the secrets!** 🚀

