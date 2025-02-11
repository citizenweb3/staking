# How to Process Namada Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop namada.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/priv_validator_state.json.backup
```

### Reset your node state
```bash
rm -rf $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/cometbft/data
rm -rf $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/db
```

### Download and decompress the snapshot
```bash
curl https://testnet-snapshots.citizenweb3.com/namada/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/priv_validator_state.json.backup $HOME/.local/share/namada/housefire-alpaca.cc0d3e0c033be/cometbft/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart namada.service && sudo journalctl -f -u namada.service
```