# CLAUDE.md — Quick Reference for Claude/Copilot

## What This Project Is

Next.js 16 staking website for Citizenweb3 validator. Shows a filterable list of blockchain networks with per-chain detail pages. Source code branches: `source-main` (production), `staking-dev` (development). All network data is in the `config` branch.

## Commands

### Development (local)
```bash
yarn            # Install dependencies
yarn dev        # Start dev server (port 3000)
```

### Production (local)
```bash
yarn            # Install dependencies
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
| Social icons | `src/app/components/chain-list/social-icons.tsx` |
| Validator links | `src/app/components/chain-list/validator-links.tsx` |
| Audio player | `src/app/components/chain-list/player.tsx` |
| Health check API | `src/app/api/health/[chainName]/route.ts` |
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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **staking** (150 symbols, 278 relationships, 12 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/staking/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/staking/context` | Codebase overview, check index freshness |
| `gitnexus://repo/staking/clusters` | All functional areas |
| `gitnexus://repo/staking/processes` | All execution flows |
| `gitnexus://repo/staking/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## CLI

- Re-index: `npx gitnexus analyze`
- Check freshness: `npx gitnexus status`
- Generate docs: `npx gitnexus wiki`

<!-- gitnexus:end -->
