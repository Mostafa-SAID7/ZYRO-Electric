# 🔐 Branch Protection Rules for ZYRO-Electric

## Overview
This document outlines the branch protection rules configured for the `main` branch of the ZYRO-Electric repository.

## Purpose
- Prevent accidental force pushes or deletions
- Require code review before merging
- Ensure all automated checks pass before merging
- Maintain code quality and deployment safety

## Configuration

### Branch Pattern
- **Branch Name**: `main`

### Protection Rules Enabled

#### 1. Require a Pull Request Before Merging
- **Status**: ✅ ENABLED
- **Dismiss stale PR approvals**: Yes
- **Require review from code owners**: Optional
- **Purpose**: Ensures all changes are reviewed before integration

#### 2. Require Status Checks to Pass
- **Status**: ✅ ENABLED
- **Require branches to be up to date**: Yes
- **Status Checks Required**:
  - `build` (Build Application workflow)
  - `publish` (Publish Docker workflow)
- **Purpose**: Ensures all automated tests and builds pass

#### 3. Code Review Requirements
- **Status**: ✅ ENABLED
- **Minimum Approvals**: 1
- **Dismiss Stale Approvals**: Yes
- **Purpose**: Requires at least one approval before merge

#### 4. Require Conversation Resolution
- **Status**: ✅ ENABLED
- **Purpose**: All comments must be resolved before merge

#### 5. Enforce Restrictions
- **Status**: ✅ ENABLED
- **Disable Force Pushes**: Yes (prevents `git push --force`)
- **Disable Deletions**: Yes (prevents branch deletion)
- **Purpose**: Prevents destructive operations

## Workflow

### When Making Changes:

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "description of changes"
   ```

3. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request on GitHub**
   - Go to: https://github.com/Mostafa-SAID7/ZYRO-Electric/pulls
   - Click "New Pull Request"
   - Select your branch and provide a description

5. **Wait for Checks**
   - GitHub Actions will run all workflows
   - Build Application workflow must pass
   - Publish Docker workflow must pass

6. **Request Review**
   - Request at least 1 reviewer
   - Wait for approval

7. **Merge**
   - Once approved and all checks pass
   - Click "Merge Pull Request"

## Current GitHub Actions

### 1. Build Application
- **File**: `.github/workflows/build.yml`
- **Trigger**: Push/PR to main
- **What it does**:
  - Installs dependencies
  - Builds production bundle
  - Uploads artifacts
- **Status**: ✅ REQUIRED

### 2. Publish Docker
- **File**: `.github/workflows/publish-docker.yml`
- **Trigger**: Push to main
- **What it does**:
  - Builds Docker image
  - Pushes to Docker Hub
  - Tags image
- **Status**: ✅ REQUIRED

## Setup Instructions

### For Repository Administrators:

1. **Navigate to Settings**
   ```
   https://github.com/Mostafa-SAID7/ZYRO-Electric/settings
   ```

2. **Go to Branches**
   - Click "Branches" in the left sidebar

3. **Add Branch Protection Rule**
   - Click "Add rule"
   - Branch name pattern: `main`

4. **Configure Requirements** (as listed above)

5. **Save**
   - Click "Create" to apply the rule

## Testing the Protection

To verify the protection is working:

1. **Try a force push** (should be rejected)
   ```bash
   git push origin main --force
   # Should fail: "You are not authorized to push to this branch"
   ```

2. **Try direct commit** (should be rejected)
   - Try committing directly on the GitHub web interface
   - Should show: "Branch protection rules blocked this push"

## Exemptions

Branch administrators can bypass protections for emergency situations:
- Repository owners/admins only
- Should be used sparingly
- Document any bypasses

## Updating the Rules

To modify these rules:

1. Go to Settings → Branches
2. Click "Edit" on the rule
3. Make changes
4. Click "Save changes"

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [About Protected Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

## Questions?

For issues with branch protection, check GitHub documentation or contact the repository administrators.

---

**Last Updated**: August 11, 2026
**Repository**: https://github.com/Mostafa-SAID7/ZYRO-Electric
