# How to Process Oraichain Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop oraid.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.oraid/data/priv_validator_state.json $HOME/.oraid/priv_validator_state.json.backup
```

### Reset your node state
```bash
oraid tendermint unsafe-reset-all --home $HOME/.oraid --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/orai/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.oraid
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.oraid/priv_validator_state.json.backup $HOME/.oraid/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart oraid.service && sudo journalctl -f -u oraid.service
```
