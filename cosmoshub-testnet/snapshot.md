# How to Process CosmosHub Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop cosmoshub.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.gaia/data/priv_validator_state.json $HOME/.gaia/priv_validator_state.json.backup
```

### Reset your node state
```bash
gaiad tendermint unsafe-reset-all --home $HOME/.gaia --keep-addr-book
rm -r $HOME/.gaia/wasm
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/cosmos/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.gaia
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.gaia/priv_validator_state.json.backup $HOME/.gaia/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart cosmoshub.service && sudo journalctl -f -u cosmoshub.service
```