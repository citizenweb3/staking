# How to Process Celestia Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop celestia.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup
```

### Reset your node state
```bash
celestia-appd tendermint unsafe-reset-all --home $HOME/.celestia-app --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/celestia/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.celestia-app
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart celestia.service && sudo journalctl -f -u celestia.service
```