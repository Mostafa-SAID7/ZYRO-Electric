# Backend - ASP.NET 9 Clean Architecture

## Project Structure

This backend follows **Clean Architecture** principles with clear separation of concerns.

### Layers Overview

```
backend/src/
├── Domain/                 # Core business logic & entities
│   ├── Entities/          # Domain models
│   ├── ValueObjects/      # Immutable value objects
│   ├── Aggregates/        # Aggregate roots
│   └── Specifications/    # Business rules & queries
│
├── Application/           # Use cases & application logic
│   ├── Dtos/             # Data Transfer Objects
│   ├── Commands/         # CQRS Commands
│   ├── Queries/          # CQRS Queries
│   ├── Handlers/         # Command/Query Handlers
│   ├── Validators/       # Fluent Validation
│   ├── Services/         # Application services
│   └── Exceptions/       # Custom exceptions
│
├── Infrastructure/        # External services & data access
│   ├── Persistence/      # Database context & repositories
│   ├── Services/         # External service integrations
│   ├── Authentication/   # Auth providers
│   ├── Logging/          # Logging implementations
│   └── Caching/          # Cache implementations
│
├── Presentation/         # API Controllers & API DTOs
│   ├── Controllers/      # REST API endpoints
│   ├── Middleware/       # Custom middleware
│   └── Filters/          # Action filters
│
└── Common/              # Shared utilities & constants
    ├── Constants/       # Application constants
    ├── Utilities/       # Helper functions
    └── Extensions/      # Extension methods
```

### Architecture Principles

- **Dependency Rule**: Inner layers should not depend on outer layers
- **SOLID Principles**: Applied throughout the codebase
- **DRY (Don't Repeat Yourself)**: Reusable components and services
- **KISS (Keep It Simple, Stupid)**: Clear and maintainable code

### Technology Stack

- **Framework**: ASP.NET 9
- **Database**: SQL Server (configurable)
- **ORM**: Entity Framework Core
- **CQRS**: MediatR
- **Validation**: FluentValidation
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Serilog
- **Dependency Injection**: Built-in .NET DI

### Key Responsibilities by Layer

**Domain Layer**
- Pure C# with no external dependencies
- Contains business logic and entities
- Defines interfaces for repositories and services

**Application Layer**
- Orchestrates domain entities for use cases
- Contains DTOs for request/response mapping
- Implements validation and business workflows
- Defines abstractions for infrastructure

**Infrastructure Layer**
- Implements repository pattern
- Database access via Entity Framework Core
- External service integrations
- Email, notifications, file storage

**Presentation Layer**
- REST API endpoints
- Request validation filters
- Error handling middleware
- API response formatting

### Getting Started

1. **Install Dependencies**
   ```bash
   cd backend
   dotnet restore
   ```

2. **Configure Database**
   - Update connection string in `appsettings.json`
   - Run migrations: `dotnet ef database update`

3. **Run Application**
   ```bash
   dotnet run
   ```

4. **API Documentation**
   - Swagger UI: `https://localhost:xxxx/swagger`

### Development Workflow

1. Define entities in Domain layer
2. Create DTOs in Application layer
3. Implement handlers/services in Application layer
4. Implement repositories in Infrastructure layer
5. Create controllers in Presentation layer

### Best Practices

- Keep domain logic in Domain layer, not in application services
- Use DTOs to shield internal models from API consumers
- Leverage CQRS pattern for read/write separation
- Write unit tests for Domain and Application layers
- Use dependency injection throughout
- Keep controllers thin and focused
