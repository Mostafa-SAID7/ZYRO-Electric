# Frontend - Angular 18 E-Commerce Application

## Project Structure

This is a clean, modular Angular application following best practices and SOLID principles.

### Directory Organization

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/                    # Authentication module
│   │   ├── home/                    # Home page module
│   │   ├── products/                # Products/catalog module
│   │   ├── carts/                   # Shopping cart module
│   │   ├── orders/                  # Orders/history module
│   │   ├── checkout/                # Checkout process
│   │   ├── pages/                   # Standalone pages (about, contact, etc)
│   │   ├── shared/                  # Shared services, interceptors, guards
│   │   │   ├── services/           # Business logic services
│   │   │   ├── interceptors/       # HTTP interceptors
│   │   │   ├── guards/             # Route guards
│   │   │   ├── strategies/         # Strategy pattern implementations
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   ├── layout/             # Layout components (header, footer)
│   │   │   └── testing/            # Testing utilities & mocks
│   │   ├── app.config.ts           # App configuration
│   │   └── app.routes.ts           # Route definitions
│   ├── assets/                      # Static files (images, fonts, etc)
│   ├── styles/                      # Global styles
│   └── main.ts                      # Application entry point
├── angular.json                     # Angular CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── karma.conf.js                    # Karma test configuration
└── package.json                     # Dependencies
```

### Module Architecture

#### Core Modules (Functional)
- **Auth Module**: Login, register, authentication flow
- **Home Module**: Landing page, featured products, promotions
- **Products Module**: Product listing, filtering, search
- **Carts Module**: Shopping cart management
- **Orders Module**: Order history, tracking, invoices
- **Checkout Module**: Payment and order completion
- **Pages Module**: Static pages (about, contact, FAQs, etc)

#### Shared Module
- **Services**: Cache, storage, session, notifications, etc.
- **Interceptors**: HTTP request/response handling
- **Guards**: Route protection and authorization
- **Strategies**: Strategy pattern for extensible features
- **UI Components**: Reusable buttons, modals, spinners, etc.
- **Layout**: Header, footer, navigation components

### Key Features

✅ **Caching Strategy**
- Multi-layer caching (in-memory, localStorage, sessionStorage)
- Cache invalidation strategies
- TTL-based expiration

✅ **Authentication & Authorization**
- Session management
- Auth guards for route protection
- Token-based authentication

✅ **State Management**
- RxJS observables for reactive state
- Services for data persistence
- localStorage for user preferences

✅ **Performance**
- Lazy loading modules
- Code splitting
- Image optimization
- Minified bundle builds

✅ **Testing**
- Jasmine unit tests
- Karma test runner
- 80%+ code coverage target

### Technology Stack

- **Framework**: Angular 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms & Template-driven Forms
- **State Management**: RxJS & Services
- **Testing**: Jasmine & Karma
- **Icons**: Lucide Angular
- **Utilities**: lodash, date-fns

### Development Guidelines

1. **Component Structure**
   - Use standalone components where possible
   - Keep components focused and reusable
   - Separate presentation from business logic

2. **Services**
   - Single responsibility principle
   - Injectable with root scope
   - Handle HTTP calls and data transformation

3. **Styling**
   - Use Tailwind utility classes
   - SCSS for complex styling
   - Mobile-first approach

4. **Testing**
   - Unit test all services
   - Test critical components
   - Mock HTTP calls
   - Aim for 80%+ coverage

### Getting Started

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Development Server**
   ```bash
   npm start
   # or
   ng serve --open
   ```
   Navigate to `http://localhost:4200/`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   # or
   ng test
   ```

5. **Code Linting**
   ```bash
   npm run lint
   ```

### Build Outputs

- **Development Build**: Fast rebuild, unminified, with sourcemaps
- **Production Build**: Optimized, minified, tree-shaken, in `dist/` folder

### Performance Metrics

- Target Lighthouse Score: 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Bundle Size: < 500KB (gzipped)

### Best Practices Applied

✅ SOLID Principles
✅ Clean Code
✅ DRY (Don't Repeat Yourself)
✅ Reactive Programming
✅ Security (CSRF, XSS protection)
✅ Accessibility (WCAG compliance target)
✅ Performance Optimization
✅ SEO Friendly
