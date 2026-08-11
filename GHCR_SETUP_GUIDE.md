# 🐳 GitHub Container Registry (GHCR) Setup Guide

## Overview
This guide explains how to enable Docker image publishing to GitHub Container Registry (GHCR) with full permissions.

## Current Status

### What's Working ✅
- **Docker Hub Publishing**: `msaid356/zyro-electric` - LIVE
- **Build Verification**: All GitHub Actions workflows build successfully
- **Image Quality**: Multi-stage builds, optimized size, health checks

### What Needs Setup ⏳
- **GHCR Publishing**: Requires Personal Access Token (PAT) for write permissions
- **Current Error**: `denied: permission_denied: write_package`

## The Problem

GitHub Actions' built-in `GITHUB_TOKEN` has limited permissions for GHCR:
- ✅ Can READ packages
- ✅ Can LIST packages
- ❌ Cannot WRITE/PUSH packages

To push Docker images to GHCR, you need elevated permissions.

## Solution: Use Personal Access Token (PAT)

### Step 1: Create a Personal Access Token

1. Go to GitHub Settings:
   ```
   https://github.com/settings/tokens
   ```

2. Click "Generate new token" → "Generate new token (classic)"

3. Configure the token:
   - **Token name**: `GHCR_PAT` or `GH_PAT`
   - **Expiration**: 90 days (or custom)
   - **Scopes**: Select these:
     - ✅ `write:packages` - Push Docker images
     - ✅ `read:packages` - Pull Docker images
     - ✅ `delete:packages` - Delete images (optional)
     - ✅ `repo` - Full control of repositories (recommended)

4. Click "Generate token"

5. **COPY the token immediately** - You won't see it again!
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Step 2: Add Token to Repository Secrets

1. Go to Repository Settings:
   ```
   https://github.com/Mostafa-SAID7/ZYRO-Electric/settings/secrets/actions
   ```

2. Click "New repository secret"

3. Configure the secret:
   - **Name**: `GH_PAT` (or `GHCR_PAT`)
   - **Value**: Paste your token from Step 1

4. Click "Add secret"

### Step 3: Update Workflow to Use PAT

Update `.github/workflows/publish-docker.yml`:

Find this section:
```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY }}
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

Replace `GITHUB_TOKEN` with your PAT:
```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY }}
    username: ${{ github.actor }}
    password: ${{ secrets.GH_PAT }}
```

### Step 4: Verify Setup

After pushing changes:

1. Go to Actions tab
2. Wait for workflow to run
3. Check for success
4. Verify image at: https://github.com/Mostafa-SAID7/ZYRO-Electric/pkgs/container/zyro-electric

## Current Workflow Configuration

### `publish-docker.yml`
- Triggers on: Push to main, tags
- Builds Docker image from Dockerfile
- Attempts GHCR push (with error handling)
- Uses `continue-on-error: true` for graceful failure

### `docker-build.yml` (NEW)
- Triggers on: Push/PR to main/develop
- Builds Docker image for verification
- No push (faster, good for CI)
- Validates build process

## Alternative: Docker Hub Focus

Currently, the primary publishing target is Docker Hub:
- **Repository**: https://hub.docker.com/r/msaid356/zyro-electric
- **Status**: ✅ LIVE and working
- **Tags**: latest, 1.0.0, v1, stable
- **No setup required** - Already configured

To keep using Docker Hub as primary:
1. No changes needed
2. Workflows continue to work
3. GHCR setup is optional enhancement

## Publishing Flow (Current)

```
Git Push to main
    ↓
GitHub Actions triggered
    ↓
Build Application (build.yml)
    ├─ npm install
    ├─ npm run build
    └─ Upload artifacts
    ↓
Build & Verify Docker (docker-build.yml)
    ├─ Docker image built
    └─ Verified successfully
    ↓
Publish to GHCR (publish-docker.yml)
    ├─ Build Docker image
    ├─ Attempt GHCR push
    └─ Continue on error
    ↓
Published on Docker Hub (manual command)
```

## Quick Setup Checklist

- [ ] Create Personal Access Token
- [ ] Set PAT expiration (90 days recommended)
- [ ] Add required scopes (write:packages, read:packages)
- [ ] Copy token to safe location
- [ ] Add as repository secret `GH_PAT`
- [ ] Update `publish-docker.yml` workflow
- [ ] Push changes
- [ ] Verify next workflow run
- [ ] Check GHCR package page

## Troubleshooting

### Token Expired
- Go to https://github.com/settings/tokens
- Create new token
- Update repository secret

### Still Getting Permission Denied
- Verify token has `write:packages` scope
- Verify secret name matches workflow file
- Check token is current (not expired)
- Ensure you're using correct token in workflow

### Want to Keep Docker Hub Only
- GHCR setup is optional
- Docker Hub already works
- No action needed

## Resources

- [GitHub Container Registry Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Docker Login Action](https://github.com/docker/login-action)

## Summary

✅ **Docker Hub**: Ready to use, no setup needed  
⏳ **GHCR**: Optional, requires PAT setup (3 steps)  
✅ **Workflows**: Updated with better error handling  
✅ **Build Verification**: New dedicated workflow

---

**Last Updated**: August 11, 2026  
**Repository**: https://github.com/Mostafa-SAID7/ZYRO-Electric
