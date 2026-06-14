# 🛒 Market User - Modern Shopping Platform

> A lightning-fast, beautifully designed Angular e-commerce app with Tailwind CSS

[![Angular](https://img.shields.io/badge/Angular-18-red?style=flat-square&logo=angular)](https://angular.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Features

- 🎨 **Modern Design** - Tailwind CSS + Custom Components
- 🛍️ **Smart Browsing** - Fast product discovery & filtering
- 🛒 **Cart Management** - Smooth shopping experience
- 📱 **Responsive** - Works on all devices
- ⚡ **Performance** - Optimized for speed
- 🎯 **Icon Library** - Heroicons + Lucide icons
- 🌈 **Custom Scrollbar** - Beautiful gradient scrollbar
- 🚀 **Production Ready** - Netlify deployment ready

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

Navigate to `http://localhost:4200/` - app auto-reloads on changes.

---

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| **Angular** | 18.2 |
| **Tailwind CSS** | 3.4 |
| **TypeScript** | 5.4 |
| **RxJS** | 7.8 |
| **Heroicons** | 2.0 |
| **Lucide Icons** | 0.373 |

---

## 📦 Dependencies

### Core
- `@angular/*` - Framework
- `rxjs` - Reactive programming
- `zone.js` - Zone management

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/forms` - Form components
- `@tailwindcss/typography` - Typography styles
- `@tailwindcss/container-queries` - Container queries support
- `@tailwindcss/aspect-ratio` - Aspect ratio utilities

### Icons
- `@heroicons/angular` - Beautiful icon set
- `lucide-angular` - Modern icon library

---

## 🌐 Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo to Netlify
3. Netlify automatically reads `netlify.toml`
4. Auto-deploys on push

**Live:** [Your deployed URL]

### Manual Build

```bash
npm run build
# Output: dist/market/browser
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── products/          # Product listing & details
│   ├── carts/             # Shopping cart logic
│   ├── shared/            # Shared components & services
│   └── app.module.ts      # Main module
├── assets/                # Images, fonts, static files
├── styles.scss            # Global styles + Tailwind
└── index.html             # App shell
```

---

## 🎯 Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run watch` | Build in watch mode |

---

## 🔧 Configuration

- **Tailwind** → `tailwind.config.js`
- **PostCSS** → `postcss.config.js`
- **Netlify** → `netlify.toml`
- **Angular** → `angular.json`

---

## 💡 Tips

- Use Tailwind classes for styling (faster than manual CSS)
- Icons: `<lucide-icon name="shopping-cart"></lucide-icon>`
- Components: Check `src/app/shared/` for reusable components
- Responsive: Mobile-first approach with Tailwind breakpoints

---

<div align="center">

**[🔗 GitHub](https://github.com/Mostafa-SAID7/Market-User)** | **[📧 Contact](mailto:your-email@example.com)**

Made with ❤️ using Angular & Tailwind CSS

</div>
