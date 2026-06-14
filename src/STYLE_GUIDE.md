# 🎨 Market App - Centralized Style Guide

## Overview

This project uses a **centralized design system** with CSS variables and Tailwind CSS. **All components inherit styles from `src/styles.scss`** - no custom colors or sizing in component styles.

---

## 📋 Rules

### ✅ DO:
- Use **CSS variables** from `src/styles.scss` for all colors
- Use **Tailwind classes** in HTML for layout and spacing
- Use **component SCSS only for layout** (flex, grid, margins)
- Reference **utility classes** from `src/styles.scss`
- Use **semantic HTML elements** with Tailwind classes
- Apply **animations from Tailwind** config (float, spin-slow, etc.)

### ❌ DON'T:
- ❌ Add **hard-coded colors** in component SCSS
- ❌ Create **duplicate utilities** already in `src/styles.scss`
- ❌ Use **Bootstrap or other CSS frameworks**
- ❌ Import **external stylesheets** without permission
- ❌ Override **CSS variables** in components
- ❌ Use **!important** flags

---

## 🎨 Available CSS Variables

All defined in `src/styles.scss` `:root` and `.light` sections:

```scss
/* Colors */
--background      /* Page background */
--foreground      /* Text color */
--primary         /* Accent gold: #E8C547 */
--primary-foreground    /* Gold text foreground */
--secondary       /* Secondary bg */
--secondary-foreground  /* Secondary text */
--accent          /* Same as primary */
--accent-foreground     /* Accent text */
--muted           /* Muted bg */
--muted-foreground      /* Muted text */
--card            /* Card bg */
--card-foreground /* Card text */
--border          /* Border color */
--input           /* Input field bg */
--ring            /* Focus ring color */

/* Sizing */
--radius          /* Border radius: 0.75rem */

/* Fonts */
--font-sans       /* Plus Jakarta Sans */
--font-arabic     /* Tajawal */
```

---

## 🎯 Tailwind Classes

### Typography
```html
<!-- Hero text -->
<h1 class="text-hero-xl">Giant heading</h1>

<!-- Section titles -->
<h2 class="text-section-xl">Section heading</h2>

<!-- Labels -->
<span class="section-label">SMALL LABEL</span>

<!-- Gradient text -->
<p class="gradient-text">Gold gradient text</p>
```

### Cards & Containers
```html
<!-- Basic card -->
<div class="card">Content</div>

<!-- Glass morphism -->
<div class="glass-card">Frosted glass</div>
<div class="glass-card-strong">Stronger glass</div>
```

### Effects & Glows
```html
<!-- Accent glow -->
<div class="accent-glow">Glowing element</div>

<!-- Strong glow -->
<div class="accent-glow-strong">Bright glow</div>

<!-- Border with glow -->
<div class="border-accent-glow">Bordered element</div>
```

### Buttons
```html
<!-- Primary button -->
<button class="btn-primary">Click me</button>

<!-- Outline button -->
<button class="btn-outline">Secondary</button>
```

### Forms
```html
<!-- Text input -->
<input type="text" class="form-input" placeholder="Enter text">

<!-- Error state -->
<input type="text" class="form-input error">
```

### Animations
```html
<!-- Float animation -->
<div class="animate-float">Floating element</div>

<!-- Slow spin -->
<div class="animate-spin-slow">Rotating</div>

<!-- Reverse spin -->
<div class="animate-spin-reverse">Counter-rotating</div>

<!-- Pulse glow -->
<div class="animate-pulse-glow">Pulsing</div>
```

### Reveal Animations
```html
<!-- Reveal from bottom -->
<div class="reveal-up">Content reveals</div>

<!-- Reveal from left -->
<div class="reveal-left">Content slides in</div>

<!-- Add class when visible -->
<div class="reveal-up active">Now visible</div>
```

### Tags & Skills
```html
<!-- Skill tag -->
<span class="tag-skill">Angular</span>
<span class="tag-skill">Tailwind CSS</span>
```

### Progress Bar
```html
<div class="progress-bar">
  <div class="progress-fill"></div>
</div>

<!-- Animated -->
<div class="progress-bar">
  <div class="progress-fill active"></div>
</div>
```

### Navigation
```html
<!-- Link with hover underline -->
<a class="nav-link-hover">About</a>
```

### Project Cards
```html
<!-- Card with hover effect -->
<div class="project-card-hover card">Project</div>
```

### Filters
```html
<!-- Filter button -->
<button class="filter-btn">All</button>
<button class="filter-btn active">Active filter</button>
```

### Blob Effects
```html
<!-- Accent blob -->
<div class="blob-accent"></div>

<!-- Secondary blob -->
<div class="blob-secondary"></div>
```

### Scrollbar
```html
<!-- Custom scrollbar on container -->
<div class="custom-scrollbar h-96 overflow-y-auto">
  Content with custom scrollbar
</div>

<!-- Hide scrollbar -->
<div class="scrollbar-hide overflow-x-auto">
  Hidden scrollbar
</div>
```

---

## 📦 Component Examples

### Product Card
```html
<!-- product.component.html -->
<div class="card project-card-hover accent-glow">
  <img src="..." alt="Product" />
  <div class="p-4">
    <h3 class="gradient-text">Product Name</h3>
    <p class="text-muted-foreground">Description</p>
    <span class="tag-skill">Featured</span>
    <button class="btn-primary mt-4">Buy Now</button>
  </div>
</div>
```

### Header
```html
<!-- header.component.html -->
<nav class="bg-card border-b border-border">
  <div class="content">
    <h1>Market</h1>
    <ul>
      <li class="nav-link-hover">Home</li>
      <li class="nav-link-hover">Products</li>
      <li class="nav-link-hover">Cart</li>
    </ul>
  </div>
</nav>
```

### Form Input
```html
<!-- form.component.html -->
<div class="mb-4">
  <label class="section-label">Email</label>
  <input type="email" class="form-input mt-2" placeholder="Enter email">
</div>

<div class="mb-4">
  <label class="section-label">Password</label>
  <input type="password" class="form-input mt-2" placeholder="Enter password">
</div>

<button class="btn-primary w-full">Submit</button>
```

---

## 🌓 Dark & Light Modes

The design system supports both modes:

```html
<!-- Light mode (default) -->
<html class="light">
  ...
</html>

<!-- Dark mode -->
<html class="">
  ...
</html>
```

Colors automatically switch based on the class.

---

## 📐 Spacing & Sizing

Use Tailwind's default spacing scale:

```html
<!-- Padding -->
<div class="p-4">Padding 1rem</div>
<div class="px-6 py-2">Horizontal & vertical</div>

<!-- Margin -->
<div class="m-4">Margin 1rem</div>
<div class="mt-8 mb-4">Top & bottom</div>

<!-- Gap -->
<div class="flex gap-4">Children spaced 1rem apart</div>

<!-- Width/Height -->
<div class="w-full h-96">Full width, 24rem height</div>
```

---

## 🎯 Best Practices

1. **Component SCSS should only handle layout:**
   ```scss
   .my-component {
     display: flex;
     gap: 1rem;
     padding: 2rem;
     /* NO COLORS HERE! */
   }
   ```

2. **Colors go in HTML via Tailwind/CSS variables:**
   ```html
   <div class="card bg-card text-foreground">
     Content uses CSS variables
   </div>
   ```

3. **Reuse utility classes:**
   ```html
   <!-- Instead of custom styles, use existing utilities -->
   <button class="btn-primary">Good</button>
   <!-- NOT: -->
   <button style="background: gold; ...">Bad</button>
   ```

4. **Media queries in SCSS:**
   ```scss
   .my-component {
     // Mobile first
     width: 100%;

     @media (min-width: 768px) {
       width: 50%;
     }
   }
   ```

---

## 🔄 Theme Colors at a Glance

| Variable | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--accent` | #E8C547 | #C9A832 |
| `--background` | #0A0A0A | #FAFAFA |
| `--foreground` | #FAFAFA | #0A0A0A |
| `--card` | #111111 | #FFFFFF |
| `--border` | #222222 | #E5E5E5 |
| `--muted` | #1A1A1A | #F0F0F0 |

---

## 🆘 Common Mistakes

❌ **WRONG:**
```scss
.my-card {
  background-color: #111111;  /* Hard-coded! */
  color: #FAFAFA;              /* Hard-coded! */
  border: 1px solid #222222;  /* Hard-coded! */
}
```

✅ **RIGHT:**
```html
<!-- In HTML -->
<div class="card">
  Content automatically uses theme colors
</div>
```

---

## 📚 Resources

- Tailwind Docs: https://tailwindcss.com/docs
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- Design Variables: See `src/styles.scss` `:root` section

---

**Last Updated:** June 14, 2026  
**Maintainer:** Market Dev Team
