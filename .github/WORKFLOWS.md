# GitHub Workflows - ZYRO-Electric

Clear documentation of all workflows and their purposes.

## Workflow Structure

```
BUILD WORKFLOWS
├─ build-app.yml              (Compile Angular application)
└─ build-docker.yml           (Build Docker image)

VALIDATION WORKFLOWS
├─ validate-feature.yml       (Feature branch validation)
└─ validate-bugfix.yml        (Bugfix/hotfix branch validation)

CHECK WORKFLOWS (Quality Assurance)
├─ check-lint.yml             (ESLint code style)
├─ check-tests.yml            (Unit tests & coverage)
├─ check-security.yml         (Security vulnerabilities)
├─ check-validation.yml       (Configuration validation)
└─ check-analysis.yml         (Code analysis & types)

PUBLISH & DEPLOY
├─ publish-packages.yml       (NPM + Docker release)
└─ deploy-netlify.yml         (Production deployment)
```

## Detailed Workflow Guide

### 1. Build Workflows

#### build-app.yml
- **Triggers:** Push to main/develop/feature/*/bugfix/*, Pull requests
- **Purpose:** Compile Angular application to production bundle
- **Steps:** Checkout → Node setup → Install → Build → Verify → Upload artifacts
- **Outputs:** Build artifacts (5 days retention)

#### build-docker.yml
- **Triggers:** Push to any branch/PR, Manual trigger
- **Purpose:** Build Docker image (verification only, no push)
- **Steps:** Checkout → Buildx setup → Build image locally → Verify
- **Outputs:** None (build verification only)

---

### 2. Validation Workflows

#### validate-feature.yml
- **Triggers:** Push to feature/*, Pull requests to develop
- **Purpose:** Validate feature branch naming and build
- **Rules:** Branch must match `feature/[a-z0-9-]+` pattern
- **Steps:** Validate name → Build → Upload artifacts
- **Outputs:** Feature build artifacts (7 days retention)

#### validate-bugfix.yml
- **Triggers:** Push to bugfix/*, hotfix/*, Pull requests
- **Purpose:** Validate bugfix/hotfix branch naming and build
- **Rules:** Branch must match `bugfix/[a-z0-9-]+` or `hotfix/[a-z0-9-]+` pattern
- **Steps:** Validate name → Build → Verify → Upload artifacts
- **Outputs:** Bugfix build artifacts (7 days retention)

---

### 3. Check Workflows (Quality Assurance)

#### check-lint.yml
- **Triggers:** Push to all branches, Pull requests
- **Purpose:** Validate code style with ESLint
- **Command:** `npm run lint`
- **Behavior:** Reports issues (non-blocking)
- **Files Checked:** All TypeScript/JavaScript files

#### check-tests.yml
- **Triggers:** Push to all branches, Pull requests
- **Purpose:** Run unit tests and generate coverage reports
- **Command:** `npm run test -- --watch=false --code-coverage`
- **Outputs:** Coverage reports (30 days retention)
- **Features:** Posts coverage comments on PRs

#### check-security.yml
- **Triggers:** Push to all branches, Pull requests, Weekly schedule
- **Purpose:** Security scanning and vulnerability detection
- **Checks:**
  - `npm audit` - Dependency vulnerabilities
  - Secret scanning - Hardcoded secrets (TruffleHog)
  - CodeQL - Advanced code analysis
  - Dockerfile scan - Container security (Hadolint)

#### check-validation.yml
- **Triggers:** Push to all branches, Pull requests
- **Purpose:** Validate configuration files and structure
- **Checks:**
  - package.json syntax
  - tsconfig.json syntax
  - angular.json syntax
  - Dependencies integrity
  - Dockerfile existence
  - No .env file committed
  - No .env in repository

#### check-analysis.yml
- **Triggers:** Push to all branches, Pull requests
- **Purpose:** Code quality analysis and type checking
- **Checks:**
  - TypeScript type checking (`tsc --noEmit`)
  - Bundle size analysis
  - Build verification
  - Node modules analysis

---

### 4. Publish & Deploy

#### publish-packages.yml
- **Triggers:** Push to main, Tag push (v*), Manual trigger
- **Purpose:** Publish NPM package and Docker image
- **Jobs:**
  1. **build** - Compile application
  2. **publish-npm** - Publish to GitHub Packages (@mostafa-said7/zyro-electric)
  3. **publish-docker** - Push to GHCR (ghcr.io/mostafa-said7/zyro-electric)
- **Tags Created:**
  - `latest` - Latest stable version
  - Version number - Semantic versioning (v1.0.5 → 1.0.5)

#### deploy-netlify.yml
- **Triggers:** Push to main, Tag push (v*), Manual trigger
- **Purpose:** Deploy production build to Netlify
- **Steps:** Checkout → Build → Deploy
- **Environment Variables Required:**
  - NETLIFY_AUTH_TOKEN
  - NETLIFY_SITE_ID

---

## Branch Triggers

| Branch | Triggered Workflows |
|--------|-------------------|
| main | build-app, build-docker, check-*, publish-packages, deploy-netlify |
| develop | build-app, build-docker, check-* |
| feature/* | validate-feature, build-app, build-docker, check-* |
| bugfix/* | validate-bugfix, build-app, build-docker, check-* |
| hotfix/* | validate-bugfix, build-app, build-docker, check-* |

---

## Pull Request Triggers

| Target | Triggered Workflows |
|--------|-------------------|
| → main | build-app, build-docker, check-*, validate-bugfix |
| → develop | build-app, build-docker, check-*, validate-feature, validate-bugfix |

---

## Naming Convention

All workflows follow clear, direct naming:

- **build-** : Compilation and Docker build
- **validate-** : Branch validation and structure
- **check-** : Quality assurance checks
- **publish-** : Release and packaging
- **deploy-** : Production deployment

---

## Required Secrets

| Secret | Scope | Used By |
|--------|-------|---------|
| GH_PAT | write:packages, read:packages | publish-packages.yml |
| NETLIFY_AUTH_TOKEN | Netlify | deploy-netlify.yml |
| NETLIFY_SITE_ID | Netlify | deploy-netlify.yml |

---

## Workflow Execution Flow

### For Feature Branch:
```
1. Push to feature/xyz
2. validate-feature.yml runs (branch name check + build)
3. build-app.yml runs (main build)
4. build-docker.yml runs (Docker build)
5. check-lint.yml runs (linting)
6. check-tests.yml runs (unit tests)
7. check-security.yml runs (security scan)
8. check-validation.yml runs (config validation)
9. check-analysis.yml runs (code analysis)
```

### For Main Branch:
```
1. Push to main (or merge PR)
2. build-app.yml runs
3. build-docker.yml runs
4. All check-*.yml run in parallel
5. publish-packages.yml runs (on success)
6. deploy-netlify.yml runs (on success)
```

### For Release:
```
1. Tag push (v1.0.5)
2. publish-packages.yml runs
   - Publishes NPM @mostafa-said7/zyro-electric@1.0.5
   - Pushes Docker ghcr.io/mostafa-said7/zyro-electric:1.0.5
   - Pushes Docker ghcr.io/mostafa-said7/zyro-electric:latest
3. deploy-netlify.yml runs
```

---

## Common Issues & Solutions

### Linting Fails
```bash
npm run lint -- --fix
git add .
git commit -m "Fix linting issues"
```

### Tests Fail
```bash
npm run test -- --watch
# Fix failing tests
```

### Security Warnings
```bash
npm audit
npm audit fix
```

### Validation Errors
Check `.env` is not committed:
```bash
git ls-files --error-unmatch .env
```

### Docker Build Fails
Check Dockerfile is valid:
```bash
docker build -t test:1.0 .
```

---

## Artifact Retention

| Artifact | Retention | Job |
|----------|-----------|-----|
| build-* | 5 days | build-app |
| feature-build-* | 7 days | validate-feature |
| bugfix-build-* | 7 days | validate-bugfix |
| coverage-report-* | 30 days | check-tests |

---

## Status Badges (for README)

```markdown
[![Build](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/build-app.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Docker](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/build-docker.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Lint](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-lint.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Tests](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-tests.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Security](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-security.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
```

---

## All Workflows at a Glance

| File | Name | Purpose |
|------|------|---------|
| build-app.yml | Build Application | Compile Angular app & upload artifacts |
| build-docker.yml | Build Docker Image | Build container image |
| validate-branch.yml | Validate Branch Naming | Check feature/bugfix branch names |
| auto-version-bump.yml | Auto Version Bump & Tag | Bumps package.json & pushes git tag |
| auto-release.yml | Auto Create Release | Generates GitHub release on tag push |
| run-tests.yml | Run Unit Tests | Run test suite |
| deploy-vercel.yml | Deploy to Vercel | Production deployment |
| publish-packages.yml | Publish Packages | Release NPM + Docker |

---

**Total:** 11 workflows with clear, descriptive names. No duplicates. Proper separation by functionality.
