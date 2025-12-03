# Project Configuration & Dependencies Review
## ableton-js v3.7.1

---

## 1. PACKAGE.JSON ANALYSIS

### Current State:
- **Version**: 3.7.1
- **Main entry**: index.js (compiled from TypeScript)
- **Build output**: All .js, .d.ts, and midi-script/*.py files

### Outdated Dependencies Pattern:
```
MAJOR UPDATES AVAILABLE:
- uuid: 8.3.2 → 13.0.0 (major)
- lru-cache: 7.18.3 → 11.2.2 (major, 4+ versions behind)
- @types/uuid: 8.3.4 → 11.0.0 (major)
- vitest: 0.32.4 → 4.0.9 (major, 3+ major versions behind)
- @types/node: 20.17.6 → 24.10.1 (CURRENT: 20.3.0 in package.json)
- typescript: 5.6.3 → 5.9.3 (patch available)
- prettier: 3.3.3 → 3.6.2 (minor available)

MINOR UPDATES AVAILABLE:
- p-all: 3.0.0 → 5.0.1 (minor)
- tsx: 3.14.0 → 4.20.6 (major)
```

### Missing Dev Dependencies:
```
CRITICAL GAPS:
❌ ESLint (no linting configured)
❌ @typescript-eslint (for TypeScript linting)
❌ Husky (no git hooks)
❌ lint-staged (pre-commit linting)
❌ JSDoc/TSDoc (no API doc generation tools installed)
  (Note: jsdoc2md.json exists but no dependency)

RECOMMENDATIONS:
✓ @typescript-eslint/eslint-plugin: ^7.0.0
✓ @typescript-eslint/parser: ^7.0.0
✓ eslint: ^8.50.0
✓ husky: ^8.0.3
✓ lint-staged: ^15.0.0
✓ jsdoc-to-markdown: ^8.0.0
```

### Script Organization Issues:
```
CURRENT STRUCTURE (somewhat scattered):
├── ableton:* (macOS-specific Ableton control - 6 commands)
├── ableton10/11/12:* (version-specific)
├── build:* (1 doc generation, 1 compilation)
├── prepublishOnly & version (release scripts)
├── format (prettier only - no linting)
└── test (vitest)

GAPS:
❌ No pre-commit hook script
❌ No pre-push validation
❌ No lint script
❌ No type-check script (separate from build)
❌ No separate dev vs prod build scripts
❌ No watch mode for development
```

### Recommended Script Additions:
```json
{
  "scripts": {
    "lint": "eslint src/ --ext .ts",
    "lint:fix": "eslint src/ --ext .ts --fix",
    "type-check": "tsc --noEmit",
    "format:check": "prettier --check src/",
    "format": "prettier --write src/",
    "test:watch": "vitest",
    "dev": "tsc --watch",
    "validate": "yarn type-check && yarn lint && yarn test",
    "prepush": "yarn validate",
    "prepare": "husky install"
  }
}
```

### Package Metadata:
✅ COMPLETE:
- name, version, description
- author, license
- repository with GitHub URL
- files array (explicitly includes .d.ts)

---

## 2. TSCONFIG.JSON ANALYSIS

### Current Configuration:
```json
{
  "target": "ES2022",           // ✅ Modern
  "module": "commonjs",         // ✅ Appropriate for Node
  "strict": true,               // ✅ Good
  "declaration": true,          // ✅ Good (generates .d.ts)
  "esModuleInterop": true,     // ✅ Good
  "allowJs": false,             // ✅ Good (TypeScript only)
  "outDir": "./",              // ⚠️  Outputs to root (mingled with source)
  "rootDir": "./src/"          // ✅ Good
}
```

### Issues Found:
1. **No Path Aliases**: Making imports verbose
   ```
   // Current: need relative paths
   import { Song } from "./ns/song"
   
   // Could be:
   import { Song } from "@/ns/song"
   ```

2. **Missing Compiler Options**:
   ```
   ❌ sourceMap: false          // No source maps for debugging
   ❌ skipLibCheck: true        // Not set (slower compilation)
   ❌ resolveJsonModule: true   // Can't import JSON
   ❌ noEmit: false             // Not set for type-checking
   ❌ forceConsistentCasingInFileNames: true
   ❌ moduleResolution          // Not explicitly set (uses old default)
   ```

3. **Test Files Configuration**:
   - Spec files excluded from build ✅
   - But no separate test tsconfig

### Recommended tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/ns/*": ["src/ns/*"],
      "@/util/*": ["src/util/*"]
    },
    "types": ["node", "vitest/globals"]
  },
  "include": ["./src/**/*", "./scripts/**/*"],
  "exclude": ["**/*.spec.ts", "node_modules", "dist"]
}
```

---

## 3. LINTING & FORMATTING

### Current State:
```
ESLint:      ❌ NOT CONFIGURED
Prettier:    ⚠️  MINIMAL CONFIG
Git Hooks:   ❌ NO HUSKY
CI/CD:       ⚠️  NO GitHub Actions workflows
```

### Prettier Configuration (Current):
```json
{
  "trailingComma": "all",    // ✅ Good
  "proseWrap": "always"      // ✅ Good for docs
}
```

### Missing Prettier Options:
```json
{
  "trailingComma": "all",
  "proseWrap": "always",
  "semi": true,              // Should enforce semicolons
  "singleQuote": false,      // Should use double quotes
  "tabWidth": 2,             // Specify indent
  "useTabs": false,          // Prefer spaces
  "printWidth": 100,         // Current line width
  "arrowParens": "always"    // Always wrap arrow fn params
}
```

### Recommended ESLint Configuration:

**File: `.eslintrc.json`**
```json
{
  "env": {
    "node": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/explicit-function-return-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

**File: `.eslintignore`**
```
node_modules/
dist/
*.js
*.d.ts
```

---

## 4. GIT HOOKS & CI/CD

### Current State:
```
Husky:              ❌ NOT INSTALLED
Pre-commit hooks:   ❌ NONE
Pre-push hooks:     ❌ NONE
GitHub Actions:     ❌ NO WORKFLOWS (only FUNDING.yml)
```

### Recommended Husky Setup:

**File: `.husky/pre-commit`**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

**File: `.husky/pre-push`**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn validate
```

**File: `.lintstagedrc.json`**
```json
{
  "src/**/*.ts": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.md": ["prettier --write"]
}
```

### Recommended GitHub Actions Workflow:

**File: `.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Type check
        run: yarn type-check
      
      - name: Lint
        run: yarn lint
      
      - name: Test
        run: yarn test
      
      - name: Build
        run: yarn build
```

---

## 5. MIDDLEWARE & PLUGIN ARCHITECTURE REVIEW

### Current Event-Based Architecture:

**Handler Pattern** (src/index.ts):
```typescript
// Message handler chain:
handleIncoming(msg: Buffer)
  ↓ decompress/reassemble packets
→ handleUncompressedMessage(msg: string)
  ↓ parse JSON
→ dispatch to handlers:
  - handleConnect()
  - handleDisconnect()
  - functionCallback.res/rej()
  - eventCallback()
```

### Strengths:
✅ Event-emitter based (extensible)
✅ UUID-based request/response matching (robust)
✅ Message buffering for large payloads
✅ Cache abstraction layer
✅ Logger abstraction (pluggable)
✅ Heartbeat/connection monitoring

### Architecture Gaps:
❌ No middleware chain pattern
❌ No request/response interceptors
❌ No error handling middleware
❌ Limited observable patterns

### Recommended Enhancement (Optional):

```typescript
// Add middleware/interceptor pattern
export interface RequestInterceptor {
  onBeforeSend(cmd: Command): Command;
}

export interface ResponseInterceptor {
  onAfterReceive(res: Response): Response;
}

class Ableton extends EventEmitter {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }
  
  private applyRequestInterceptors(cmd: Command): Command {
    return this.requestInterceptors.reduce(
      (cmd, interceptor) => interceptor.onBeforeSend(cmd),
      cmd
    );
  }
  
  // Similar for response interceptors...
}
```

---

## SUMMARY & PRIORITY RECOMMENDATIONS

### PHASE 1: CRITICAL (Do Immediately)
1. ✅ Add ESLint configuration
2. ✅ Expand Prettier configuration
3. ✅ Add Husky & lint-staged
4. ✅ Create GitHub Actions CI workflow
5. ✅ Add npm scripts (lint, type-check, validate)

### PHASE 2: IMPORTANT (Next Sprint)
1. Update major dependencies:
   - vitest: 0.32.4 → 4.0.9
   - uuid: 8.3.2 → 13.0.0
   - lru-cache: 7.x → 11.x
2. Add path aliases to tsconfig.json
3. Enable source maps in tsconfig
4. Update build output to `dist/` instead of root

### PHASE 3: ENHANCEMENT (Backlog)
1. Add pre-push validation
2. Consider middleware/interceptor pattern
3. Add codecov or coverage reporting
4. Consider separate test tsconfig
5. Document configuration decisions in README

### ESTIMATED EFFORT:
- Phase 1: 4-6 hours
- Phase 2: 8-10 hours
- Phase 3: 4-6 hours per item

---

## KEY FILES TO CREATE/MODIFY

```
New Files to Create:
├── .eslintrc.json              (100 lines)
├── .eslintignore               (10 lines)
├── .prettier.config.js         (15 lines - expanded)
├── .husky/pre-commit           (5 lines)
├── .husky/pre-push             (5 lines)
├── .lintstagedrc.json          (15 lines)
└── .github/workflows/ci.yml    (50 lines)

Files to Modify:
├── package.json                (add ~15 packages, ~10 scripts)
├── tsconfig.json               (expand from 15 to 30 lines)
├── .prettierrc                 (expand from 3 to 10 lines)
└── .gitignore                  (add dist/, .eslintcache)
```

