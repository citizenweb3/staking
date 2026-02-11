# How to Use Aztec Testnet Snapshot

## Overview

Aztec nodes use snapshots for faster synchronization. Since Aztec uses blobs, syncing from L1 requires an archive node that stores complete blob history. Snapshot sync is significantly faster, doesn't require archive nodes, and reduces load on L1 infrastructure, making it the recommended approach for most deployments.

Unlike mainnet snapshots that use Aztec's built-in snapshot sync, testnet snapshots are provided as compressed archives that need to be manually downloaded and extracted.

## Using CitizenWeb3 Snapshot

### Step 1: Install dependencies (if needed)

```bash
sudo apt update
sudo apt install lz4 curl -y
```

### Step 2: Stop your node

```bash
docker compose down
```

### Step 3: Back up existing data (optional but recommended)

```bash
mv $HOME/.aztec/data $HOME/.aztec/data.backup
```

### Step 4: Download and extract the snapshot

```bash
curl https://testnet-snapshots.citizenweb3.com/aztec/aztec_testnet_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.aztec/
```

For Docker deployments, extract to your mounted data directory (e.g., `./data`):
```bash
curl https://testnet-snapshots.citizenweb3.com/aztec/aztec_testnet_latest.tar.lz4 | lz4 -dc - | tar -xf - -C ./data/
```

### Step 5: Start your node

```bash
docker compose up -d
```

### Step 6: Monitor sync progress

Check your node logs to verify the node is syncing from the snapshot state:

```bash
docker logs -f aztec-node
```

## Verification

1. Verify your node has the expected block height after starting
2. Ensure the archiver and world-state databases are populated
3. Check that the node continues syncing from the snapshot block

## Snapshot Details

- **Network**: Testnet (Sepolia)
- **Chain ID**: 11155111
- **Update Frequency**: Everyday at 06:00 and 18:00 UTC
- **Storage Location**: https://testnet-snapshots.citizenweb3.com/aztec/
