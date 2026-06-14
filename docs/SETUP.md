# 🛠️ Setup & Installation Guide

## Prerequisites

- Node.js 20+ (Recommended: 20.x LTS)
- npm 10+ or yarn
- Git

## Installation Steps

### 1. Install Dependencies

```bash
# Clean install with legacy peer deps flag (fixes OpenSSL issue on Node 22)
npm install --legacy-peer-deps

# Or if you prefer yarn
yarn install
```

### 2. Verify Installation

```bash
# Check Angular CLI
ng version

# Check Node and npm
node --version
npm --version
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:4200/`

## Troubleshooting

### Issue: `ERR_OSSL_EVP_UNSUPPORTED` on Netlify

**Solution:** Already configured in `netlify.toml` with:
```
NODE_OPTIONS = "--openssl-legacy-provider"
NODE_VERSION = "20"
```

### Issue: Port 4200 Already in Use

```bash
# Use different port
ng serve --port 4201
```

### Issue: Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Build & Deployment

### Local Build

```bash
npm run build
# Output: dist/market/
```

### Deploy to Netlify

1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Netlify auto-reads `netlify.toml`
4. Build command: `npm run build`
5. Publish directory: `dist/market/browser`

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Development Tips

### Add New Component

```bash
ng generate component components/product-card
```

### Add New Service

```bash
ng generate service services/product
```

### Format Code

```bash
# Using Prettier (optional)
npm install --save-dev prettier
npx prettier --write "src/**/*.{ts,html,scss}"
```

## Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (port 4200) |
| `npm run build` | Production build |
| `npm run preview` | Preview prod build |
| `npm test` | Run unit tests |
| `npm run watch` | Watch mode build |
| `ng lint` | Lint code (if configured) |

## Environment Variables

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env` with your API endpoints and settings.

## Hot Module Replacement (HMR)

Already enabled in development mode. Changes auto-reload without full refresh.

## Performance Tips

1. **Lazy load modules** - Split code for better performance
2. **Use OnPush change detection** - In components
3. **Optimize images** - Compress before committing
4. **Minify CSS/JS** - Automatic in production build
5. **Enable service workers** - For offline support

---

Need help? Check [README.md](./README.md) or open an issue.
