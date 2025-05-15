# How to Process Namada Indexer Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Switch to your namada-indexer directory
```bash
cd $HOME/namada-indexer
```

### Download and decompress the snapshot
```bash
wget -O snapshot_latest.tar.lz4 https://testnet-snapshots.citizenweb3.com/namada/indexer/snapshot_latest.tar.lz4
lz4 -d snapshot_latest.tar.lz4 -c | tar -xf - -C .
```

### Stop and remove the containers (and volumes)
```bash
docker compose down -v
```

### Start only the PostgreSQL container
```bash
docker compose up -d postgres
```

### Copy the snapshot file into the container
```bash
docker compose cp indexer_snapshot.dump postgres:/tmp/indexer_snapshot.dump
```

### Restore the database from the snapshot
```bash
docker compose exec postgres pg_restore -p 5433 -d namada-indexer --clean /tmp/indexer_snapshot.dump --verbose
```

### Remove the snapshot file from the container
```bash
docker compose exec postgres rm /tmp/indexer_snapshot.dump
```

### Bring up the remaining containers
```bash
docker compose up -d
```

### Check the logs
```bash
docker logs --tail 50 -f namada-indexer-transactions-1
```