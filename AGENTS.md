# Repository Context for AI Agents (source-main branch)

## Overview

This is the **source code branch** (`source-main`) of the Citizenweb3 staking website.
It contains Next.js application code that renders the staking/validator landing page.

Network configuration data (networks.json, markdown content for each chain) lives in the `config` branch of the same repository. The source code fetches that config at runtime via GitHub raw URLs.

## Branch Architecture

| Branch | Purpose |
|--------|---------|
| `source-main` | Next.js source code (this branch) |
| `config` | Network configs: `networks.json`, per-chain `.md` files, global templates |
| `chain-images` | Chain logo/icon images |
| `main` | Production build output |

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Styling**: Tailwind CSS with custom theme (see `tailwind.config.ts`)
- **Font**: Red Hat Display (local), Hisqaida (decorative)
- **Deployment**: Docker → Jenkins CI/CD → port 10000

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
│   ├── components/
│   │   ├── chain-list/
│   │   │   ├── chain-list.tsx    # Grid of chain cards grouped by category
│   │   │   ├── chain-card.tsx    # Individual chain card (icon, type/category/provision tags)
│   │   │   ├── networks-filters.tsx # Faceted filter buttons (type, category, provision)
│   │   │   ├── tag-link.tsx      # Clickable tag badge
│   │   │   └── reset-filters.tsx # Reset all filters button
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
