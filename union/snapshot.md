# How to Process Union Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop union.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.union/data/priv_validator_state.json $HOME/.union/priv_validator_state.json.backup
```

### Reset your node state
```bash
uniond tendermint unsafe-reset-all --home $HOME/.uninon --keep-addr-book
rm -r $HOME/.union/wasm
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/union/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.union
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.union/priv_validator_state.json.backup $HOME/.union/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart union.service && sudo journalctl -f -u union.service
```