## Snapshot Service
Updated every 4 hours, size: ~14GB. Download and apply the snapshot with the following commands:

```bash
cd $HOME
wget -O snap_namada.tar https://testnet-files.posthuman.digital/namada/snap_namada.tar
# Stop the node
sudo systemctl stop namadad
# Backup and prepare for the new snapshot
cp $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup
rm -rf $HOME/.local/share/namada/shielded-expedition.88f17d1d14/db $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data
tar -xvf $HOME/snap_namada.tar -C $HOME/.local/share/namada/shielded-expedition.88f17d1d14
mv $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json
# Restart the node
sudo systemctl restart namadad && sudo journalctl -u namadad -f
# Clean up
rm -rf $HOME/snap_namada.tar
```
