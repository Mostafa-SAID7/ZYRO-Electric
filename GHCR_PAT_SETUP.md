# GitHub Container Registry (GHCR) Push - Personal Access Token Setup

## Problem
Docker push to GHCR fails with: `denied: permission_denied: write_package`

**Root Cause:** The default `GITHUB_TOKEN` doesn't have sufficient scope for pushing packages to GHCR.

## Solution: Create a Personal Access Token (PAT)

### Step 1: Create Personal Access Token (PAT)

Go to GitHub Settings:
- **URL:** https://github.com/settings/tokens/new
- **Or:** GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

### Step 2: Token Configuration

**Token Name:** `GHCR_PAT` or `PUBLISH_PAT`

**Expiration:** 90 days or 1 year (recommended: 1 year for CI/CD stability)

**Scopes Required:**
```
✅ read:packages       (read container packages)
✅ write:packages      (push container images) ← REQUIRED FOR DOCKER PUSH
✅ delete:packages     (optional: delete old images)
✅ repo               (optional: full repo access for workflows)
```

### Step 3: Copy Token

- **GitHub shows token once** - copy it immediately
- Token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- DO NOT share this token

### Step 4: Add Token to GitHub Secrets

1. Go to your repository: https://github.com/Mostafa-SAID7/ZYRO-Electric
2. Navigate to:
   - **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. **Secret name:** `GHCR_PAT`
5. **Secret value:** Paste your PAT token
6. Click **"Add secret"**

### Step 5: Update Workflow

Update `.github/workflows/publish-packages.yml`:

```yaml
- name: Log in to GHCR
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY }}
    username: ${{ github.actor }}
    password: ${{ secrets.GHCR_PAT }}  # ← USE NEW PAT SECRET
```

### Step 6: Commit & Push

```bash
git add .github/workflows/publish-packages.yml
git commit -m "feat: use GHCR_PAT for Docker push authentication"
git push origin main
```

## Testing

Once configured, the Docker push should work on next push to `main` branch or manually trigger publish workflow.

### Verify in GitHub Actions

1. Go to **Actions → Publish Packages**
2. Check **publish-docker** job
3. Should see: ✅ `Build and push Docker image`
4. Verify image appears in: https://github.com/Mostafa-SAID7/ZYRO-Electric/pkgs/container/zyro-electric

## Security Notes

⚠️ **Important:**
- PAT tokens are sensitive - treat like passwords
- Use short expiration dates for security
- Rotate tokens periodically
- Use minimal required scopes
- Never commit tokens to git

## Alternative: Use GitHub App Token

For better security, you can use GitHub App tokens instead of personal PAT tokens (more complex setup but more secure).

## Troubleshooting

**Still getting `permission_denied: write_package`?**
1. Verify PAT has `write:packages` scope
2. Verify secret name is correct: `GHCR_PAT`
3. Verify workflow uses: `password: ${{ secrets.GHCR_PAT }}`
4. Regenerate token if unsure

**Token expired?**
- Go back to https://github.com/settings/tokens
- Regenerate or create new token
- Update secret in repository

## References

- [GitHub Docs: Creating a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub Docs: Pushing to GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [GitHub Actions: docker/login-action](https://github.com/docker/login-action)
