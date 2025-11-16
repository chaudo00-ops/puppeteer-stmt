# CLAUDE.md - AI Assistant Guide for puppeteer-stmt

## Project Overview

**puppeteer-stmt** is a React + TypeScript + Vite web application using React 19 and modern tooling.

**Tech Stack:**
- React 19.2.0 (with React 19 DOM)
- TypeScript 5.9.3 (strict mode)
- Vite 7.2.2 (rolldown-vite variant)
- ESLint 9.39.1 (flat config format)
- CSS (vanilla, no preprocessor)

## Repository Structure

```
puppeteer-stmt/
├── src/
│   ├── main.tsx           # Application entry point
│   ├── App.tsx            # Root component
│   ├── App.css            # Component-specific styles
│   ├── index.css          # Global styles
│   └── assets/            # Static assets (SVG logos, etc.)
├── public/                # Public static files
├── dist/                  # Build output (gitignored)
├── node_modules/          # Dependencies (gitignored)
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript project references
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node/build tools TypeScript config
├── eslint.config.js       # ESLint flat config
└── .gitignore             # Git ignore patterns
```

## Development Workflows

### Available Scripts

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev` | Start development server with HMR | Local development |
| `npm run build` | Type-check and build for production | Before deployment |
| `npm run lint` | Run ESLint on the codebase | Code quality checks |
| `npm run preview` | Preview production build locally | Testing production builds |

### Development Server

- Runs on Vite dev server with Hot Module Replacement (HMR)
- Changes to `.tsx` files trigger instant updates
- Uses `@vitejs/plugin-react` with Babel/oxc for Fast Refresh

### Build Process

1. TypeScript compilation (`tsc -b`)
2. Vite bundling and optimization
3. Output to `dist/` directory

## TypeScript Configuration

### Strict Type Checking

This project uses **strict TypeScript** settings. When writing code:

- All types must be explicit or properly inferred
- No implicit `any` types allowed
- Unused locals and parameters will cause errors
- Strict null checks are enforced

### Key Compiler Options

**Application Code (`tsconfig.app.json`):**
- Target: ES2022
- Module: ESNext
- JSX: react-jsx (React 17+ transform)
- Module Resolution: bundler
- Strict mode: enabled
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `noFallthroughCasesInSwitch`: true
- `erasableSyntaxOnly`: true
- `noUncheckedSideEffectImports`: true

**Build Tools (`tsconfig.node.json`):**
- Target: ES2023
- Applies to `vite.config.ts`

### TypeScript Best Practices

1. Always define prop types for components
2. Use TypeScript interfaces for complex types
3. Leverage type inference where appropriate
4. Avoid `any` - use `unknown` if type is truly unknown
5. Enable all strict checks before committing

## ESLint Configuration

### Flat Config Format

This project uses **ESLint 9+ flat config** (`eslint.config.js`), not the legacy `.eslintrc` format.

### Active Rules

- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `react-hooks` flat config
- `react-refresh` Vite config

### Linting Best Practices

1. Run `npm run lint` before committing
2. Fix auto-fixable issues with `npm run lint -- --fix`
3. React hooks must follow Rules of Hooks
4. Components must be named exports for Fast Refresh

## React Conventions

### Component Structure

**Current Pattern:**
```tsx
import { useState } from 'react'
import './Component.css'

function Component() {
  // Component logic
  return (
    // JSX
  )
}

export default Component
```

### React 19 Features

- Uses React 19.2.0 (latest stable)
- StrictMode enabled in `main.tsx`
- React Compiler NOT enabled (for performance reasons)

### State Management

- Currently uses `useState` for local state
- No global state management library configured
- Consider adding Context API or external library if needed

### Styling Approach

- **CSS Strategy:** Vanilla CSS files
- **Global styles:** `src/index.css`
- **Component styles:** Co-located `.css` files (e.g., `App.css`)
- **Theme:** Supports light/dark mode via `prefers-color-scheme`

## Code Quality Standards

### When Adding New Features

1. **Type Safety:** All new code must be fully typed
2. **Component Structure:** Follow functional component pattern
3. **Imports:** Use explicit `.tsx` extensions
4. **Styling:** Add component-specific CSS files
5. **Linting:** Ensure ESLint passes without warnings
6. **Build:** Verify `npm run build` succeeds

### File Naming Conventions

- Components: PascalCase (e.g., `App.tsx`, `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- CSS: Match component name (e.g., `App.css`)
- Types: PascalCase interfaces/types (e.g., `User`, `ApiResponse`)

### Import Conventions

```tsx
// React imports first
import { useState, useEffect } from 'react'

// External libraries
import someLibrary from 'some-library'

// Local imports
import Component from './Component.tsx'
import './styles.css'

// Assets last
import logo from './assets/logo.svg'
```

## Git Workflow

### Branch Strategy

- **Main branch:** Production-ready code
- **Feature branches:** `claude/` prefix for AI-generated changes
- Current branch: `claude/claude-md-mi0zs7hyddeqf3ji-016QinbM1qG2Rm2fYFdYw6Ej`

### Commit Guidelines

1. Write clear, descriptive commit messages
2. Commit related changes together
3. Run build and lint before committing
4. Use conventional commit format when possible

### Ignored Files

Key files in `.gitignore`:
- `node_modules/`
- `dist/` and `dist-ssr/`
- Log files (`*.log`)
- Editor configs (except `.vscode/extensions.json`)
- OS files (`.DS_Store`)

## Common Tasks for AI Assistants

### Adding a New Component

1. Create `ComponentName.tsx` in `src/`
2. Create `ComponentName.css` if needed
3. Export component as default
4. Import and use in parent component
5. Verify types with `tsc -b`

### Updating Dependencies

1. Update `package.json` versions
2. Run `npm install`
3. Test with `npm run dev`
4. Run `npm run build` to verify
5. Check for breaking changes

### Fixing Type Errors

1. Run `npm run build` to see all errors
2. Fix strictest types first
3. Avoid using `any` or `@ts-ignore`
4. Use type guards for runtime checks
5. Verify with `npm run build` again

### Debugging Build Issues

1. Check TypeScript errors: `tsc -b`
2. Check ESLint: `npm run lint`
3. Clear cache: `rm -rf node_modules/.vite`
4. Rebuild: `npm run build`

## Important Notes for AI Assistants

### DO

- Always run `npm run build` before committing significant changes
- Use strict TypeScript types
- Follow existing code patterns
- Test in development mode first
- Keep components small and focused
- Add types for all props and state

### DON'T

- Don't use legacy ESLint config format
- Don't disable TypeScript strict checks
- Don't add `any` types without strong justification
- Don't skip linting checks
- Don't commit with build errors
- Don't enable React Compiler without discussing performance impact

### Vite-Specific Considerations

1. **HMR:** Preserved through React Fast Refresh
2. **Imports:** Can use `.tsx` extensions due to `allowImportingTsExtensions`
3. **Public Files:** Place in `/public` directory
4. **Environment Variables:** Prefix with `VITE_`
5. **Rolldown:** Uses `rolldown-vite` (Rust-based bundler)

## Testing Strategy

**Current State:** No testing framework configured

**Recommendations for Adding Tests:**
- Vitest (Vite-native test runner)
- React Testing Library
- Add `test` script to package.json

## Performance Considerations

1. **React Compiler:** Not enabled - consider for large apps
2. **Code Splitting:** Use dynamic imports for large components
3. **Bundle Analysis:** Add `rollup-plugin-visualizer` for analysis
4. **HMR:** Optimized through Fast Refresh

## Accessibility

**Current State:** Basic semantic HTML

**Improvements to Consider:**
- Add ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Use semantic HTML elements
- Add alt text for images

## Security Best Practices

1. No sensitive data in client-side code
2. Validate all user inputs
3. Use HTTPS in production
4. Keep dependencies updated
5. Review dependency vulnerabilities: `npm audit`

## Deployment

**Build Output:** `dist/` directory

**Deployment Steps:**
1. Run `npm run build`
2. Test with `npm run preview`
3. Deploy `dist/` contents to hosting
4. Configure server for SPA routing

**Compatible Hosting:**
- Vercel
- Netlify
- GitHub Pages
- Any static host

## Resources

- [Vite Documentation](https://vite.dev/)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

## Questions or Issues?

When encountering issues:
1. Check this CLAUDE.md first
2. Review error messages carefully
3. Verify TypeScript and ESLint pass
4. Check the README.md for additional context
5. Consult official documentation

---

**Last Updated:** 2025-11-16
**Repository:** puppeteer-stmt
**Maintained for:** AI assistants working with this codebase
