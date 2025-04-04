# How to Process Artela Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop artela.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.artelad/data/priv_validator_state.json $HOME/.artelad/priv_validator_state.json.backup
```

### Reset your node state
```bash
artelad tendermint unsafe-reset-all --home $HOME/.artelad --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/artela/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.artelad
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.artelad/priv_validator_state.json.backup $HOME/.artelad/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart artela.service && sudo journalctl -f -u artela.service
```