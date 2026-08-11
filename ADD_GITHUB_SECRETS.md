# How to Add Vercel Tokens to GitHub Secrets

Follow these steps to enable automatic deployment to Vercel.

## Step 1: Get VERCEL_TOKEN

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a name like `GitHub Actions`
4. Set expiration to "No expiration" (recommended for CI/CD)
5. Click "Create Token"
6. **Copy the token** (it will only show once)

## Step 2: Get VERCEL_ORG_ID

1. Go to https://vercel.com/account/settings
2. Look for "Organization ID" or "Team ID" in the settings
3. **Copy this ID**

## Step 3: Get VERCEL_PROJECT_ID

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Scroll to find "Project ID"
4. **Copy this ID**

## Step 4: Add Secrets to GitHub

### Method 1: Using GitHub Web Interface (Easiest)

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions** (if not already selected)
5. Click **"New repository secret"** button

### Add VERCEL_TOKEN

1. Name: `VERCEL_TOKEN`
2. Value: Paste the token from Step 1
3. Click **"Add secret"**

### Add VERCEL_ORG_ID

1. Click **"New repository secret"** again
2. Name: `VERCEL_ORG_ID`
3. Value: Paste the ID from Step 2
4. Click **"Add secret"**

### Add VERCEL_PROJECT_ID

1. Click **"New repository secret"** again
2. Name: `VERCEL_PROJECT_ID`
3. Value: Paste the ID from Step 3
4. Click **"Add secret"**

### Method 2: Using GitHub CLI

If you have GitHub CLI installed, run these commands:

```bash
# Set the secrets
gh secret set VERCEL_TOKEN --body "your-vercel-token-here"
gh secret set VERCEL_ORG_ID --body "your-org-id-here"
gh secret set VERCEL_PROJECT_ID --body "your-project-id-here"
```

## Step 5: Verify Secrets Are Added

1. Go to your GitHub repo Settings
2. Click **Secrets and variables** > **Actions**
3. You should see three secrets listed:
   - VERCEL_TOKEN ✓
   - VERCEL_ORG_ID ✓
   - VERCEL_PROJECT_ID ✓

## Step 6: Test Deployment

1. Make a small change to the code
2. Push to `main` branch: `git push origin main`
3. Go to **Actions** tab in GitHub
4. Watch the "Deploy to Vercel" workflow run
5. Check Vercel dashboard for deployment

## Complete!

Once all 3 secrets are added, automatic deployment to Vercel is enabled:
- **Production**: Pushes to `main` deploy to production
- **Preview**: Pull requests get automatic preview URLs
- **Manual**: Use workflow_dispatch in Actions tab to manually trigger

## Troubleshooting

### Secrets not showing in workflow
- GitHub secrets are masked in logs for security
- They won't display in the workflow output
- This is normal and expected

### Deployment still fails
1. Verify all 3 secrets are exactly correct
2. Check Vercel project ID is valid
3. Check org ID matches your Vercel account
4. Try creating a new token in Vercel account settings

### Where to find help
- Vercel docs: https://vercel.com/docs
- GitHub Actions secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- Deployment logs: GitHub Actions > Deploy to Vercel > View logs

## Security Notes

✓ Secrets are encrypted by GitHub
✓ They're not visible in logs or workflow output
✓ Only used during workflow execution
✓ Never commit secrets to code
✓ Use token expiration if possible for extra security

---

**Status**: Ready to deploy! Add these 3 secrets and your app will auto-deploy on every push.
