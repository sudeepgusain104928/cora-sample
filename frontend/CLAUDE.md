# Project Standards — Team Root Rules
Strictly follow over defaults. No prose, no preamble in code generation.

## Stack
- UI: React 19 (JSX transform, no `import React`).
- Styling: Tailwind CSS v4 (`@tailwindcss/vite`).
- State: RTK 2 + React Redux 9. Async: Redux Saga (use `redux-saga-api` skill).
- Language: JS (`.js`/`.jsx`). Migration to TS in progress.
- QA: Vitest + Testing Library, Storybook 8 (use `storybook-react` skill).

## TypeScript (New/migrated files only)
- Extension: `.ts`/`.tsx`. Never refactor untouched legacy files.
- Strict: `strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`.
- Rules: No `any` (use `unknown` + guards). No `!`. Explicit return types on exports. Use `import type`. Define props above component using `interface`.

## React
- Signature: Use `function ComponentName(): JSX.Element` (No arrow `const`).
- Structure: One component per file. Filename matches named export (PascalCase).
- Exports: Named exports only. Exception: Default export allowed ONLY in `src/pages/`.
- Logic: Externalize complex hooks to `src/hooks/`. No inline definitions.
- Mechanics: Complete `useEffect` deps. No conditional hooks. No direct DOM manipulation (use `useRef`).
- A11y: Explicit `aria-label`, `role`, `aria-pressed`, `htmlFor`.

## Tailwind CSS
- Constraints: Utility classes only. No inline `style`, no custom CSS, no `@apply`.
- Design: `dark:` variant required on all colors. Responsive via `sm:`/`md:`/`lg:` variants.
- Focus: `focus:outline-none focus:ring-2 focus:ring-[brand-color]`.
- Tokens: Use Tailwind scale values only (no arbitrary like `p-[17px]`). Use config tokens (`cora-orange`, `cora-blue`, `cora-navy`, `cora-sky`). Do not hardcode hex values.

## Redux & Saga (4-File Pattern Required)
- Shape: `{ data, status: 'idle'|'loading'|'succeeded'|'failed', error }`. No binary loading flags.
- Reducers: Immer-style direct mutation. Export named selectors from slices. Components must not read raw state path.
- Triggers: Use `createAction` for saga starter actions.
- Sagas: `takeLatest` for GET. `takeEvery` for POST/PUT/DELETE. Always `try/catch` workers. Store `error.message` string, never the Error object. Services are pure async functions (no Redux imports).
- Hooks: Always use `useAppDispatch` and `useAppSelector` from `src/store/hooks.js`.

## Architecture
- `src/components/`: `layout/`, `sections/`, `ui/` (Primitives). One file per component.
- `src/services/`: API calls (Axios). Import from `apiClient.js` instance.
- `src/store/`: `slices/`, `sagas/`, `hooks.js`, `index.js`.
- `src/test/`: `setup.js`, `test-utils.jsx` (Exports `renderWithProviders`).

## Testing & Style
- QA: Always use `renderWithProviders`. Test behavior by role/label, not implementation/classes. No snapshot tests. Co-locate `*.test.jsx`. Test `loading`/`succeeded`/`failed` for all async actions. Use `vitest` APIs (`vi.fn()`, `vi.mock()`).
- Clean Code: No commented code. No `console.log` (use `console.error` in saga catch). 
- Imports: External packages -> absolute `@/` -> relative `./`.
- Signature: Destructure props directly at the function signature.