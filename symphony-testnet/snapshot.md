# How to Process Symphony Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop symphony.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.symphonyd/data/priv_validator_state.json $HOME/.symphonyd/priv_validator_state.json.backup
```

### Reset your node state
```bash
symphonyd tendermint unsafe-reset-all --home $HOME/.symphonyd --keep-addr-book
rm -r $HOME/.symphonyd/wasm
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/symphony/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.symphonyd
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.symphonyd/priv_validator_state.json.backup $HOME/.symphonyd/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart symphony.service && sudo journalctl -f -u symphony.service
```