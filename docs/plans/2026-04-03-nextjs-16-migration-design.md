# Migration: Next.js 14.1.0 → 16.2.2 + React 19

## Goal

Eliminate all known security vulnerabilities (17+ CVEs in Next.js 14.1.0) by migrating to the latest stable Next.js 16.2.2 with React 19.

## Target Versions

| Package | Current | Target |
|---|---|---|
| next | 14.1.0 | 16.2.2 |
| react | ^18 | ^19 |
| react-dom | ^18 | ^19 |
| @types/react | ^18 | ^19 |
| @types/react-dom | ^18 | ^19 |
| eslint-config-next | 14.1.0 | 16.2.2 |
| node (Dockerfile) | 18-bullseye | 20-bookworm |

## Breaking Changes Affecting This Project

### 1. Async `params` and `searchParams` (mandatory in Next.js 16)

**`src/app/page.tsx`** — `searchParams` is now `Promise`:
```typescript
// Before
const MainPage: FC<PageProps> = async ({ searchParams }) => {
  const selected: Selected = {
    types: getAllCanonFromPage(searchParams, 'type'),

// After
const MainPage = async (props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const searchParams = await props.searchParams;
  const selected: Selected = {
    types: getAllCanonFromPage(searchParams, 'type'),
```

**`src/app/chains/[chain]/page.tsx`** — `params` is now `Promise`:
```typescript
// Before
const ChainPage: FC<OwnProps> = async ({ params }) => {
  const data = await getChain(params.chain);

// After
const ChainPage = async (props: { params: Promise<{ chain: string }> }) => {
  const { chain } = await props.params;
  const data = await getChain(chain);
```

**`src/app/api/health/[chainName]/route.ts`** — `params` is now `Promise`:
```typescript
// Before
segmentData: { params: { chainName: string } }
// After
segmentData: { params: Promise<{ chainName: string }> }
```

### 2. React 19 Changes

- `FC` no longer includes implicit `children` — already handled (uses `PropsWithChildren`)
- `ref` as prop instead of `forwardRef` — no `forwardRef` usage found in project
- `react-toastify`, `react-markdown`, `swr` all support React 19

### 3. Dockerfile

- Node 18-bullseye → Node 20-bookworm (Next.js 16 requires Node >= 20.9.0)

## Files to Modify

1. `package.json` — version bumps
2. `src/app/page.tsx` — async searchParams
3. `src/app/chains/[chain]/page.tsx` — async params
4. `src/app/api/health/[chainName]/route.ts` — async params
5. `Dockerfile` — Node 20
6. `next.config.mjs` — verify compatibility (no changes expected)
7. `yarn.lock` — regenerated
8. `CLAUDE.md` / `AGENTS.md` — update Next.js version references

## What Does NOT Change

- Tailwind CSS 3 config — fully compatible
- `node-cache` — server-side, no Next.js dependency
- All component files — no API changes affect them
- `globals.css` — no changes
- `tsconfig.json` — no changes needed

## Verification

1. `yarn build` — must complete without errors
2. `yarn dev` — dev server must start and render pages
3. `yarn audit` — must show zero Next.js vulnerabilities
4. Docker build — must complete with new Node 20 base
