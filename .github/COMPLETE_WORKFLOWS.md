# Complete Workflow Setup - ZYRO-Electric

**13 Workflows. Clear names. Zero duplicates. Full coverage.**

## Workflow Overview

### Build Workflows (2)
| File | Name | Purpose |
|------|------|---------|
| build-app.yml | Build Application | Compile Angular app to production |
| build-docker.yml | Build Docker Image | Build container for deployment |

### Validation Workflows (2)
| File | Name | Purpose |
|------|------|---------|
| validate-feature.yml | Validate Feature Branch | Feature branch naming & build |
| validate-bugfix.yml | Validate Bugfix Branch | Bugfix/hotfix naming & build |

### Quality Check Workflows (7)
| File | Name | Purpose |
|------|------|---------|
| check-lint.yml | Check Linting | ESLint code style |
| check-tests.yml | Check Unit Tests | Run tests & coverage |
| check-security.yml | Check Security | Vulnerabilities & secrets |
| check-validation.yml | Check Configuration | Config file validation |
| check-analysis.yml | Check Code Analysis | Types & bundle analysis |
| check-performance.yml | Check Performance | Build time & bundle size |
| check-lighthouse.yml | Check Lighthouse | Web vitals & audits |

### Publish & Deploy Workflows (2)
| File | Name | Purpose |
|------|------|---------|
| publish-packages.yml | Publish Packages | Release NPM + Docker |
| deploy-netlify.yml | Deploy to Netlify | Production deployment |

---

## Detailed Workflow Guide

### BUILD WORKFLOWS

#### build-app.yml
- **Triggers:** Push (main/develop/feature/*/bugfix/*), PR
- **Runtime:** ~2-3 minutes
- **Output:** dist/ artifacts (5 days)
- **Failure:** Blocks merge

#### build-docker.yml
- **Triggers:** Push (all branches), PR, Manual
- **Runtime:** ~2-5 minutes
- **Output:** None (local build only)
- **Failure:** Non-blocking

---

### VALIDATION WORKFLOWS

#### validate-feature.yml
- **Triggers:** Push (feature/*), PR to develop
- **Branch Pattern:** `feature/[a-z0-9-]+`
- **Steps:** Name check → Build → Upload
- **Output:** Feature build artifacts (7 days)

#### validate-bugfix.yml
- **Triggers:** Push (bugfix/*, hotfix/*), PR
- **Branch Pattern:** `bugfix/[a-z0-9-]+` or `hotfix/[a-z0-9-]+`
- **Steps:** Name check → Build → Verify → Upload
- **Output:** Bugfix build artifacts (7 days)

---

### QUALITY CHECK WORKFLOWS

#### check-lint.yml
- **Check:** ESLint (@angular/eslint)
- **Command:** `npm run lint`
- **Severity:** Warning level
- **Files:** All TS/JS

#### check-tests.yml
- **Check:** Unit tests (Jasmine/Karma)
- **Command:** `npm run test -- --watch=false --code-coverage`
- **Coverage Target:** 60%+ (ideal 80%+)
- **Output:** Coverage reports (30 days)

#### check-security.yml
- **Checks:**
  - npm audit (dependencies)
  - TruffleHog (hardcoded secrets)
  - CodeQL (advanced analysis)
  - Hadolint (Docker security)
- **Schedule:** Weekly (Sundays 2 AM UTC)

#### check-validation.yml
- **Checks:**
  - package.json syntax
  - tsconfig.json syntax
  - angular.json syntax
  - Dockerfile existence
  - No .env committed
  - package-lock.json exists

#### check-analysis.yml
- **Checks:**
  - TypeScript type checking (`tsc --noEmit`)
  - Bundle size analysis
  - Build output verification
  - Dependency analysis

#### check-performance.yml
- **Measures:**
  - Bundle size (target < 500KB gzipped)
  - Build time (target < 3 minutes)
  - Node modules size
  - Dependency footprint
  - Top 10 largest packages

#### check-lighthouse.yml
- **Audits:**
  - Lighthouse performance
  - Web Vitals (FCP, LCP, FID, CLS, TTFB)
  - Accessibility (WCAG 2.1 AA)
  - SEO
  - Best practices
- **Triggers:** Push to main, PR to main

---

### PUBLISH & DEPLOY WORKFLOWS

#### publish-packages.yml
- **Triggers:** Push to main, Tag (v*), Manual
- **Jobs (parallel):**
  1. Build - Compile app
  2. Publish NPM - @mostafa-said7/zyro-electric
  3. Publish Docker - ghcr.io/mostafa-said7/zyro-electric
- **Tags:**
  - `:latest`
  - `:version` (from semver tag)

#### deploy-netlify.yml
- **Triggers:** Push to main, Tag (v*), Manual
- **Steps:** Checkout → Install → Build → Deploy
- **Target:** Netlify production
- **Env:** NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID

---

## Workflow Execution Matrix

### Branch: main
```
TRIGGER: Push
├─ build-app.yml
├─ build-docker.yml
├─ check-lint.yml
├─ check-tests.yml
├─ check-security.yml
├─ check-validation.yml
├─ check-analysis.yml
├─ check-performance.yml
├─ check-lighthouse.yml
├─ publish-packages.yml (on success)
└─ deploy-netlify.yml (on success)
```

### Branch: develop
```
TRIGGER: Push
├─ build-app.yml
├─ build-docker.yml
├─ check-lint.yml
├─ check-tests.yml
├─ check-security.yml
├─ check-validation.yml
├─ check-analysis.yml
├─ check-performance.yml
└─ check-lighthouse.yml
```

### Branch: feature/*
```
TRIGGER: Push or PR to develop
├─ validate-feature.yml
├─ build-app.yml
├─ build-docker.yml
├─ check-lint.yml
├─ check-tests.yml
├─ check-security.yml
├─ check-validation.yml
├─ check-analysis.yml
├─ check-performance.yml
└─ check-lighthouse.yml
```

### Branch: bugfix/*, hotfix/*
```
TRIGGER: Push or PR to main/develop
├─ validate-bugfix.yml
├─ build-app.yml
├─ build-docker.yml
├─ check-lint.yml
├─ check-tests.yml
├─ check-security.yml
├─ check-validation.yml
├─ check-analysis.yml
├─ check-performance.yml
└─ check-lighthouse.yml
```

### Tag: v*.*.*
```
TRIGGER: Tag push
├─ publish-packages.yml
│  ├─ build
│  ├─ publish-npm
│  └─ publish-docker
└─ deploy-netlify.yml
```

---

## Performance Targets

### Build Times
- **Node build:** < 3 minutes
- **Docker build:** < 5 minutes
- **Lint check:** < 30 seconds
- **Tests:** < 2 minutes
- **Security scan:** < 1 minute

### Bundle Size
- **Main bundle:** < 500KB (gzipped)
- **Total dist:** < 2MB
- **node_modules:** < 1GB

### Web Vitals
- **FCP (First Contentful Paint):** < 1.8s
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 600ms

---

## Required Secrets

| Secret | Scope | Used By |
|--------|-------|---------|
| GH_PAT | `write:packages` `read:packages` | publish-packages.yml |
| NETLIFY_AUTH_TOKEN | Netlify | deploy-netlify.yml |
| NETLIFY_SITE_ID | Netlify | deploy-netlify.yml |

---

## Branch Protection Rules (Recommended)

### For `main` branch:
```
- Require 1+ pull request reviews
- Require status checks:
  ✓ build-app
  ✓ build-docker
  ✓ check-lint
  ✓ check-tests
  ✓ check-security
  ✓ check-validation
  ✓ check-analysis
  ✓ check-performance
- Require branches up to date
- Include administrators
- Require commit signatures
```

### For `develop` branch:
```
- Require 1+ pull request reviews
- Require status checks:
  ✓ build-app
  ✓ build-docker
  ✓ check-lint
  ✓ check-tests
- Require branches up to date
```

---

## Artifact Retention

| Artifact | Retention | Purpose |
|----------|-----------|---------|
| build-* | 5 days | CI verification |
| feature-build-* | 7 days | Feature testing |
| bugfix-build-* | 7 days | Bugfix testing |
| coverage-report-* | 30 days | Coverage tracking |

---

## Quick Reference

### Running Workflows Locally

```bash
# Build
npm run build

# Lint
npm run lint

# Tests
npm run test

# Type check
npx tsc --noEmit

# Docker build
docker build -t zyro-electric:test .

# Build size
du -sh dist/market/
```

### Common Commands

```bash
# Feature branch
git checkout -b feature/my-feature develop
git push -u origin feature/my-feature

# Bugfix branch
git checkout -b bugfix/issue-name develop
git push -u origin bugfix/issue-name

# Release
git tag -a v1.0.5 -m "Release 1.0.5"
git push origin v1.0.5

# Hotfix
git checkout -b hotfix/critical-issue main
git push -u origin hotfix/critical-issue
```

---

## Status Badges (for README.md)

```markdown
[![Build](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/build-app.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Docker](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/build-docker.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Lint](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-lint.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Tests](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-tests.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
[![Security](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions/workflows/check-security.yml/badge.svg)](https://github.com/Mostafa-SAID7/ZYRO-Electric/actions)
```

---

## All 13 Workflows Summary

| # | File | Triggers | Purpose |
|---|------|----------|---------|
| 1 | build-app.yml | Push/PR | Build app |
| 2 | build-docker.yml | Push/PR/Manual | Build Docker |
| 3 | validate-feature.yml | feature/* | Validate feature |
| 4 | validate-bugfix.yml | bugfix/*, hotfix/* | Validate bugfix |
| 5 | check-lint.yml | All branches | ESLint check |
| 6 | check-tests.yml | All branches | Unit tests |
| 7 | check-security.yml | All + weekly | Security scan |
| 8 | check-validation.yml | All branches | Config check |
| 9 | check-analysis.yml | All branches | Code analysis |
| 10 | check-performance.yml | All branches | Performance |
| 11 | check-lighthouse.yml | main/PR | Lighthouse |
| 12 | publish-packages.yml | main/tags | Publish |
| 13 | deploy-netlify.yml | main/tags | Deploy |

**Total Coverage:** Build + Validation + 7 Quality Checks + Performance/Lighthouse + Publish + Deploy

**Zero Duplicates. Clear Names. Complete CI/CD Pipeline.**
