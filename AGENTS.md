# Repository Context for AI Agents and Contributors

## Overview

This repository contains **network configuration and public infrastructure documentation** for the Citizenweb3 staking website. It serves as a data source for the main website, which is built from the `source-main` branch.

**Important**: This branch is used **only for network configuration and content**. The actual website source code resides in the `source-main` branch.

## CI/CD Pipeline

When changes are pushed to this branch:
1. Jenkins pipeline is automatically triggered via GitHub webhook
2. Pipeline checks out the `source-main` branch (not this branch)
3. Docker image is built and deployed
4. Website is updated on port 10000

**Note**: Changes to network configurations in this branch will be reflected on the website after the next build of `source-main`.

## Repository Structure

```
├── networks.json           # Main network registry (required for all networks)
├── Jenkinsfile             # CI/CD pipeline configuration
├── global/                 # Global templates and guides
│   ├── peers.md
│   ├── public-goods.md
│   └── snapshot.md
├── <network-name>/         # Network-specific directories
│   ├── public-goods.md     # Public infrastructure endpoints
│   ├── peers.md            # Peer/seed node information
│   └── snapshot.md         # Snapshot download instructions
└── <network-name>-testnet/ # Testnet variants
```

## Adding a New Network

### Step 1: Create Network Directory

Create a folder with the network name (lowercase, kebab-case):
- Mainnet: `<network-name>/`
- Testnet: `<network-name>-testnet/`

### Step 2: Add to networks.json

Add a new entry to `networks.json` with the following structure:

```json
{
  "name": "network-name",           // Must match folder name
  "type": "mainnet",                // or "testnet"
  "category": ["Networks"],         // Networks, DeFi, Privacy, AI, etc.
  "provision": ["Validator", "Endpoints"],  // Services we provide
  "title": "Network Display Name",
  "icon": "https://...",            // SVG icon URL
  "stake": "",                      // Staking URL (if validator)
  "explorer": "",                   // Explorer URL
  "chain_id": "chain-id-here",      // Chain ID (e.g., "cosmoshub-4", "1" for Ethereum)
  "horcrux": true,                  // Optional: validator badge (see Badges section)
  "restake": true,                  // Optional: validator badge
  "shi": true,                      // Optional: validator badge
  "otgi": true,                     // Optional: validator badge
  "endpoints": {
    "rpc": "https://rpc.network.citizenweb3.com",
    "rest": "https://api.network.citizenweb3.com",
    "grpc": "grpc.network.citizenweb3.com"
  },
  "generatedServices": [],
  "twitter": "https://twitter.com/...",
  "services": ["public-goods"],      // Available .md files
  "validator_address": "valoper1...", // Optional: our validator address for deep-link wallets
  "mintscan_name": "cosmos",          // Optional: Mintscan chain slug
  "wallets": [                         // Optional: staking buttons on chain page
    { "name": "Keplr", "url": "https://wallet.keplr.app/?modal=staking&chain=...&validator_address=..." },
    { "name": "Namadillo", "url": "https://namadillo.citizenweb3.com/staking" },
    { "name": "Aztec Staking", "url": "https://stake.aztec.network/providers/26" }
  ],
  "buttons": [                         // Optional: additional config-driven action buttons
    { "label": "Open AI Chatbot", "url": "https://logos.staking.citizenweb3.com" }
  ]
}
```

### Step 3: Create public-goods.md

Use this template for the public infrastructure page (based on cosmoshub format):

```html
# Public infrastructure 

<details open>
  <summary>Endpoints</summary>
  <br>
  RPC: <a href="https://rpc.network.citizenweb3.com/">https://rpc.network.citizenweb3.com/</a><br>
  REST: <a href="https://api.network.citizenweb3.com/">https://api.network.citizenweb3.com/</a><br>
  GRPC: <span title="GRPC" class="text-nowrap text-base text-primary hover:font-semibold cursor-pointer" text="grpc.network.citizenweb3.com">grpc.network.citizenweb3.com</span>
</details>
<br>
<details>
  <summary>Seed</summary>
  node_id@host:port
</details>
<br>

# Tools and community

<details>
  <summary>Explorer</summary>
  <a href="https://validatorinfo.com/networks">Validator Info</a><br>
</details>
<br>
```

**Important formatting notes:**
- RPC/REST links use `<a href="">` tags
- GRPC uses `<span>` with specific classes (no href, just text)
- Each `<details>` block should be followed by `<br>`
- Seed nodes are plain text (no HTML link)

### Step 4: Add Optional Services

- `peers.md` - For seed/peer node information
- `snapshot.md` - For snapshot download instructions
- `indexer-snapshot.md` - For indexer snapshots (Namada-specific)
- `masp-snapshot.md` - For MASP snapshots (Namada-specific)
- `ai.md` - For AI tooling, chatbots, plugins, and integration resources

**Remember**: Add each service to the `"services"` array in `networks.json`.

### Step 5: Create snapshot.md (if providing snapshots)

Use this template for snapshot instructions (cosmos based chains; for all other chains template will be totally different):

```markdown
# How to Process <Network Name> Snapshot

### Install dependencies, if needed
\`\`\`bash
sudo apt update
sudo apt install lz4 -y
\`\`\`

### Stop your node
\`\`\`bash
sudo systemctl stop <daemon>.service
\`\`\`

### Back up your validator state (important for validators)
\`\`\`bash
cp $HOME/.<daemon_home>/data/priv_validator_state.json $HOME/.<daemon_home>/priv_validator_state.json.backup
\`\`\`

### Reset your node state
\`\`\`bash
<daemon> tendermint unsafe-reset-all --home $HOME/.<daemon_home> --keep-addr-book
\`\`\`

### Download and decompress the snapshot
\`\`\`bash
curl https://mainnet-snapshots.citizenweb3.com/<network>/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.<daemon_home>
\`\`\`

### Replace the backed-up validator state (for validators only)
\`\`\`bash
mv $HOME/.<daemon_home>/priv_validator_state.json.backup $HOME/.<daemon_home>/data/priv_validator_state.json
\`\`\`

### Restart your node
\`\`\`bash
sudo systemctl restart <daemon>.service && sudo journalctl -f -u <daemon>.service
\`\`\`
```

**Snapshot URL patterns:**
- Mainnet: `https://mainnet-snapshots.citizenweb3.com/<network>/snapshot_latest.tar.lz4`
- Testnet: `https://testnet-snapshots.citizenweb3.com/<network>/snapshot_latest.tar.lz4`

**Important note for non-Cosmos networks:**
The template above is designed for Cosmos SDK-based chains. For non-Cosmos networks (e.g., Aztec, Ethereum, etc.) and specialized services (e.g., Namada indexer/MASP snapshots), the snapshot process may differ significantly:
- **Aztec**: Uses Docker-based deployment with `SYNC_MODE=force-snapshot` environment variable
- **Namada Indexer**: Requires PostgreSQL database restore via `pg_restore`
- **Other non-Cosmos chains**: May have unique data directories, service names, and restoration procedures

Always refer to the specific network's existing snapshot.md files as examples when creating instructions for non-standard networks.

## Validator Badges

Networks where we run a validator can have special badges indicating infrastructure quality and participation:

| Badge | Property | Description |
|-------|----------|-------------|
| **Horcrux** | `"horcrux": true` | Validator uses Horcrux for high availability signing (distributed key management) |
| **REStake** | `"restake": true` | Validator supports REStake auto-compounding for delegators |
| **SHI** | `"shi": true` | Validator runs on self-hosted infrastructure (not cloud providers) |
| **OTGI** | `"otgi": true` | Validator runs on 100% green/renewable energy infrastructure |

Add these boolean properties to `networks.json` only for networks where we operate a validator with corresponding features.

## File Format Guidelines

### HTML in Markdown

Different endpoint types use different HTML formatting:

**RPC/REST endpoints** (clickable links):
```html
RPC: <a href="https://rpc.network.citizenweb3.com/">https://rpc.network.citizenweb3.com/</a><br>
```

**GRPC endpoints** (styled text, for copying):
```html
GRPC: <span title="GRPC" class="text-nowrap text-base text-primary hover:font-semibold cursor-pointer" text="grpc.network.citizenweb3.com">grpc.network.citizenweb3.com</span>
```

### Collapsible Sections

Use `<details>` tags for collapsible sections:
```html
<details open>  <!-- open = expanded by default -->
  <summary>Section Title</summary>
  <br>
  Content here
</details>
<br>
```

### Template Variables

Files in `global/` use template variables that are replaced at build time:
- `{{chain_name}}` - Network folder name
- `{{chain_id}}` - Chain ID from networks.json
- `{{daemon_name}}` - Daemon binary name
- `{{codebase.git_repo}}` - Git repository URL
- `{{codebase.genesis.genesis_url}}` - Genesis file URL

## Common Operations

### Adding Endpoints to Existing Network

1. Edit `<network>/public-goods.md`
2. Add new endpoint in HTML format (use correct format for endpoint type)
3. Update `networks.json` if endpoint type is new

### Adding New Service Type

1. Create `<network>/<service>.md` file
2. Add service name to `"services"` array in `networks.json`

### Private/Authenticated Endpoints

For endpoints requiring authentication, add a note:
```html
<i>Note: These endpoints require authentication. If you would like to use our endpoints, please contact us on Telegram: <a href="https://t.me/citizenweb3">@citizenweb3</a></i>
```

## Network Categories

- `Networks` - General purpose blockchains (Cosmos, Ethereum, Celestia)
- `DeFi` - DeFi-focused chains (Osmosis, Stride)
- `Privacy` - Privacy-focused chains (Namada, Nym)
- `AI` - AI-focused chains (Oraichain)

## Provision Types

- `Validator` - We run a validator
- `Explorer` - We provide an explorer
- `Indexer` - We run an indexer
- `Snapshot` - We provide snapshots
- `Archive` - We run an archive node
- `Relayers` - We run IBC relayers
- `Endpoints` - We provide RPC/API endpoints
- `Seed/Peers` - We provide seed/peer nodes
- `Staking-Interface` - We provide a staking UI
- `Governor` - We participate in governance

## Contact

For questions about this repository or to request endpoint access:
- Telegram: [@citizenweb3](https://t.me/citizenweb3)
- Twitter: [@aspect_tui](https://twitter.com/aspect_tui)
