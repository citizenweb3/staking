# How to Use Aztec Snapshot

## Overview

Aztec nodes use snapshots for faster synchronization. Since Aztec uses blobs, syncing from L1 requires an archive node. Snapshot sync is significantly faster and is the recommended approach for most deployments.

## Using CitizenWeb3 Snapshot

### Step 1: Configure your .env file

Add or modify the following environment variables in your `.env` file:

```bash
SYNC_MODE=force-snapshot
SYNC_SNAPSHOTS_URLS=https://mainnet-snapshots.citizenweb3.com/aztec/
```

### Step 2: Add environment variables to docker-compose.yml

Ensure your `docker-compose.yml` includes these environment variables:

```yaml
environment:
  # ... other environment variables
  SYNC_MODE: ${SYNC_MODE}
  SYNC_SNAPSHOTS_URLS: ${SYNC_SNAPSHOTS_URLS}
```

### Step 3: Start or restart your node

For new nodes:
```bash
aztec start --node --sync-mode force-snapshot
```

For Docker deployments:
```bash
docker compose up -d
```

### Step 4: Monitor sync progress

Check your node logs to verify snapshot download:

```bash
docker logs -f aztec-node
```

Look for messages indicating snapshot download progress and completion.

## Verification

To verify your snapshot sync is working:

1. **Check startup logs**: Look for snapshot download progress messages
2. **Monitor sync time**: Snapshot sync should be significantly faster than L1 sync
3. **Verify state completeness**: Confirm your node has the expected block height
4. **Check data directories**: Ensure the archiver and world-state databases are populated

## Snapshot Details

- **Network**: Mainnet (Chain ID: 1)
- **Rollup Address**: 0x603bb2c05d474794ea97805e8de69bccfb3bca12
- **Update Frequency**: Everyday at 06:00 and 18:00 UTC
- **Storage Location**: https://mainnet-snapshots.citizenweb3.com/aztec/aztec-1-0-0x603bb2c05d474794ea97805e8de69bccfb3bca12/