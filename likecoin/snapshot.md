# How to Process Likecoin Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop likecoin.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.liked/data/priv_validator_state.json $HOME/.liked/priv_validator_state.json.backup
```

### Reset your node state
```bash
liked tendermint unsafe-reset-all --home $HOME/.liked --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/likecoin/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.liked
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.liked/priv_validator_state.json.backup $HOME/.liked/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart likecoin.service && sudo journalctl -f -u likecoin.service
```