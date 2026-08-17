# ZYRO Electric - Project Structure

## Overview

This is a **monorepo** project with separate frontend and backend applications, designed with clean architecture principles.

```
ZYRO-Electric/
├── frontend/                    # Angular 18 Frontend Application
│   ├── src/                    # Source code
│   ├── angular.json            # Angular configuration
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend documentation
│
├── backend/                     # ASP.NET 9 Backend API
│   ├── src/                    # Source code with clean architecture layers
│   ├── *.csproj                # Project files
│   ├── appsettings.json        # Configuration
│   └── README.md               # Backend documentation
│
├── docs/                        # Project documentation
│   ├── CACHING-STRATEGY.md
│   ├── API-DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   └── ...
│
├── scripts/                     # Build and utility scripts
│   ├── generate-cache-report.js
│   └── ...
│
├── .github/                     # GitHub Actions workflows
│   ├── workflows/
│   │   ├── build-app.yml
│   │   ├── run-tests.yml
│   │   ├── publish-packages.yml
│   │   └── ...
│   └── ISSUE_TEMPLATE/
│
├── .gitignore                   # Git ignore patterns
├── package.json                 # Root package.json (shared scripts)
├── PROJECT_STRUCTURE.md         # This file
└── README.md                    # Main project README
```

## Working with Monorepo

### Frontend Development

```bash
cd frontend
npm install
npm start              # Development server on http://localhost:4200
npm test              # Run tests
npm run build         # Production build
npm run lint          # Lint code
```

### Backend Development

```bash
cd backend
dotnet restore
dotnet build
dotnet run            # Development server on https://localhost:5001
dotnet test           # Run tests
```

### Root Level Commands (from project root)

```bash
# Frontend commands
npm run frontend:install
npm run frontend:start
npm run frontend:build
npm run frontend:test

# Backend commands
npm run backend:install
npm run backend:build
npm run backend:start
```

## Architecture Decisions

### Frontend (Angular 18)
- **Standalone Components**: Modern Angular approach without NgModules
- **Clean Modules**: Logical feature separation
- **Shared Services**: Centralized business logic
- **Reactive Programming**: RxJS for state management
- **Lazy Loading**: Performance optimization
- **Multi-layer Caching**: Improved user experience

### Backend (ASP.NET 9)
- **Clean Architecture**: Domain → Application → Infrastructure → Presentation
- **CQRS Pattern**: Separate read and write operations
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Built-in .NET DI container
- **Entity Framework Core**: ORM for database access
- **MediatR**: CQRS implementation

## Technology Stack

### Frontend
- Angular 18
- TypeScript 5
- Tailwind CSS
- RxJS 7
- Lucide Angular (Icons)

### Backend
- ASP.NET Core 9
- Entity Framework Core
- MediatR
- FluentValidation
- Serilog
- Swagger/OpenAPI

### DevOps & CI/CD
- GitHub Actions
- Docker
- GitHub Packages
- Vercel (Frontend Deployment)

## Development Workflow

### Feature Development
1. Create feature branch from `develop`
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make changes in `frontend/` or `backend/`

3. Commit changes with semantic commit messages
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

4. Push to remote
   ```bash
   git push origin feature/feature-name
   ```

5. Create Pull Request to `develop`

### Release Process
1. Create PR from `develop` to `main`
2. All tests must pass
3. Code review required
4. Merge to `main`
5. Automatic release created with version bump
6. Artifacts published to GitHub Packages

## Branches

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/\***: Feature branches
- **bugfix/\***: Bug fix branches
- **hotfix/\***: Hotfix branches
- **feature/backend-setup**: Backend infrastructure setup

## CI/CD Pipelines

### Build Pipeline
- Runs on: `push to develop, testing, main`
- Steps: Install → Build → Lint → Test

### Test Pipeline
- Runs on: Pull requests
- Steps: Install → Test → Coverage report

### Publish Pipeline
- Runs on: Tag push (v\*)
- Steps: Build → Test → Publish to GitHub Packages

## Security Considerations

✅ **Secrets Management**
- GitHub Secrets for sensitive data
- Environment-based configuration
- No credentials in code

✅ **Supply Chain Security**
- Pinned dependencies
- Commit SHA for GitHub Actions
- `--ignore-scripts` for npm install
- Signed commits

✅ **API Security**
- CORS configuration
- CSRF protection
- JWT authentication
- Secure cookie handling

## Performance Targets

### Frontend
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Bundle Size: < 500KB (gzipped)
- Time to Interactive: < 3s

### Backend
- API Response Time: < 200ms
- Database Query Time: < 100ms
- Throughput: 1000+ requests/second

## Monitoring & Logging

- **Frontend**: Browser console, client-side error tracking
- **Backend**: Serilog structured logging
- **CI/CD**: GitHub Actions workflow logs
- **Performance**: Lighthouse CI, performance metrics

## Contributing

1. Read the CONTRIBUTING.md guide
2. Follow code style guidelines (ESLint, Roslyn)
3. Write tests for new features
4. Update documentation
5. Submit PR with detailed description

## Resources

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Caching Strategy](./docs/CACHING-STRATEGY.md)
- [API Documentation](./docs/API-DOCUMENTATION.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Support

- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Documentation: `/docs` folder
