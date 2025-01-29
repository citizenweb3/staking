# How to Process Neutron Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop neutrond.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.neutrond/data/priv_validator_state.json $HOME/.neutrond/priv_validator_state.json.backup
```

### Reset your node state
```bash
neutrond tendermint unsafe-reset-all --home $HOME/.neutrond --keep-addr-book
rm -r $HOME/.neutrond/wasm
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/neutron/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.gaia
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.neutrond/priv_validator_state.json.backup $HOME/.neutrond/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart neutron.service && sudo journalctl -f -u neutron.service
```