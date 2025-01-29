# How to Process Althea Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop althea.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.althea/data/priv_validator_state.json $HOME/.althea/priv_validator_state.json.backup
```

### Reset your node state
```bash
althea tendermint unsafe-reset-all --home $HOME/.althea --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/althea/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.althea
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.althea/priv_validator_state.json.backup $HOME/.althea/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart althea.service && sudo journalctl -f -u althea.service
```