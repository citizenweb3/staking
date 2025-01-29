# How to Process Uptick Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop uptick.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.uptickd/data/priv_validator_state.json $HOME/.uptickd/priv_validator_state.json.backup
```

### Reset your node state
```bash
uptickd tendermint unsafe-reset-all --home $HOME/.uptickd --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/uptick/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.uptickd
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.uptickd/priv_validator_state.json.backup $HOME/.uptickd/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart uptick.service && sudo journalctl -f -u uptick.service
```