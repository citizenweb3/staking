# How to Process Stride Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop stride.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.stride/data/priv_validator_state.json $HOME/.stride/priv_validator_state.json.backup
```

### Reset your node state
```bash
strided tendermint unsafe-reset-all --home $HOME/.stride --keep-addr-book
rm -r $HOME/.stride/wasm
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/stride/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.stride
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.stride/priv_validator_state.json.backup $HOME/.stride/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart stride.service && sudo journalctl -f -u stride.service
```