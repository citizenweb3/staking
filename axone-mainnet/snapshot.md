# How to Process Axone Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop axone.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.axoned/data/priv_validator_state.json $HOME/.axoned/priv_validator_state.json.backup
```

### Reset your node state
```bash
axoned tendermint unsafe-reset-all --home $HOME/.axoned --keep-addr-book
rm -r $HOME/.axoned/wasm
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/axone/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.axoned
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.axoned/priv_validator_state.json.backup $HOME/.axoned/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart axone.service && sudo journalctl -f -u axone.service
```