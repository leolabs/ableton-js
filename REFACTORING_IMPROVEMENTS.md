# Ableton.js Codebase Refactoring & Improvements List

**Date**: 2025-11-16
**Current Version**: 3.7.1
**Quality Score**: 65/100 (target: 80/100)

---

## Executive Summary

The codebase demonstrates solid architectural patterns (generic namespace, event-driven RPC) but has accumulated technical debt in error handling, type safety, and development tooling. This document prioritizes 35+ improvements across 6 categories.

---

## Priority Matrix

| Priority | Impact | Effort | Category |
|----------|--------|--------|----------|
| **P0** | Critical bugs/security | Hours | Must fix immediately |
| **P1** | High value, low effort | 1-2 days | Quick wins |
| **P2** | Significant improvement | 1 week | Important refactors |
| **P3** | Nice to have | 2+ weeks | Future enhancements |

---

## P0: Critical Issues (Fix Immediately)

### 1. String Throws in Error Handling
**File**: `src/ns/midi.ts` lines 52, 63, 66, 73, 87
**Issue**: Throwing string literals instead of Error objects breaks stack traces
```typescript
// BAD
throw "NoteOutput not available on this instance";

// GOOD
throw new Error("NoteOutput not available on this instance");
```
**Effort**: 15 minutes

### 2. Silent Error Swallowing
**File**: `src/index.ts` line 372
**Issue**: `.catch(() => {})` hides errors completely
```typescript
// BAD
.catch(() => {});

// GOOD
.catch((err) => this.logger?.warn("Failed to remove listener", err));
```
**Effort**: 10 minutes

### 3. Aggressive Buffer Reset on Error
**File**: `src/index.ts` line 438
**Issue**: Entire buffer cleared on single decompression error, losing valid chunks
```typescript
// BAD
catch (e) {
  this.buffer = [];  // Loses all pending messages
}

// BETTER
catch (e) {
  delete this.buffer[data.uuid];  // Only clear failed message
}
```
**Effort**: 30 minutes

---

## P1: Quick Wins (High Impact, Low Effort)

### 4. Add ESLint Configuration
**Issue**: No TypeScript-aware linting
**Solution**: Add ESLint + @typescript-eslint
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
**Config**: See Appendix A
**Effort**: 1 hour

### 5. Install Husky + lint-staged
**Issue**: No pre-commit validation
**Solution**: Git hooks to run linting/formatting
```bash
npm install -D husky lint-staged
npx husky init
```
**Effort**: 30 minutes

### 6. Add GitHub Actions CI
**Issue**: No automated testing on PRs
**Solution**: Add `.github/workflows/ci.yml`
**Effort**: 1 hour (see Appendix B)

### 7. Expand Prettier Configuration
**File**: `.prettierrc`
**Current**: Only 2 options set
```json
{
  "trailingComma": "all",
  "proseWrap": "always",
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```
**Effort**: 15 minutes

### 8. Add npm Scripts
**File**: `package.json`
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "type-check": "tsc --noEmit",
    "validate": "npm run lint && npm run type-check && npm run test",
    "test:watch": "vitest --watch",
    "dev": "tsc --watch"
  }
}
```
**Effort**: 15 minutes

### 9. Extract ID Helper Function
**File**: `src/ns/track.ts` lines 223, 235
**Issue**: Repeated ID extraction logic
```typescript
// BAD (duplicated)
await this.sendCommand("delete_device", { id: this.raw.id, device_id: device.raw.id });
await this.sendCommand("duplicate_device", { id: this.raw.id, device_id: device.raw.id });

// GOOD (helper)
private buildDeviceArgs(device: Device) {
  return { id: this.raw.id, device_id: device.raw.id };
}
```
**Effort**: 20 minutes

### 10. Remove/Implement Stub Method
**File**: `src/ns/clip.ts` line 209
**Issue**: `createAutomationEnvelope` is empty stub
```typescript
// Either implement or remove with deprecation notice
async createAutomationEnvelope() {
  throw new Error("Not implemented - use Device.parameters instead");
}
```
**Effort**: 20 minutes

---

## P2: Significant Refactors (1 Week)

### 11. Reduce `any` Types in Core Interfaces
**File**: `src/index.ts` lines 32, 38, 47, 55
**Issue**: Command/Response interfaces use `any` for arguments and results
```typescript
// BEFORE
interface Command {
  args?: { [k: string]: any };
}

// AFTER
interface Command<TArgs = Record<string, unknown>> {
  args?: TArgs;
}
```
**Impact**: Better type inference, fewer runtime errors
**Effort**: 4-6 hours

### 12. Refactor Browser Transformers
**File**: `src/ns/browser.ts`
**Issue**: 14 identical transformer functions
```typescript
// BEFORE
transformers = {
  audio_effects: (items) => items.map(i => new BrowserItem(this.ableton, i)),
  midi_effects: (items) => items.map(i => new BrowserItem(this.ableton, i)),
  // ... 12 more identical lines
}

// AFTER
const toBrowserItems = (items: RawBrowserItem[]) =>
  items.map(i => new BrowserItem(this.ableton, i));

transformers = Object.fromEntries(
  ['audio_effects', 'midi_effects', 'instruments', ...]
    .map(key => [key, toBrowserItems])
);
```
**Effort**: 1-2 hours

### 13. Split Large Index File
**File**: `src/index.ts` (703 lines)
**Issue**: Mixed concerns - networking, routing, caching, connection
**Solution**: Split into:
- `src/connection.ts` - UDP socket management
- `src/message-handler.ts` - Message parsing/routing
- `src/cache-manager.ts` - LRU cache logic
- `src/index.ts` - Main orchestrator
**Effort**: 4-6 hours

### 14. Fix Type Mismatches in Song Properties
**File**: `src/ns/song.ts`
**Issue**: `exclusive_arm`, `exclusive_solo` are `number` in settable but `boolean` in gettable
```typescript
// Investigate Ableton API behavior and align types
interface GettableProperties {
  exclusive_arm: boolean;  // or number?
}
interface SettableProperties {
  exclusive_arm: boolean;  // Match gettable
}
```
**Effort**: 2-3 hours (requires testing)

### 15. Add TypeScript Path Aliases
**File**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@ns/*": ["./ns/*"],
      "@util/*": ["./util/*"]
    }
  }
}
```
**Benefit**: Cleaner imports (`@/ns/song` vs `../ns/song`)
**Effort**: 1 hour

### 16. Migrate Output to `dist/` Directory
**Issue**: Compiled .js files in root mix with source
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```
**Effort**: 2 hours (update imports, package.json main)

### 17. Add Request Deduplication
**File**: `src/index.ts`
**Issue**: Rapid duplicate requests not coalesced
```typescript
private inFlightRequests = new Map<string, Promise<any>>();

async getProp(...) {
  const key = `${command.ns}/${command.nsid}/${prop}`;
  if (this.inFlightRequests.has(key)) {
    return this.inFlightRequests.get(key);
  }
  const promise = this.sendCommand(...);
  this.inFlightRequests.set(key, promise);
  return promise.finally(() => this.inFlightRequests.delete(key));
}
```
**Effort**: 3-4 hours

### 18. Update Major Dependencies
**Package**: `package.json`
- vitest: 0.32.4 → 4.0.9 (major)
- lru-cache: 7.x → 11.x (major API changes)
- uuid: 8.3.2 → 13.0.0 (optional)

**Effort**: 4-6 hours (migration + testing)

### 19. Add JSDoc to Core Modules
**Files**: device.ts, device-parameter.ts, mixer-device.ts, application.ts
**Issue**: Missing parameter and return type documentation
```typescript
/**
 * Deletes a device from the track
 * @param index - Zero-based index of the device to delete
 * @throws {Error} If index is out of bounds
 * @example
 * await track.deleteDevice(0); // Remove first device
 */
async deleteDevice(index: number): Promise<void>
```
**Effort**: 4-6 hours

### 20. Improve Cache Key Generation
**File**: `src/index.ts` line 552
**Issue**: Simple string concatenation risks collisions
```typescript
// BEFORE
const cacheKey = [command.ns, command.nsid, args].filter(Boolean).join("/");

// AFTER
const cacheKey = JSON.stringify({ ns: command.ns, nsid: command.nsid, args });
// OR use crypto hash for deterministic keys
```
**Effort**: 1 hour

---

## P3: Future Enhancements (2+ Weeks)

### 21. Add Listener TTL/Auto-cleanup
**Issue**: Event listeners can accumulate over long sessions
**Solution**: Add optional TTL or explicit cleanup warnings
**Effort**: 6-8 hours

### 22. Implement Middleware Pattern
**Issue**: No interceptor hooks for request/response
**Solution**: Add middleware layer for logging, auth, metrics
**Effort**: 8-10 hours

### 23. Enable Source Maps
**File**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "sourceMap": true,
    "declarationMap": true
  }
}
```
**Benefit**: Better debugging of production builds
**Effort**: 30 minutes (but affects build artifacts)

### 24. Add API Versioning
**Issue**: No graceful degradation for incompatible plugin versions
**Solution**: Version negotiation on connect
**Effort**: 1-2 weeks

### 25. Split Large Namespace Interfaces
**Files**: `src/ns/song.ts`, `src/ns/clip.ts`
**Issue**: 100+ property interfaces are unwieldy
**Solution**: Group by category (playback, timeline, tracks, etc.)
**Effort**: 8-10 hours

### 26. Add Performance Monitoring
**Issue**: No visibility into command latency, cache hit rates
**Solution**: Prometheus metrics or structured logging
**Effort**: 4-6 hours

### 27. Implement Connection Pooling
**Issue**: Single UDP socket for all requests
**Solution**: Multiple sockets for concurrent operations
**Effort**: 2-3 days

### 28. Add Integration Test Fixtures
**Issue**: Tests require live Ableton instance
**Solution**: Mock server for offline testing
**Effort**: 2-3 days

### 29. TypeScript Strict Null Checks Enhancement
**Issue**: Some optional chaining could be explicit
**Solution**: Enable `exactOptionalPropertyTypes`
**Effort**: 4-6 hours

### 30. Add CHANGELOG Automation
**Issue**: Manual changelog updates
**Solution**: Conventional commits + automated releases
**Effort**: 3-4 hours

---

## Appendix A: ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'no-throw-literal': 'error',
  },
  ignorePatterns: ['*.js', 'dist/', 'node_modules/', '*.spec.ts'],
};
```

---

## Appendix B: GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      # Note: Tests require live Ableton instance, skip in CI
      # - run: npm test
```

---

## Implementation Roadmap

### Week 1: Foundation
- [ ] P0 items (critical bugs)
- [ ] P1 items 4-8 (tooling setup)

### Week 2: Core Refactors
- [ ] P1 items 9-10 (code cleanup)
- [ ] P2 items 11-12 (type safety)

### Week 3: Architecture
- [ ] P2 items 13-14 (split files, fix types)
- [ ] P2 items 15-16 (project structure)

### Week 4: Performance & Stability
- [ ] P2 items 17-20 (caching, docs)

### Month 2+: Enhancements
- [ ] P3 items as capacity allows

---

## Metrics to Track

- **Type Coverage**: Aim for <10 `any` types
- **ESLint Errors**: Zero tolerance policy
- **Test Coverage**: Target 70% line coverage
- **Bundle Size**: Monitor for regressions
- **Build Time**: Keep under 10 seconds

---

## Conclusion

The codebase has strong architectural foundations but needs modernization in tooling and error handling. Focusing on P0 and P1 items first will provide immediate value while P2 refactors can be spread across sprints. The estimated effort for P0-P1 is 4-6 hours, with P2 requiring 1-2 weeks of dedicated work.

**Next Steps**:
1. Create GitHub issues for each P0/P1 item
2. Schedule P2 items in sprint planning
3. Track progress against quality metrics
