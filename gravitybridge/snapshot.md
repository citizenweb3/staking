# How to Process Gravity Bridge Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop gravity.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.gravity/data/priv_validator_state.json $HOME/.gravity/priv_validator_state.json.backup
```

### Reset your node state
```bash
gravity tendermint unsafe-reset-all --home $HOME/.gravity --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/gravity/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.gravity
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.gravity/priv_validator_state.json.backup $HOME/.gravity/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart gravity.service && sudo journalctl -f -u gravity.service
```