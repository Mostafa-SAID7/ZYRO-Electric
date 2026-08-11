# 📦 Publish Docker Image to GitHub Packages

## Current Status
- **Docker Hub**: ✅ LIVE (msaid356/zyro-electric)
- **GitHub Packages (GHCR)**: Requires setup (Personal Access Token)

## Why GitHub Shows "No packages published"

GitHub Packages requires authentication with a Personal Access Token (PAT) to push Docker images. The GITHUB_TOKEN used in GitHub Actions has limited permissions.

## Option 1: Manual Push to GitHub Packages (Recommended for Getting Started)

### Step 1: Create Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Configure:
   - **Token name**: `GHCR_TOKEN`
   - **Scopes**: `write:packages`, `read:packages`, `delete:packages`
   - **Expiration**: 90 days
4. Copy the token (won't see it again!)

### Step 2: Login to GitHub Container Registry Locally

```bash
# Use your token from Step 1
echo YOUR_PAT_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

Example:
```bash
echo "ghp_xxxxxxxxxxxxxxxxxxxxx" | docker login ghcr.io -u Mostafa-SAID7 --password-stdin
```

### Step 3: Build and Tag Docker Image

```bash
# Build the image
docker build -t ghcr.io/mostafa-said7/zyro-electric:latest .

# Alternative tag with main branch
docker build -t ghcr.io/mostafa-said7/zyro-electric:main .
```

### Step 4: Push to GitHub Packages

```bash
# Push latest tag
docker push ghcr.io/mostafa-said7/zyro-electric:latest

# Push main branch tag
docker push ghcr.io/mostafa-said7/zyro-electric:main
```

### Step 5: Verify in GitHub

1. Go to: https://github.com/Mostafa-SAID7/ZYRO-Electric/pkgs/container/zyro-electric
2. You should see your pushed images!

---

## Option 2: Automated Push via GitHub Actions (Requires Setup)

### Step 1-2: Same as Manual (create PAT)

### Step 3: Add PAT to Repository Secrets

1. Go to: https://github.com/Mostafa-SAID7/ZYRO-Electric/settings/secrets/actions
2. Click "New repository secret"
3. **Name**: `GH_PAT`
4. **Value**: Your PAT token from Step 1
5. Click "Add secret"

### Step 4: Update publish-docker.yml

Replace the "Log in to GitHub Container Registry" step:

```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GH_PAT }}  # Use GH_PAT instead of GITHUB_TOKEN
```

### Step 5: Enable Push in Workflow

In the "Build and push Docker image" step, change `push: false` to `push: true`:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    file: ./Dockerfile
    push: true  # Change from false to true
    tags: ghcr.io/mostafa-said7/zyro-electric:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### Step 6: Commit and Push

Changes will trigger the workflow automatically.

---

## Quick Checklist

### For Manual Push:
- [ ] Create Personal Access Token (PAT)
- [ ] `docker login ghcr.io` with PAT
- [ ] `docker build` the image
- [ ] `docker push` to ghcr.io
- [ ] Verify on GitHub Packages page

### For Automated Push:
- [ ] Create Personal Access Token (PAT)
- [ ] Add PAT as `GH_PAT` secret
- [ ] Update `publish-docker.yml` workflow
- [ ] Commit changes
- [ ] Verify workflow runs
- [ ] Check GitHub Packages page

---

## Verification

After pushing (manual or automated), verify here:
```
https://github.com/Mostafa-SAID7/ZYRO-Electric/pkgs/container/zyro-electric
```

You should see:
- Image tags (latest, main, etc.)
- Image size
- Last updated timestamp
- Download command: `docker pull ghcr.io/mostafa-said7/zyro-electric:latest`

---

## Docker Hub vs GitHub Packages

| Feature | Docker Hub | GitHub Packages |
|---------|-----------|-----------------|
| **Status** | ✅ LIVE | ⏳ Setup required |
| **Primary Target** | ✅ Yes | ⏳ Optional |
| **Authentication** | ✅ User/password | ✅ PAT required |
| **Command** | `docker pull msaid356/zyro-electric:latest` | `docker pull ghcr.io/mostafa-said7/zyro-electric:latest` |
| **Setup Time** | None | ~5 minutes |

---

## Current Workflow Status

```
GitHub Actions Workflow
├─ build.yml ✅ (builds Angular app)
├─ docker-build.yml ✅ (builds Docker image locally)
├─ publish-docker.yml ⏳ (ready for PAT setup)
└─ deploy.yml ✅ (Netlify ready)
```

---

## Manual Push Command (Quickest Way)

```bash
# 1. Login (one time per machine)
echo "YOUR_PAT_TOKEN" | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# 2. Build
docker build -t ghcr.io/mostafa-said7/zyro-electric:latest .

# 3. Push
docker push ghcr.io/mostafa-said7/zyro-electric:latest

# 4. Verify
docker pull ghcr.io/mostafa-said7/zyro-electric:latest
```

---

## Resources

- [GitHub Container Registry Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Docker CLI Login](https://docs.docker.com/engine/reference/commandline/login/)

---

**Status**: Ready to publish - choose Option 1 (manual) or Option 2 (automated)
