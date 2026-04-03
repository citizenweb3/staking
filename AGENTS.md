# Repository Context for AI Agents

## Overview

This is the Citizenweb3 staking website repository.
It contains Next.js application code that renders the staking/validator landing page.

Network configuration data (networks.json, markdown content for each chain) lives in the `config` branch of the same repository. The source code fetches that config at runtime via GitHub raw URLs.

## Branch Architecture

| Branch | Purpose |
|--------|---------|
| `source-main` | Next.js source code — production branch |
| `staking-dev` | Next.js source code — development branch |
| `config` | Network configs: `networks.json`, per-chain `.md` files, global templates |
| `chain-images` | Chain logo/icon images |

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Turbopack)
- **Styling**: Tailwind CSS with custom theme (see `tailwind.config.ts`)
- **Font**: Red Hat Display (local), Hisqaida (decorative)
- **Runtime**: Node.js >= 20.9.0
- **Deployment**: Docker (node:20-bookworm) → Jenkins CI/CD → port 10000

## Project Structure

```
src/
├── types.d.ts                    # IChainConfig, IChain, TChainItem interfaces
├── app/
│   ├── config.ts                 # CONFIG_REPO, CONTRIBUTIONS_REPO, CATEGORIES env vars
│   ├── globals.css               # Base styles, responsive font sizing (6px–16px)
│   ├── layout.tsx                # Root layout: fonts, meta, header/footer
│   ├── page.tsx                  # Main landing page: filters + chain list
│   ├── actions/repos.ts          # Server actions: fetch chains, services from config branch
│   ├── chains/[chain]/
│   │   ├── page.tsx              # Individual chain page (icon, links, medals, tabs)
│   │   ├── tabs.tsx              # Tabbed content (public-goods, peers, snapshot, etc.)
│   │   ├── status-switch.tsx     # Mainnet/testnet toggle
│   │   └── not-found.tsx         # 404 for unknown chains
│   ├── api/
│   │   └── health/[chainName]/
│   │       └── route.ts          # Health check API endpoint
│   ├── components/
│   │   ├── chain-list/
│   │   │   ├── chain-list.tsx    # Grid of chain cards grouped by category
│   │   │   ├── chain-card.tsx    # Individual chain card (icon, type/category/provision tags)
│   │   │   ├── networks-filters.tsx # Faceted filter buttons (type, category, provision)
│   │   │   ├── tag-link.tsx      # Clickable tag badge
│   │   │   ├── reset-filters.tsx # Reset all filters button
│   │   │   ├── player.tsx        # Audio player component
│   │   │   ├── social-icons.tsx  # Social media icon links
│   │   │   └── validator-links.tsx # Validator-related links
│   │   ├── common/
│   │   │   ├── button.tsx        # Styled button component
│   │   │   └── switch.tsx        # Toggle switch
│   │   ├── layout/
│   │   │   ├── header.tsx        # Site header
│   │   │   └── footer.tsx        # Site footer
│   │   └── mdn/                  # Markdown rendering components
│   └── utils/
│       ├── deep-value.ts         # Nested object property accessor
│       └── chain-list/
│           ├── filters-utils.ts  # Faceted search logic, slug normalization
│           └── group-adapter.ts  # Mainnet/testnet grouping logic
```

## Key Data Flow

1. `page.tsx` calls `getRepoChains()` → fetches `networks.json` from config branch
2. Chains are grouped by title (mainnet+testnet pairs) in `chain-list.tsx`
3. Filter state lives in URL search params (`?type=mainnet&category=privacy`)
4. Individual chain page fetches per-chain `.md` files and renders as tabs

## Styling Notes

- Dark theme only (black background, white text)
- Primary color: `#137987` (teal)
- Paper/card background: `#1A1A1B`
- Font sizes are responsive via root `html` font-size scaling (6px–16px across breakpoints)
- Tailwind markdown plugin (`@geoffcodesthings/tailwind-md-base`) styles `.markdown` class content

## Config Branch Data Format

Each network in `networks.json`:
```json
{
  "name": "cosmoshub",
  "type": "mainnet",
  "category": ["Networks"],
  "provision": ["Validator", "Explorer", "Snapshot", ...],
  "title": "Cosmos",
  "icon": "https://...",
  "stake": "https://...",
  "services": ["public-goods", "peers", "snapshot"]
}
```

## Environment Variables

- `CONFIG_REPO` — base URL to raw config branch content
- `CONTRIBUTIONS_REPO` — base URL to contributions repo
- `CATEGORIES` — comma-separated list of category names

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
