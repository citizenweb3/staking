## Snapshot Service
Updates every 4 hours, size: ~6GB

```bash
cd $HOME
wget -O snapshot.tar.gz https://snapshots.crossfi-testnet.posthuman.digital/snapshot.tar.gz
```
### Stop the node
```bash
sudo systemctl stop crossfid.service
```
### Backup and prepare for the new snapshot
```bash
cp $HOME/.crossfid/data/priv_validator_state.json $HOME/.crossfid/priv_validator_state.json.backup

rm -rf $HOME/.local/share/namada/shielded-expedition.88f17d1d14/db $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data
```
###  Decompress the data downloaded and move all to your directory
```bash
tar -xvf $HOME/snapshot.tar.gz -C $HOME/.crossfid/

mv $HOME/.crossfid/priv_validator_state.json.backup $HOME/.crossfid/data/priv_validator_state.json
```
### Restart the node and check the logs
```bash
sudo systemctl restart crossfid.service && sudo journalctl -u crossfid.service -f
```
### Please tidy up after yourself
```bash
rm -rf $HOME/snapshot.tar.gz
```
