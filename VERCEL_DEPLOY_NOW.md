# 🚀 Quick Start: Enable Vercel Auto-Deploy (2 Minutes)

## Step 1: Get Vercel Credentials (1 minute)

### VERCEL_TOKEN
- Go to: https://vercel.com/account/tokens
- Click "Create Token"
- Name: `GitHub Actions`
- Expiration: "No expiration"
- Click "Create"
- **COPY the token** (shows only once!)

### VERCEL_ORG_ID
- Go to: https://vercel.com/account/settings
- Find "Organization ID" 
- **COPY it**

### VERCEL_PROJECT_ID
- Go to your Vercel project
- Click "Settings"
- Find "Project ID"
- **COPY it**

---

## Step 2: Add Secrets to GitHub (1 minute)

1. Go to your GitHub repo: https://github.com/Mostafa-SAID7/ZYRO-Electric
2. Click **Settings** (top menu)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions**
5. Click **"New repository secret"**

### Add First Secret

**Name:** `VERCEL_TOKEN`  
**Value:** (paste from Step 1)  
Click "Add secret"

### Add Second Secret

**Name:** `VERCEL_ORG_ID`  
**Value:** (paste from Step 1)  
Click "Add secret"

### Add Third Secret

**Name:** `VERCEL_PROJECT_ID`  
**Value:** (paste from Step 1)  
Click "Add secret"

---

## Step 3: Trigger Deployment (Automatic)

After adding secrets, **the next push automatically deploys**:

```bash
git push origin main
```

Or manually trigger:

1. Go to GitHub repo
2. Click **Actions** tab
3. Click **"Deploy to Vercel"** workflow
4. Click **"Run workflow"**
5. Select branch: `main`
6. Click **"Run workflow"**

---

## Step 4: Verify Deployment

### Check GitHub Actions
1. Go to **Actions** tab
2. Click **"Deploy to Vercel"** workflow
3. Watch for ✅ checkmarks on all steps
4. Look for: "✅ Vercel secrets configured - deployment executed"

### Check Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Click your ZYRO project
3. Look for new deployment
4. Status should change: Building → Ready ✓

### Visit Live App
- **Old URL** (will update): https://zyro-electric.vercel.app
- Should now show:
  - 45 products (9 niches)
  - New deployment timestamp
  - All features working

---

## What Happens After Secrets Are Added

### Automatic Deployment

**Every push to main:**
```
git push
    ↓
GitHub Actions triggered
    ↓
Build Angular app
    ↓
Vercel CLI detects secrets exist
    ↓
Deploys to zyro-electric.vercel.app
    ↓
Old version replaced ✓
```

### Preview Deployments

**Every pull request:**
```
Create PR
    ↓
GitHub Actions triggered
    ↓
Build app
    ↓
Deploy preview to Vercel
    ↓
Preview URL in PR comments
    ↓
Reviewers can test
```

---

## Troubleshooting

### Still shows old version after adding secrets

**Check:**
1. Secrets were added correctly (go to Settings > Secrets to verify)
2. Triggered new workflow run (push or manual trigger)
3. Wait 3-5 minutes for deployment to complete

**If still old:**
1. Go to GitHub Actions > Deploy to Vercel
2. Check logs for errors
3. Look for "✅ Vercel secrets configured" message
4. If missing, secrets might not be saved correctly

### "Deployment skipped" message

**Cause:** Secrets still not configured  
**Fix:** Re-add all 3 secrets and trigger workflow again

### Vercel shows error

**Common causes:**
- Wrong VERCEL_ORG_ID
- Wrong VERCEL_PROJECT_ID
- VERCEL_TOKEN expired

**Fix:**
1. Delete old secrets from GitHub
2. Generate new VERCEL_TOKEN
3. Re-add all 3 secrets
4. Trigger workflow again

---

## Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 1 min | Copy 3 credentials from Vercel |
| 2 | 1 min | Add 3 secrets to GitHub |
| 3 | Auto | Next push deploys automatically |
| 4 | 3 min | Wait for deployment to complete |

**Total: 2-5 minutes to live deployment**

---

## What You'll Get

✅ Auto-deploy on every push to main  
✅ Preview URLs for pull requests  
✅ Production deployment: zyro-electric.vercel.app  
✅ New version: 45 products, 9 niches  
✅ All workflows running:
- Build
- Docker push
- npm publish
- Vercel deploy

---

**Ready? Go to GitHub Settings > Secrets and add the 3 Vercel credentials!** 🚀

