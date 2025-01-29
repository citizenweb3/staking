# How to Process Osmosis Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop osmosis.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.osmosisd/data/priv_validator_state.json $HOME/.osmosisd/priv_validator_state.json.backup
```

### Reset your node state
```bash
osmosisd tendermint unsafe-reset-all --home $HOME/.osmosisd --keep-addr-book
rm -r $HOME/.osmosisd/wasm
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/osmosis/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.osmosisd
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.osmosisd/priv_validator_state.json.backup $HOME/.osmosisd/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart osmosis.service && sudo journalctl -f -u osmosis.service
```