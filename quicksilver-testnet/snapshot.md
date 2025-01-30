# How to Process Quicksilver Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop quicksilver.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.quicksilverd/data/priv_validator_state.json $HOME/.quicksilverd/priv_validator_state.json.backup
```

### Reset your node state
```bash
quicksilverd tendermint unsafe-reset-all --home $HOME/.quicksilverd --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/quicksilver/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.quicksilverd
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.quicksilverd/priv_validator_state.json.backup $HOME/.quicksilverd/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart quicksilver.service && sudo journalctl -f -u quicksilver.service
```