# Management & Release Workflows

Complete guide for tags, releases, and GitHub Actions management.

## Overview

**4 Management Workflows:**

1. **manage-tags.yml** - Create semantic version tags
2. **manage-releases.yml** - Publish GitHub releases
3. **review-workflows.yml** - Validate workflow files
4. **manage-actions.yml** - GitHub Actions management

---

## 1. manage-tags.yml - Create Tags

### Purpose
Manually create semantic version tags that trigger release workflows.

### How to Use
1. Go to GitHub repository
2. Click **Actions** tab
3. Select **Manage Tags** workflow
4. Click **Run workflow**
5. Enter:
   - **version** (required): e.g., `1.0.5`
   - **message** (optional): Release notes

### What It Does
```
1. Validates version format (semantic versioning)
2. Checks tag doesn't already exist
3. Creates annotated git tag
4. Pushes tag to repository
5. Triggers release workflows automatically
```

### Example
Input:
- version: `1.0.6`
- message: `Bug fixes and performance improvements`

Output:
- Tag created: `v1.0.6`
- Tag pushed to GitHub
- Workflows triggered:
  - manage-releases.yml (creates GitHub Release)
  - publish-packages.yml (NPM + Docker)
  - deploy-netlify.yml (Production)

### Validation
- ✓ Version format: `x.y.z` (semantic versioning)
- ✓ Tag doesn't exist
- ✓ Push succeeds

---

## 2. manage-releases.yml - Publish Releases

### Purpose
Automatically create GitHub releases, publish packages, and deploy when tags are pushed.

### Triggers
1. **Push tag** (v*.*.*)
2. **Manual workflow**

### What It Does

#### Step 1: Create Release
- Generates changelog from git commits
- Creates GitHub Release
- Includes release notes and links

#### Step 2: Publish NPM
- Builds application
- Publishes to GitHub Packages
- Package: `@mostafa-said7/zyro-electric@1.0.6`

#### Step 3: Publish Docker
- Builds Docker image
- Pushes to GHCR
- Tags:
  - `ghcr.io/mostafa-said7/zyro-electric:latest`
  - `ghcr.io/mostafa-said7/zyro-electric:1.0.6`

#### Step 4: Deploy Production
- Builds application
- Deploys to Netlify
- Updates production site

#### Step 5: Notification
- Summarizes release
- Links to all artifacts

### Release Information

GitHub Release includes:
```
## Release v1.0.6

### Changes
[Automatically generated from commits]

### Package Info
- npm: @mostafa-said7/zyro-electric@1.0.6
- Docker: ghcr.io/mostafa-said7/zyro-electric:1.0.6

### Release Artifacts
- Docker image pushed to GitHub Container Registry
- npm package published to GitHub Packages
- Production deployed to Netlify
```

### Example Release Process

```
1. Create tag locally
   git tag -a v1.0.6 -m "Release 1.0.6"

2. Push tag
   git push origin v1.0.6

3. GitHub automatically:
   ✓ Creates release page
   ✓ Publishes npm package
   ✓ Pushes Docker image
   ✓ Deploys to Netlify

4. View at:
   https://github.com/Mostafa-SAID7/ZYRO-Electric/releases/tag/v1.0.6
```

---

## 3. review-workflows.yml - Validate Workflows

### Purpose
Automatically validate, review, and analyze GitHub Actions workflows.

### Triggers
1. **Changes to `.github/workflows/*.yml`** (push/PR)
2. **Manual trigger**

### What It Does

#### Validation
- Checks required fields (name, on, jobs)
- Validates YAML syntax
- Checks for outdated actions
- Verifies no duplicates

#### Security Review
- Detects hardcoded secrets
- Verifies secret references
- Checks permissions
- Analyzes error handling

#### Analysis
- Categorizes workflows
- Lists triggers
- Counts actions
- Generates statistics

#### Reports
Provides summary:
- Total workflows
- Workflow breakdown
- Actions used
- Trigger patterns
- Security issues

### Validation Checklist

✓ **Required Fields:**
- `name:` - Workflow name
- `on:` - Triggers
- `jobs:` - At least one job

✓ **Best Practices:**
- Latest action versions (v4+)
- Explicit permissions
- Proper secret usage
- Error handling

✓ **Security:**
- No hardcoded secrets
- Secrets properly referenced
- PAT tokens used safely
- No console output of secrets

### Example Output

```
GitHub Actions Workflow Validation
===================================

Checking: build-app.yml
  ✓ Valid YAML
  ✓ All required fields present

Checking: manage-tags.yml
  ✓ Valid YAML
  ✓ Proper secret usage

Summary:
  Total workflows: 17
  Errors: 0
  Warnings: 0
  Status: PASS
```

---

## 4. manage-actions.yml - GitHub Actions Management

### Purpose
Manage, monitor, and configure GitHub Actions for the repository.

### Manual Actions

#### List Workflows
Shows all 17 workflows with:
- Filename
- Display name
- Triggers
- Purpose

#### View Usage Statistics
Displays:
- Workflow breakdown by category
- Most used actions
- Runner information
- Execution patterns

#### Configuration Guide
Recommendations for:
- Artifact retention
- Concurrency management
- Security best practices
- Performance optimization
- Monitoring setup

#### System Information
Shows runner specs:
- OS and architecture
- Available tools
- Disk space
- Memory

---

## Complete Release Workflow

### Manual Release Process

**Step 1: Prepare Release**
```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Verify all tests pass
npm run test
npm run lint

# Build production
npm run build
```

**Step 2: Create Tag (Option A - Manual)**
```bash
# Create local tag
git tag -a v1.0.6 -m "Release v1.0.6 - Bug fixes"

# Push tag
git push origin v1.0.6
```

**Step 2: Create Tag (Option B - GitHub Actions)**
1. Go to Actions → Manage Tags
2. Click "Run workflow"
3. Enter version: `1.0.6`
4. Submit

**Step 3: Monitor Release**
1. Go to Actions tab
2. Watch manage-releases.yml job
3. See real-time progress

**Step 4: Verify Release**
- Check GitHub Releases page
- Verify npm package published
- Check Docker image in GHCR
- Confirm Netlify deployment

### Complete Flow Diagram

```
Manual Tag Creation (manage-tags.yml)
    ↓
Tag validation
    ↓
Git tag created and pushed
    ↓
Repository detects tag push
    ↓
Automatic Release (manage-releases.yml)
    ├─ Create GitHub Release
    ├─ Publish npm package
    ├─ Push Docker image
    └─ Deploy to Netlify
    ↓
Release Complete
    ├─ GitHub Release created
    ├─ npm: @mostafa-said7/zyro-electric@1.0.6
    ├─ Docker: ghcr.io/mostafa-said7/zyro-electric:1.0.6
    └─ Production updated
```

---

## Monitoring & Management

### View Workflow Status
1. Go to **Actions** tab
2. Select workflow
3. See execution history
4. Click run for details

### Troubleshooting Failed Releases

**npm publish fails:**
```
Fix: Check GH_PAT secret scopes
Required: write:packages, read:packages
```

**Docker push fails:**
```
Fix: Verify GH_PAT permissions
Update secret if needed
```

**Netlify deploy fails:**
```
Fix: Check NETLIFY_AUTH_TOKEN
Verify NETLIFY_SITE_ID
```

### Performance Optimization

**Speed up releases:**
- Cache docker layers
- Reuse npm cache
- Parallel jobs where possible
- Minimize artifact uploads

**Monitor costs:**
- Track workflow minutes
- Review long-running jobs
- Optimize matrix builds
- Archive old artifacts

---

## Release Versioning Strategy

### Semantic Versioning (SemVer)
Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (x._._ → 2.0.0): Breaking changes
- **MINOR** (_.x._ → 1.2.0): Features added
- **PATCH** (_._.x → 1.0.5): Bug fixes

### Examples

| Release | Reason | Version |
|---------|--------|---------|
| Bug fixes | Bug fixes only | v1.0.6 |
| New features | Features + fixes | v1.1.0 |
| Breaking changes | API changes | v2.0.0 |
| Critical fix | Urgent patch | v1.0.5-hotfix |

---

## GitHub Release Page

Each release automatically includes:

```markdown
# Release v1.0.6

## Changes
- Fix: Login validation error
- Feature: Add dark mode
- Perf: Optimize bundle size

## Package Info
- npm: @mostafa-said7/zyro-electric@1.0.6
- Docker: ghcr.io/mostafa-said7/zyro-electric:1.0.6

## Release Artifacts
- Docker image pushed to GitHub Container Registry
- npm package published to GitHub Packages
- Production deployed to Netlify
```

---

## Required Secrets for Releases

| Secret | Used By | Scopes |
|--------|---------|--------|
| GH_PAT | manage-releases, publish | write:packages, read:packages |
| NETLIFY_AUTH_TOKEN | deploy-netlify | Netlify |
| NETLIFY_SITE_ID | deploy-netlify | Netlify |

---

## Quick Commands

### Create & Release
```bash
# Create tag
git tag -a v1.0.6 -m "Release v1.0.6"

# Push tag (triggers all release workflows)
git push origin v1.0.6

# View releases
git tag -l
```

### Verify Release
```bash
# Check tag exists
git tag | grep v1.0.6

# See tag details
git show v1.0.6

# View commits since last release
git log v1.0.5..v1.0.6
```

---

## Workflow Integration

```
GIT COMMITS → TAG → WORKFLOWS TRIGGER
                   ├─ Validate
                   ├─ Build
                   ├─ Test
                   ├─ Create Release
                   ├─ Publish npm
                   ├─ Push Docker
                   └─ Deploy
                   
COMPLETE ← All steps succeed
```

---

## Summary

**17 Total Workflows:**
- 2 Build
- 2 Validation
- 7 Quality Checks
- 4 Management ← Tags, Releases, Review, Actions
- 2 Publish & Deploy

**Release Process:**
1. Code review & merge to main
2. Create semantic version tag
3. Workflows automatically:
   - Create GitHub Release
   - Publish npm package
   - Push Docker image
   - Deploy to production

**Fully Automated Release Pipeline**
