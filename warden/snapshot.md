# How to Process Warden Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop warden.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json.backup
```

### Reset your node state
```bash
wardend tendermint unsafe-reset-all --home $HOME/.warden --keep-addr-book
rm -r $HOME/.warden/wasm
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/warden/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.warden/priv_validator_state.json.backup $HOME/.warden/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart warden.service && sudo journalctl -f -u warden.service
```