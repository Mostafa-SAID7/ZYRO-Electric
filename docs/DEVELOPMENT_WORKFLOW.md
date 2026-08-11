# Development Workflow Guide

Complete step-by-step workflow for developing new features on the `develop` branch with automated version management, testing, and deployment.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Phase 1: Feature Planning](#phase-1-feature-planning)
3. [Phase 2: Development Setup](#phase-2-development-setup)
4. [Phase 3: Development & Testing](#phase-3-development--testing)
5. [Phase 4: Code Review](#phase-4-code-review)
6. [Phase 5: Merge & Release](#phase-5-merge--release)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Start new feature on develop branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make changes and test locally
npm start
# Test your changes...

# 3. Commit changes
git add .
git commit -m "feat: add your feature description"

# 4. Push and create PR to develop
git push origin feature/your-feature-name

# 5. After approval, merge to develop
# 6. Auto version bump runs → v1.0.10
# 7. PR develop → main for release
```

---

## Phase 1: Feature Planning

### ✅ What to do before coding

1. **Create GitHub Issue** (if not exists)
   - Use one of the issue templates: bug, feature, documentation, or performance
   - Link to related issues
   - Add labels (feature, bug, enhancement, etc.)

2. **Plan the scope**
   - What components need changes?
   - New API endpoints?
   - Database schema changes?
   - Breaking changes?

3. **Create feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

### 📋 Checklist

- [ ] Issue created with clear description
- [ ] Scope documented (components, services, etc.)
- [ ] Feature branch created from `develop`
- [ ] Team agrees on approach

---

## Phase 2: Development Setup

### ✅ Local environment setup

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Verify build**
   ```bash
   npm run build
   ```

3. **Start dev server**
   ```bash
   npm start
   ```
   App runs at: `http://localhost:4200`

4. **Check TypeScript**
   ```bash
   npx tsc --noEmit
   ```

### 📋 Checklist

- [ ] Dependencies installed
- [ ] Build completes without errors
- [ ] Dev server runs
- [ ] No TypeScript errors
- [ ] Browser opens to localhost:4200

---

## Phase 3: Development & Testing

### ✅ Code changes

1. **Update relevant files**
   - Components: `src/app/*/components/`
   - Services: `src/app/*/services/`
   - Models: `src/app/*/models/`
   - Styles: Modify component SCSS

2. **Test locally**
   ```bash
   npm start
   # Manually test in browser
   ```

3. **Run tests** (if applicable)
   ```bash
   npm test
   ```

4. **Check linting**
   ```bash
   npm run lint
   ```

5. **Verify bundle size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

### 🧪 Test Cases

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Mobile responsive (test on different screen sizes)
- [ ] Accessibility check (keyboard navigation, screen readers)
- [ ] Performance acceptable (load time, animations smooth)
- [ ] No breaking changes to existing features

### 📋 Checklist

- [ ] Code changes implemented
- [ ] Tests passing (if applicable)
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Manual testing completed
- [ ] Bundle size acceptable
- [ ] Mobile responsive
- [ ] No accessibility issues

---

## Phase 4: Code Review

### ✅ Prepare for review

1. **Commit with clear message**
   ```bash
   git add .
   git commit -m "feat: add short description

   - Detailed change 1
   - Detailed change 2
   - Fixes #123"
   ```

2. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Target: `develop` branch
   - Title: `feat: description`
   - Description: What changed and why
   - Link to issue: `Closes #123`
   - Add labels (feature, enhancement, etc.)

4. **Wait for review**
   - Address feedback
   - Make requested changes
   - Push updates
   - Request re-review

### 📋 Checklist

- [ ] Commit message is clear and descriptive
- [ ] Changes pushed to feature branch
- [ ] PR created to develop branch
- [ ] PR description is complete
- [ ] Issue linked in PR description
- [ ] All tests passing
- [ ] No conflicts with develop branch
- [ ] Code review approved

---

## Phase 5: Merge & Release

### ✅ After PR approval

1. **Merge to develop**
   - GitHub: Click "Squash and merge" or "Merge pull request"
   - OR locally:
     ```bash
     git checkout develop
     git pull origin develop
     git merge feature/your-feature-name
     git push origin develop
     ```

2. **Auto version bump runs**
   - Workflow: `auto-version-bump.yml`
   - Bumps: v1.0.9 → v1.0.10
   - Creates tag: `v1.0.10`
   - Commits: `chore: bump version to 1.0.10`

3. **Auto release generated**
   - Workflow: `auto-release.yml`
   - Creates GitHub Release
   - Shows changelog from commits
   - Attaches artifacts

4. **Publish packages**
   - Workflow: `publish-packages.yml`
   - npm publish to GitHub packages
   - Docker push to GHCR

5. **Deploy to preview**
   - Vercel builds and deploys preview URL

6. **Create PR to main** (for production release)
   ```bash
   git checkout main
   git pull origin main
   git merge develop
   git push origin main
   ```

7. **Production deployment**
   - `auto-version-bump.yml` runs
   - `publish-packages.yml` updates npm/Docker
   - `deploy-vercel.yml` deploys to production

### 📋 Checklist

- [ ] PR approved by reviewer
- [ ] Merged to develop branch
- [ ] Auto version bump completed
- [ ] Auto release generated
- [ ] npm and Docker published
- [ ] Vercel preview deployed
- [ ] Tested on preview URL
- [ ] PR created to main
- [ ] Production deployment completed
- [ ] Feature live on production

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT WORKFLOW                      │
└─────────────────────────────────────────────────────────────────┘

1. PLANNING
   ├─ Create Issue
   ├─ Plan scope
   └─ Create feature branch from develop

2. DEVELOPMENT
   ├─ Local changes
   ├─ Test locally
   ├─ Run tests & linting
   └─ Verify build

3. CODE REVIEW
   ├─ Commit with clear message
   ├─ Push to GitHub
   ├─ Create PR to develop
   └─ Address feedback

4. MERGE & AUTO WORKFLOW
   ├─ Approve & merge to develop
   ├─ auto-version-bump.yml: v1.0.9 → v1.0.10
   ├─ auto-tag.yml: creates v1.0.10 tag
   ├─ auto-release.yml: generates GitHub Release
   ├─ publish-packages.yml: npm + Docker publish
   └─ Vercel: builds & deploys preview

5. PRODUCTION RELEASE
   ├─ Create PR: develop → main
   ├─ Approve & merge to main
   ├─ auto-version-bump.yml: v1.0.10 → v1.0.11
   ├─ publish-packages.yml: npm + Docker update
   ├─ deploy-vercel.yml: --prod deployment
   └─ ✅ LIVE on production

```

---

## Useful Links

### 📚 Documentation
- **[Project Summary](./PROJECT_SUMMARY.md)** - Architecture and tech stack
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment details
- **[Niches Documentation](./niches/INDEX.md)** - Product categories and data
- **[ZYRO Branding](./ZYRO-BRANDING.md)** - Brand guidelines

### 🔧 Configuration
- **[vercel.json](../vercel.json)** - Vercel deployment config
- **[Dockerfile](../Dockerfile)** - Docker production image
- **[docker-compose.yml](../docker-compose.yml)** - Local Docker setup
- **[angular.json](../angular.json)** - Angular build config

### 🚀 CI/CD Workflows
- **[auto-version-bump.yml](../.github/workflows/auto-version-bump.yml)** - Auto version management
- **[auto-tag.yml](../.github/workflows/auto-tag.yml)** - Auto git tagging
- **[auto-release.yml](../.github/workflows/auto-release.yml)** - GitHub Release generation
- **[publish-packages.yml](../.github/workflows/publish-packages.yml)** - npm & Docker publish
- **[deploy-vercel.yml](../.github/workflows/deploy-vercel.yml)** - Vercel deployment
- **[build-app.yml](../.github/workflows/build-app.yml)** - Angular build

### 🐛 Issue Templates
- **[Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)** - Report bugs
- **[Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)** - Propose features
- **[Documentation](.github/ISSUE_TEMPLATE/documentation.md)** - Doc improvements
- **[Performance](.github/ISSUE_TEMPLATE/performance.md)** - Performance issues

---

## Git Branch Strategy

```
main
├─ v1.0.8 (production stable)
├─ v1.0.9 (production stable)
└─ v1.0.10 (production stable)

develop
├─ feature/user-auth
├─ feature/payment-integration
└─ feature/email-notifications

feature/your-feature (local)
```

### Branch Naming Convention

- **Feature**: `feature/description` - New features
- **Bug fix**: `fix/description` - Bug fixes
- **Hotfix**: `hotfix/description` - Critical production fixes
- **Refactor**: `refactor/description` - Code refactoring
- **Docs**: `docs/description` - Documentation updates

### Commit Message Format

```
<type>: <subject>

<body>

Fixes #<issue-number>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## Version Management

### Semantic Versioning

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features
- **PATCH** (0.0.x): Bug fixes

### Current Versions

| Branch | Version | Status |
|--------|---------|--------|
| main | 1.0.10 | Production |
| develop | 1.0.11-dev | Staging |

### Version Bumping

- Automatic on code changes (src/, Dockerfile, angular.json)
- Triggered by: `auto-version-bump.yml`
- Creates tag: `v{version}`
- Updates: `package.json`

---

## Troubleshooting

### Build fails with peer dependency errors

```bash
npm install --legacy-peer-deps
npm run build
```

### Port 4200 already in use

```bash
npm start -- --port 4300
# Or kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

### Changes not reflecting in browser

1. Stop dev server (`Ctrl+C`)
2. Clear node_modules: `rm -rf node_modules`
3. Reinstall: `npm install --legacy-peer-deps`
4. Start dev server: `npm start`

### Git conflicts during merge

```bash
git checkout develop
git pull origin develop
git merge feature/your-feature
# Resolve conflicts in editor
git add .
git commit -m "chore: resolve merge conflicts"
git push origin develop
```

### Vercel deployment fails

1. Check logs: `vercel logs` or Vercel Dashboard
2. Verify `vercel.json` config
3. Check environment variables
4. Ensure build succeeds locally: `npm run build`

### Docker build fails

```bash
docker build -f Dockerfile -t zyro-electric:latest .
# Check output for specific error
docker logs <container-id>
```

---

## Quick Reference

### Essential Commands

```bash
# Development
npm start                    # Start dev server
npm run build               # Production build
npm test                    # Run tests
npm run lint                # Check code style

# Git
git checkout develop                              # Switch to develop
git checkout -b feature/name                     # Create feature branch
git push origin feature/name                     # Push to GitHub
git merge feature/name                           # Merge locally

# Docker
docker build -f Dockerfile -t zyro:latest .     # Build image
docker run -p 4200:80 zyro:latest              # Run container
docker-compose up                                # Start with compose

# Deployment
vercel deploy --prod                             # Deploy to production
vercel deploy                                    # Deploy preview
```

---

## Support & Questions

- **Documentation**: Check `docs/` folder
- **Issues**: Create GitHub Issue with appropriate template
- **Discussions**: Use GitHub Discussions tab
- **Help Center**: Link: https://example.com/help

---

**Last Updated**: August 11, 2026
**Version**: 1.0
**Maintainers**: ZYRO Team
