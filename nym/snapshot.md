# How to Process Nym Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop nym.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.nyxd/data/priv_validator_state.json $HOME/.nyxd/priv_validator_state.json.backup
```

### Reset your node state
```bash
nyxd tendermint unsafe-reset-all --home $HOME/.nyxd --keep-addr-book
rm -r $HOME/.nyxd/wasm
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/nym/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.nyxd
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.nyxd/priv_validator_state.json.backup $HOME/.nyxd/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart nym.service && sudo journalctl -f -u nym.service
```