## Snapshot Service
Updated every 4 hours, size: ~14GB. Download and apply the snapshot with the following commands:

```bash
cd $HOME
wget -O data.tar.gz https://snapshots.namada.posthuman.digital/data.tar.gz
```
### Stop the node
```bash
sudo systemctl stop namadad
```
### Backup and prepare for the new snapshot
```bash
cp $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup

rm -rf $HOME/.local/share/namada/shielded-expedition.88f17d1d14/db $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data
```
###  Decompress the data downloaded via our service and move all to your directory
```bash
tar -xvf $HOME/data.tar.gz -C $HOME/.local/share/namada/shielded-expedition.88f17d1d14
mv $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json
```
### Restart the node and check the logs
```bash
sudo systemctl restart namadad && sudo journalctl -u namadad -f
```
### Please tidy up after yourself
```bash
rm -rf $HOME/data.tar.gz
```
Enjoy it
