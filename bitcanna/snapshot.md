# How to Process Bitcanna Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop bitcanna.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.bcna/data/priv_validator_state.json $HOME/.bcna/priv_validator_state.json.backup
```

### Reset your node state
```bash
bcnad tendermint unsafe-reset-all --home $HOME/.bcna --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/bitcanna/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.bcna
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.bcna/priv_validator_state.json.backup $HOME/.bcna/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart bitcanna.service && sudo journalctl -f -u bitcanna.service
```