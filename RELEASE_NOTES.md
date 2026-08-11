# Release Notes

## How Automatic Releases Work

This project uses automated workflows to create version tags and GitHub releases whenever the version in `package.json` is updated.

## Workflow Process

```
1. Update package.json version (e.g., 1.0.6 → 1.0.7)
   ↓
2. Commit and push to main
   ↓
3. auto-tag.yml workflow triggers
   ├─ Reads version from package.json
   ├─ Creates git tag v1.0.7
   └─ Pushes tag to GitHub
   ↓
4. auto-release.yml workflow triggers
   ├─ Generates changelog from commits
   ├─ Creates GitHub Release
   └─ Attaches files (README, Dockerfile, etc.)
   ↓
5. Release appears on GitHub Releases page
```

## Release History

### v1.0.7 (Current)
- ✅ Added comprehensive GitHub issue templates
- ✅ Fixed GitHub Container Registry (GHCR) authentication
- ✅ Cleaned up workflows to 4 core deployment pipelines
- ✅ Implemented automatic tagging and releases
- ✅ Updated Vercel deployment configuration
- Features: Bug reports, feature requests, documentation, performance templates
- Status: Live on production

### v1.0.6
- Initial deployment setup
- Vercel integration
- Docker configuration

## Updating Version

### Step 1: Update package.json
```bash
# Edit package.json and change version
{
  "version": "1.0.8"  // <- Update this
}
```

### Step 2: Commit and Push
```bash
git add package.json
git commit -m "bump: version 1.0.8 - add new features"
git push origin main
```

### Step 3: Automatic Process
- ✅ `auto-tag.yml` creates tag `v1.0.8`
- ✅ `auto-release.yml` generates release notes
- ✅ GitHub Release appears automatically

## Release Contents

Each release includes:

### 📝 Changelog
- All commits since previous release
- Commit hashes and messages
- Author information

### 📦 Attachments
- `package.json` - Latest dependencies
- `README.md` - Project documentation
- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker compose setup

### 📋 Installation Instructions
- npm install command
- Docker pull command
- Version and commit info

## GitHub Release Page

View releases at:
https://github.com/Mostafa-SAID7/ZYRO-Electric/releases

### Release Naming
- Tag format: `v{version}` (e.g., `v1.0.7`)
- Release name: `Release v{version}` (e.g., `Release v1.0.7`)

### Release Features
- ✅ Auto-generated from git tags
- ✅ Changelog from commits
- ✅ Downloadable files
- ✅ Docker and npm installation info

## Semantic Versioning

Follow semantic versioning for version numbers:

```
MAJOR.MINOR.PATCH
v1.0.7
 ↓  ↓  ↓
 │  │  └─ Bug fixes (1.0.7 → 1.0.8)
 │  └──── Features (1.0.0 → 1.1.0)
 └─────── Breaking changes (1.0.0 → 2.0.0)
```

### Examples

**Bug fix (patch):** `1.0.6` → `1.0.7`
```bash
"version": "1.0.7"  // Fixed GHCR auth
```

**Feature (minor):** `1.0.7` → `1.1.0`
```bash
"version": "1.1.0"  // Added new product categories
```

**Breaking (major):** `1.0.7` → `2.0.0`
```bash
"version": "2.0.0"  // Redesigned API
```

## Automatic Deployments per Release

When a release is created, the following happens automatically:

### 1. Build & Publish (publish-packages.yml)
- ✅ npm publish to GitHub Packages
- ✅ Docker push to GitHub Container Registry (GHCR)

### 2. Deploy to Production (deploy-vercel.yml)
- ✅ Deploy to Vercel production
- ✅ Update live application

### 3. Docker Registry
- ✅ Image tags: `latest` and `v{version}`
- ✅ Available at: `ghcr.io/mostafa-said7/zyro-electric:{version}`

## Viewing Release Status

### GitHub Actions
1. Go to **Actions** tab
2. Select **Auto Tag Version** or **Auto Create Release**
3. View workflow run status

### GitHub Releases
1. Go to **Releases** tab
2. View all published releases
3. Download files or view details

## Troubleshooting

### Tag Already Exists
- Workflow skips if tag already exists
- Check GitHub Releases page
- Update version in package.json to a new number

### Release Not Created
1. Verify `auto-tag.yml` ran successfully
2. Check if tag was created: `git describe --tags`
3. Manually trigger workflow via GitHub Actions

### Manual Release Creation
If needed, manually create release:
```bash
git tag -a v1.0.7 -m "Release v1.0.7"
git push origin v1.0.7
```

## Best Practices

### ✅ Do:
- Update version in package.json for each release
- Write clear commit messages
- Test before pushing to main
- Follow semantic versioning
- Include breaking changes in commit messages

### ❌ Don't:
- Manually create tags (workflows do it automatically)
- Create duplicate version numbers
- Skip updating package.json version
- Push to main without proper testing

## Integration with CI/CD

Releases trigger additional workflows:

```
Version Updated
    ↓
[auto-tag.yml] Creates v1.0.7 tag
    ↓
[auto-release.yml] Creates GitHub Release
    ↓
[publish-packages.yml] Publishes npm + Docker
    ↓
[deploy-vercel.yml] Deploys to production
```

## Related Workflows

- **auto-tag.yml** - Automatic tagging
- **auto-release.yml** - Automatic release creation
- **publish-packages.yml** - npm and Docker publishing
- **deploy-vercel.yml** - Production deployment
- **build-app.yml** - Angular build verification
- **build-docker.yml** - Docker image build

## Next Steps

1. ✅ **Update version** in `package.json`
2. ✅ **Commit and push** to main
3. ✅ **Workflows run automatically**
4. ✅ **Release appears** on GitHub
5. ✅ **App deploys** to production

## Support

For issues or questions:
- Check GitHub Issues: https://github.com/Mostafa-SAID7/ZYRO-Electric/issues
- View Actions logs: https://github.com/Mostafa-SAID7/ZYRO-Electric/actions
- See Releases: https://github.com/Mostafa-SAID7/ZYRO-Electric/releases

---

**Last Updated:** August 11, 2026
**Version:** 1.0.7
**Status:** Production Ready ✅
