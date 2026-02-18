# CLAUDE.md — Quick Reference for Claude/Copilot

## What This Project Is

Next.js 14 staking website for Citizenweb3 validator. Shows a filterable list of blockchain networks with per-chain detail pages. This branch (`source-main`) is source code only — all network data is in the `config` branch.

## Commands

### Development (local)
```bash
yarn install    # Install dependencies
yarn dev        # Start dev server (port 3000)
yarn lint       # ESLint
```

### Production (local)
```bash
yarn build      # Build for production
yarn start      # Start production server (port 3200, see package.json)
```

### Production (Docker)
```bash
cp .env.example .env.local              # Create env config from example
docker build -t staking .               # Build image
docker run -p 3000:3000 staking         # Run container (port 3000)
```

> **Note:** Jenkins CI (`Jenkinsfile`) does `cp .env.example .env.local` → `docker build` → `docker run -p 10000:3000` automatically on push to any branch.

## Key Files to Edit

| Task | File(s) |
|------|---------|
| Landing page layout | `src/app/page.tsx` |
| Chain detail page | `src/app/chains/[chain]/page.tsx` |
| Chain card appearance | `src/app/components/chain-list/chain-card.tsx` |
| Filter logic | `src/app/utils/chain-list/filters-utils.ts` |
| Data fetching | `src/app/actions/repos.ts` |
| Type definitions | `src/types.d.ts` |
| Global styles | `src/app/globals.css` |
| Tailwind theme | `tailwind.config.ts` |

## Code Conventions

- Server Components by default; `'use client'` only when needed
- Tailwind for all styling (no CSS modules)
- `FC<Props>` pattern with named interfaces (`OwnProps`)
- Absolute imports via `@/` alias (mapped to `src/`)
- Config fetched at runtime from GitHub raw content URLs

## Gotchas

- `html` font-size is responsive (6px on tiny screens → 16px on xl), so `rem` units scale accordingly
- The `.markdown` class is needed for markdown content styling (via tailwind-md-base plugin)
- Chain data caches with short TTL (10s for chains, 3600s for registry)
- `CATEGORIES` env var controls which category sections appear and their order
