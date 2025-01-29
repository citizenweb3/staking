# How to Process GovGen Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop govgen.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.govgen/data/priv_validator_state.json $HOME/.govgen/priv_validator_state.json.backup
```

### Reset your node state
```bash
govgend tendermint unsafe-reset-all --home $HOME/.govgen --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/govgen/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.govgen
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.govgen/priv_validator_state.json.backup $HOME/.govgen/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart govgen.service && sudo journalctl -f -u govgen.service
```