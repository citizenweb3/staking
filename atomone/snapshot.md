# How to Process AtomOne Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop atone.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.atomone/data/priv_validator_state.json $HOME/.atomone/priv_validator_state.json.backup
```

### Reset your node state
```bash
atomoned tendermint unsafe-reset-all --home $HOME/.atomone --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/atomone/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.atomone
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.atomone/priv_validator_state.json.backup $HOME/.atomone/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart atone.service && sudo journalctl -f -u atone.service
```