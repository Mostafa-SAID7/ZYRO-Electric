# 🛒 Market — Modern E-Commerce Platform

> A full-featured, production-ready e-commerce frontend built with **Angular 18**, **Tailwind CSS**, and a rich component library. Deployable via **Netlify**, **Docker**, or any static host.

[![Angular](https://img.shields.io/badge/Angular-18.2-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20.x-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify)](https://netlify.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)
[![CI](https://github.com/Mostafa-SAID7/Market-User/actions/workflows/build.yml/badge.svg)](https://github.com/Mostafa-SAID7/Market-User/actions)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** — Grid/list view with pagination and real-time filtering
- **Advanced Filters** — Category, price range, star rating, and stock status filters
- **Smart Search** — Instant search bar with debounce in the header
- **Sort Options** — Sort by newest, price (low/high), rating, and popularity
- **Product Details** — Rich product pages with image gallery, specs, and reviews
- **Related Products** — Suggested items on each product page

### 🛒 Cart & Checkout
- **Slide-out Cart Drawer** — Real-time cart with product images, quantity controls
- **Cart Page** — Full cart management with coupon code support
- **Checkout Flow** — Multi-step form with address and payment fields
- **Order Tracking** — Order history and status tracking page

### 👤 Authentication
- **Modal Auth System** — Login / Register modals embedded in the header
- **Form Validation** — Reactive forms with real-time error feedback
- **Session Persistence** — Auth state managed via `BehaviorSubject`

### 🎨 UI / Design
- **Dark / Light Mode** — CSS variable-based theming with smooth transitions
- **Premium Components** — Custom dropdowns, toasts, filter panel, sort dropdown
- **Lucide Icons** — Consistent icon set via `lucide-angular`
- **Glassmorphism & Micro-animations** — Modern design language throughout
- **Fully Responsive** — Mobile-first layouts from 320px to 4K
- **404 Page** — Animated, themed not-found page with navigation

### 🏗️ Architecture
- **Lazy-loaded Modules** — Products, Cart, Auth, Checkout, Orders each lazy loaded
- **Reactive Services** — `BehaviorSubject`-powered state for cart and products
- **Shared UI Library** — Reusable components in `shared/ui/components/`
- **Mock Data Layer** — Fully functional offline-first with realistic mock products

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** `20.x` or higher
- **npm** `9+`
- **Angular CLI** `18.x` (optional, for code generation)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Mostafa-SAID7/Market-User.git
cd Market-User

# Install dependencies (legacy peer deps required for Angular 18 compat)
npm install --legacy-peer-deps

# Start the development server
npm start
```

Open your browser at **[http://localhost:4200](http://localhost:4200)**

---

## 🐳 Docker

### Option 1 — Development with Docker

```bash
# Build and start the development container
docker-compose up

# App will be available at http://localhost:4200
```

### Option 2 — Production Build with Nginx

```bash
# Build the production image
docker build -t market-app .

# Run the production container
docker run -p 80:80 market-app

# App will be available at http://localhost
```

### Option 3 — Docker Compose (All-in-one)

```bash
# Production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Open http://localhost
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server with auto-open |
| `npm run build` | Production build → `dist/market/` |
| `npm run watch` | Development build with file watching |
| `npm test` | Run unit tests (Karma + Jasmine) |
| `npm run lint` | Lint TypeScript and templates |
| `npm run preview` | Serve production build locally |

---

## 📁 Project Structure

```
Market-User/
├── .github/
│   ├── workflows/
│   │   ├── build.yml          # CI: build & test on push/PR
│   │   └── deploy.yml         # CD: auto-deploy to Netlify
│   └── ISSUE_TEMPLATE/
├── src/
│   ├── app/
│   │   ├── auth/              # Login & Register components
│   │   ├── carts/             # Cart drawer, cart page, cart service
│   │   ├── checkout/          # Checkout form & order placement
│   │   ├── home/              # Landing page, hero, categories
│   │   ├── orders/            # Order history & tracking
│   │   ├── products/          # Product list, detail, filters, services
│   │   │   ├── components/
│   │   │   │   ├── all-products/     # Main product grid page
│   │   │   │   ├── product/          # Product card component
│   │   │   │   └── products-details/ # Product detail page
│   │   │   ├── data/                 # Mock product data
│   │   │   ├── models/               # Product interfaces
│   │   │   └── services/             # ProductsService
│   │   └── shared/
│   │       ├── components/           # Header, Footer, Select
│   │       ├── data/                 # Shared mock data & constants
│   │       └── ui/
│   │           └── components/       # Reusable UI library
│   │               ├── card/         # Product card UI
│   │               ├── drawer/       # Slide-out drawer
│   │               ├── filter-panel/ # Advanced filter sidebar
│   │               ├── input/        # Form input wrapper
│   │               ├── not-found/    # 404 page component
│   │               ├── pagination/   # Page navigation
│   │               ├── search-bar/   # Header search
│   │               ├── sort-dropdown/# Custom sort select
│   │               └── toast/        # Notification toasts
│   ├── environments/
│   │   ├── environment.ts            # Dev environment config
│   │   └── environment.prod.ts       # Production environment config
│   ├── styles.scss                   # Global design system & utilities
│   └── scrollbar.scss                # Custom scrollbar styles
├── docs/                             # Extended documentation
├── Dockerfile                        # Production multi-stage build
├── Dockerfile.dev                    # Development container
├── docker-compose.yml                # Docker Compose config
├── nginx.conf                        # Nginx config for production
├── netlify.toml                      # Netlify deployment config
├── angular.json                      # Angular workspace config
├── tailwind.config.js                # Tailwind CSS customization
└── tsconfig.json                     # TypeScript config
```

---

## 🧩 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Angular | 18.2 |
| Language | TypeScript | 5.4 |
| Styling | Tailwind CSS | 3.4 |
| Icons | Lucide Angular | 0.394 |
| State | RxJS BehaviorSubject | 7.8 |
| HTTP | Angular HttpClient | 18.2 |
| Forms | Angular Reactive Forms | 18.2 |
| Routing | Angular Router | 18.2 |
| Build | Angular CLI / Webpack | 18.2 |
| Server | Nginx (Docker) | 1.27 Alpine |
| CI/CD | GitHub Actions | - |
| Hosting | Netlify | - |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# API Configuration (when connecting to a real backend)
API_BASE_URL=https://api.yourmarket.com
API_VERSION=v1

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_MOCK_DATA=true

# Netlify (for GitHub Actions deployment)
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

> **Note:** Currently the app runs fully on mock data. No backend required.

---

## 🔄 CI / CD Pipeline

### GitHub Actions

| Workflow | Trigger | Steps |
|---|---|---|
| **Build & Test** (`build.yml`) | Push/PR to `main`, `develop` | Install → Build → Test → Upload artifacts |
| **Deploy** (`deploy.yml`) | Push to `main` | Install → Build → Deploy to Netlify |

### Netlify (Direct)
The app is also connected directly to Netlify for instant deploys on every push to `main`. Configuration in [`netlify.toml`](./netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "dist/market"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🐳 Docker Details

### Production Image
- **Base:** `node:20-alpine` (build stage) + `nginx:1.27-alpine` (serve stage)
- **Multi-stage build** — final image contains only static assets + Nginx
- **Image size:** ~25MB (compressed)
- **Port:** `80`

### Development Image
- **Base:** `node:20-alpine`
- **Hot reload** via Angular's `ng serve`
- **Port:** `4200`
- **Volume mounts:** `src/` for live editing

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed guidelines.

---

## 📄 Documentation

| Document | Description |
|---|---|
| [Setup Guide](./docs/SETUP.md) | Detailed local setup instructions |
| [Deployment Guide](./docs/DEPLOYMENT.md) | Netlify, Docker, and manual deployment |
| [Project Summary](./docs/PROJECT_SUMMARY.md) | Architecture decisions and design patterns |
| [Contributing](.github/CONTRIBUTING.md) | How to contribute to the project |

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using Angular 18 + Tailwind CSS</sub>
</div>
