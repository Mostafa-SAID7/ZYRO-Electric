# Contributing to Market

Thank you for your interest in contributing to Market! We appreciate all contributions, from bug reports to feature requests and pull requests.

## Code of Conduct

- Be respectful and constructive
- Follow best practices
- Write clean, maintainable code
- Add tests for new features
- Update documentation

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/market.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Install dependencies: `npm install --legacy-peer-deps`
5. Make your changes
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Create a Pull Request

## Development Workflow

### Starting Development

```bash
npm install --legacy-peer-deps
npm start
```

Navigate to `http://localhost:4200/`

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Keep components small and focused

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Changes that don't affect meaning (formatting, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc

Example:
```
feat(cart): add coupon code support

Add ability to apply coupon codes to cart items with validation and discount calculation.

Closes #123
```

## Pull Request Process

1. Ensure all tests pass: `npm test`
2. Update README.md if needed
3. Update docs if behavior changes
4. Link related issues
5. Request review from maintainers
6. Address feedback and push updates

## Reporting Issues

### Bug Report

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, etc)
- Screenshots if applicable

### Feature Request

Include:
- Description of the feature
- Use cases
- Examples
- Proposed implementation (optional)

## Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Review documentation

## License

By contributing, you agree that your contributions will be licensed under the same MIT license.

---

Thank you for contributing! 🎉
