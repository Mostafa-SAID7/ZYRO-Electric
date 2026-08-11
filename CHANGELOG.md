# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-08-11

### ✨ Added
- **9-Niche Product Database** - Migrated from generic 5-category system to specialized 9-niche database
- **45 Curated Products** - Premium tech accessories across 9 carefully selected categories
- **Consistent Slugs** - All products use kebab-case slugs for reliable filtering:
  - `smartphone-accessories` (5 products)
  - `laptop-accessories` (5 products)
  - `cable-management` (5 products)
  - `desk-tech` (5 products)
  - `smart-device-accessories` (5 products)
  - `charging-accessories` (5 products)
  - `photography-accessories` (5 products)
  - `content-creator-equipment` (5 products)
  - `electronics-organization` (5 products)
- **Product ID Naming Convention** - Standardized [prefix]-[1-5] pattern for each category
- **Enhanced ProductsService** - Updated to use new MOCK_PRODUCTS_NICHES dataset

### 🐛 Fixed
- **Angular Compiler Mismatch** - Resolved ClassPropertyMapping export error by aligning @angular/compiler-cli to ^18.2.0
- **NPM Lock File Sync** - Fixed out-of-sync package-lock.json by using flexible npm install
- **Docker Cache Conflicts** - Added cache busting with npm cache clean --force
- **Missing Lock File** - Made package-lock.json optional in Docker build (COPY with wildcard)
- **Dependency Version Conflicts** - Aligned all Angular packages to version 18.2.0

### 🔧 Changed
- **Dockerfile Optimization** - Changed from `npm ci` to `npm install` for better flexibility
- **Build Command** - Added npm cache clean before install to prevent stale packages
- **Category System** - Replaced 5 generic categories with 9 specialized tech niches
- **Product Dataset** - MOCK_PRODUCTS → MOCK_PRODUCTS_NICHES
- **Category IDs** - Changed from `cat-1` to descriptive slugs matching product categories

### ⚠️ Breaking Changes
- Old `MOCK_PRODUCTS` dataset no longer used
- Category filtering now uses descriptive slugs instead of generic IDs
- Travel Tech niche removed (was unused/incomplete)
- Component queries for filtering must use new slug values

### 📦 Dependencies
- Angular: ^18.2.0 (all packages aligned)
- @angular/compiler-cli: ^18.2.0 (fixed from ^22.1.1)
- TypeScript: ~5.4.5
- Node.js: 22.22.3 (Docker base image)
- Nginx: 1.27-alpine (production serving)

### 🚀 Deployment
- **GitHub Actions** - CI/CD pipeline fully functional
- **Docker Build** - Multi-stage build succeeds without errors
- **Production Ready** - All builds, tests, and deployments working
- **Build Time** - Optimized with proper caching strategies

### 📝 Commits
- f08a9f6 - fix: make package-lock.json optional in Docker build
- 5b057b5 - fix: force npm cache clean in Docker build
- 18db884 - fix: resolve npm lock file sync issues
- 585335e - fix: align @angular/compiler-cli version
- 081b5d0 - feat: migrate to 9-niche product database
- 3449cbd - chore: update git author email

---

## [1.1.0] - 2026-07-20

### Added
- Initial 9-niche product database structure
- TypeScript type definitions for products
- Enhanced filtering system

### Fixed
- Angular dependency versions
- Build pipeline compatibility

---

## [1.0.6] - 2026-06-15

### Fixed
- Minor dependency updates
- Build optimizations

---

## [1.0.5] - 2026-06-01

### Added
- Initial release foundation
- 5-category product system
- Basic e-commerce features
- Docker deployment

---

## Legend

- **Added** - New features
- **Changed** - Changes in existing functionality  
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security vulnerability fixes
- **Breaking Changes** - Changes that break existing functionality

---

## How to Release

1. Update version in `package.json`
2. Update this file with changes
3. Create annotated tag: `git tag -a v1.X.X -m "message"`
4. Push tag: `git push origin v1.X.X`
5. GitHub automatically creates release from tag
6. Add release notes to GitHub release page

---

Last Updated: August 11, 2026
