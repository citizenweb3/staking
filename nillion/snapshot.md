# How to Process Nillion Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop nillion.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.nillionapp/data/priv_validator_state.json $HOME/.nillionapp/priv_validator_state.json.backup
```

### Reset your node state
```bash
nilchaind tendermint unsafe-reset-all --home $HOME/.nillionapp --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/nillion/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.nillionapp
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.nillionapp/priv_validator_state.json.backup $HOME/.nillionapp/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart nillion.service && sudo journalctl -f -u nillion.service
```