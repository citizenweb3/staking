# Story Node Snapshot Installation Guide

## Pruned Snapshot Installation
Updated every 24 hours

### Pruned Snapshot 
```bash
# Install dependencies, if needed
sudo apt install curl jq lz4  -y

# Stop node
sudo systemctl stop story story-geth

# Backup priv_validator_state.json
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup

# Remove old data and unpack Story snapshot
rm -rf $HOME/.story/story/data
curl https://snapshots-pruned.story.posthuman.digital/story_pruned.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.story/story

# Restore priv_validator_state.json
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json

# Delete Geth data and unpack Geth snapshot
rm -rf $HOME/.story/geth/iliad/geth/chaindata
curl https://snapshots-pruned.story.posthuman.digital/geth_story_pruned.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.story/geth/iliad/geth

# Restart node and check logs
sudo systemctl restart story story-geth
sudo journalctl -u story-geth -u story -f

## Archive Snapshot Installation
Updated every 24 hours

### Archive Snapshot 
```bash
# Install dependencies, if needed
sudo apt install curl jq lz4  -y

# Stop node
sudo systemctl stop story story-geth

# Backup priv_validator_state.json
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup

# Remove old data and unpack Story snapshot
rm -rf $HOME/.story/story/data
curl https://snapshots.story.posthuman.digital/story_archive.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.story/story

# Restore priv_validator_state.json
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json

# Delete Geth data and unpack Geth snapshot
rm -rf $HOME/.story/geth/iliad/geth/chaindata
curl https://snapshots.story.posthuman.digital/geth_story_archive.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.story/geth/iliad/geth

# Restart node and check logs
sudo systemctl restart story story-geth
sudo journalctl -u story-geth -u story -f
