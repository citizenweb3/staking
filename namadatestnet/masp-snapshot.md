# How to Process Namada MASP Indexer Snapshot

### Install dependencies, if needed

```bash
sudo apt update
sudo apt install lz4 -y
```

### Switch to your namada-masp-indexer directory

```bash
cd $HOME/namada-masp-indexer
```

### Download and decompress the snapshot

```bash
wget -O snapshot_latest.tar.lz4 https://testnet-snapshots.citizenweb3.com/namada/masp-indexer/snapshot_latest.tar.lz4
lz4 -d snapshot_latest.tar.lz4 -c | tar -xf - -C .
```

### Stop the containers

```bash
docker compose down
```

### Start only the PostgreSQL container

```bash
docker compose up -d postgres
```

### Copy the snapshot file into the container

```bash
docker compose cp masp_indexer_snapshot.dump postgres:/tmp/masp_indexer_snapshot.dump
```

### Restore the database from the snapshot

```bash
docker compose exec postgres pg_restore -d masp_indexer_local --clean /tmp/masp_indexer_snapshot.dump --verbose
```

### Remove the snapshot file from the container

```bash
docker compose exec postgres rm /tmp/masp_indexer_snapshot.dump
```

### Bring up the remaining containers

```bash
docker compose up -d
```

### Check the logs

```bash
docker logs --tail 50 -f namada-masp-indexer-crawler-1
```