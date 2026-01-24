# How to Process {{chain_name}} Snapshot

### Install dependencies, if needed
```bash
sudo apt update
sudo apt install lz4 -y
```

### Stop your node
```bash
sudo systemctl stop {{daemon_name}}.service
```

### Back up your validator state (important for validators)
```bash
cp $HOME/.{{daemon_name}}/data/priv_validator_state.json $HOME/.{{daemon_name}}/priv_validator_state.json.backup
```

### Reset your node state
```bash
{{daemon_name}} tendermint unsafe-reset-all --home $HOME/.{{daemon_name}} --keep-addr-book
```

### Download and decompress the snapshot
```bash
curl https://mainnet-snapshots.citizenweb3.com/{{chain_name}}/snapshot_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.{{daemon_name}}
```

### Replace the backed-up validator state (for validators only)
```bash
mv $HOME/.{{daemon_name}}/priv_validator_state.json.backup $HOME/.{{daemon_name}}/data/priv_validator_state.json
```

### Restart your node
```bash
sudo systemctl restart {{daemon_name}}.service && sudo journalctl -f -u {{daemon_name}}.service
```

---

**Note:** This template is designed for Cosmos SDK-based chains. For non-Cosmos networks (e.g., Aztec, Ethereum) and specialized services (e.g., Namada indexer/MASP snapshots), the snapshot process may differ significantly. Refer to specific network documentation for unique procedures.