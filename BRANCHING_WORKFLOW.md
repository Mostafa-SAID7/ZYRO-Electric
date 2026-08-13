# Git Branching Strategy & Workflow Guide

Welcome to the **ZYRO-Electric** development workflow guide. Follow this strategy for creating, naming, testing, and merging branches into GitHub.

---

## 📌 1. Branch Naming Conventions

All development must take place on dedicated branches created from `develop` (or `main` for hotfixes).

| Branch Type | Naming Format | Example | Description |
|---|---|---|---|
| **Main** | `main` | `main` | Production branch (runs build & deploy workflows) |
| **Testing** | `testing` or `test/*` | `testing` | Staging/Test branch (runs test workflow) |
| **Feature** | `feature/<short-desc>` | `feature/branches-workflow` | New UI features and capabilities |
| **Bug Fix** | `bugfix/<short-desc>` | `bugfix/cart-drawer-fix` | Regular bug fixes during development |
| **Hot Fix** | `hotfix/<short-desc>` | `hotfix/login-auth-patch` | Critical production fixes |
| **Release** | `release/v<version>` | `release/v1.1.0` | Release preparation branch |

> ⚠️ Branch names must only use **lowercase letters, numbers, and hyphens** (`[a-z0-9-]`).

---

## 🚀 2. Quick Command Workflow

### Step 1: Switch to `main` (or `develop`) and pull latest
```bash
git checkout main
git pull origin main
```

### Step 2: Create and switch to your feature branch
```bash
git checkout -b feature/my-new-feature
```

### Step 3: Make changes & commit using Conventional Commits
```bash
git add .
git commit -m "feat(ui): add new branches selection workflow"
```

### Step 4: Push branch to GitHub
```bash
git push -u origin feature/my-new-feature
```

### Step 5: Open a Pull Request (PR)
1. Go to your GitHub repository: `Mostafa-SAID7/ZYRO-Electric`.
2. Click **Compare & Pull Request**.
3. Target branch: `main` or `develop`.
4. Ensure automated GitHub Workflows (`validate-branch`, `build-app`, `run-tests`) run and pass successfully!

---

## ⚙️ 3. GitHub Workflows Integration

When you push a branch or open a Pull Request, GitHub Actions automatically runs:
- 🧪 **[validate-branch.yml](file:///.github/workflows/validate-branch.yml)**: Validates branch naming standard & builds the Angular app.
- 📦 **[build-app.yml](file:///.github/workflows/build-app.yml)**: Verifies Angular production build.
- 🚀 **[auto-release.yml](file:///.github/workflows/auto-release.yml)**: Auto generates GitHub release on tag push (`v*`).
