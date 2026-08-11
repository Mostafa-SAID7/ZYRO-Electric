# Vercel Deployment Setup Guide

## Overview
ZYRO Electric now deploys to Vercel instead of Netlify. This provides better performance, automatic preview deployments, and integrated monitoring.

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Admin access to Vercel project

## Setup Instructions

### Step 1: Create Vercel Project

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose "Mostafa-SAID7/ZYRO-Electric" repository
5. Configure project settings:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/market`
   - **Node Version**: 22.x

### Step 2: Add GitHub Secrets

Add the following secrets to GitHub (Settings > Secrets and variables > Actions):

1. **VERCEL_TOKEN**
   - Go to Vercel Settings > Tokens
   - Create new token for CI/CD
   - Copy token value to GitHub secret

2. **VERCEL_ORG_ID**
   - Found in Vercel account settings
   - Copy to GitHub secret

3. **VERCEL_PROJECT_ID**
   - Found in Vercel project settings (Project ID)
   - Copy to GitHub secret

### Step 3: Configure Environment Variables (Optional)

In Vercel project dashboard, add environment variables:

```
NODE_ENV = production
CI = true
```

### Step 4: Test Deployment

1. Push a branch: `git push origin feature/test`
2. GitHub Actions will run deploy workflow
3. Check GitHub Actions for deployment logs
4. Preview link will appear in PR comment

## Deployment Workflow

### Production Deployment
- **Trigger**: Push to `main` branch
- **Environment**: Production
- **URL**: Project domain (e.g., zyro-electric.vercel.app)
- **When**: Automatic on main branch push

### Preview Deployment
- **Trigger**: PR to main/develop, or push to develop
- **Environment**: Preview
- **URL**: Automatic preview URL (e.g., zyro-electric-git-feature-123.vercel.app)
- **When**: Automatic on PR creation and updates

### Manual Deployment
- Use GitHub "workflow_dispatch" button in Actions tab
- Manually trigger deploy workflow anytime

## Monitoring Deployments

### GitHub Actions Dashboard
```
https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
```
- View build logs
- Check deployment status
- See preview/production deployments

### Vercel Dashboard
```
https://vercel.com/dashboard
```
- View deployment history
- Monitor performance
- Check analytics
- Configure project settings

## Build Artifacts

- **Build Output**: `dist/market/`
- **Build Time**: ~2-3 minutes
- **Artifact Size**: ~5-10 MB
- **Cache**: Automatically handled by Vercel

## Performance Features

✓ **Automatic SSL/HTTPS** - All deployments have free SSL
✓ **Global CDN** - Content served from edge locations
✓ **Compression** - Automatic gzip/brotli compression
✓ **Image Optimization** - Automatic image optimization
✓ **Preview Deployments** - Instant preview URLs for PRs

## Troubleshooting

### Build Fails
1. Check GitHub Actions logs
2. Verify `npm run build` works locally
3. Check Node.js version (should be 22.x)
4. Verify `dist/market/` output directory

### Deployment Not Triggering
1. Verify Vercel secrets are set correctly
2. Check GitHub Actions permissions
3. Ensure branch is `main` or `develop`

### Performance Issues
1. Check Vercel analytics dashboard
2. Review deployment logs
3. Check image optimization settings
4. Monitor API response times

## Removing Netlify References

Old Netlify deployment configuration has been removed:
- ✅ `deploy-netlify.yml` removed
- ✅ Netlify secrets no longer needed
- ✅ All deployments now via Vercel

## Next Steps

1. ✅ Set up Vercel project
2. ✅ Add GitHub secrets
3. ✅ Test preview deployment (create PR)
4. ✅ Test production deployment (push to main)
5. ✅ Monitor deployments in Vercel dashboard

## Support

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Angular Build**: https://angular.io/guide/deployment

---

**Last Updated**: August 11, 2026
**Deployment**: Vercel v2.0
**Status**: ✅ Production Ready
