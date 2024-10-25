
# Story Node Installation Guide

## Recommended Hardware:
- **CPU:** 4 Cores
- **Memory:** 8GB RAM
- **Storage:** 200GB NVME

---

## Install Dependencies
Ensure your system is up to date and has all the necessary tools for the installation:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential bsdmainutils git make ncdu gcc git jq chrony liblz4-tool -y
```

---

## Install Go 
Replace `VERSION` with the desired Go version
```bash
VERSION="1.22.3"
cd $HOME
wget "https://golang.org/dl/go$VERSION.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VERSION.linux-amd64.tar.gz"
rm "go$VERSION.linux-amd64.tar.gz"

# Set Go environment variables
echo "export PATH=\$PATH:/usr/local/go/bin:\$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
```

---

## Set Environment Variables
Set up your node by exporting environment variables. This helps customize the node’s behavior:
```bash
echo "export MONIKER="test"" >> ~/.bash_profile
echo "export STORY_CHAIN_ID="iliad-0"" >> ~/.bash_profile
echo "export STORY_PORT="26"" >> ~/.bash_profile
source ~/.bash_profile
```

---

## Download Binaries
Get the required Story binaries:
```bash
cd $HOME
wget -O geth https://github.com/piplabs/story-geth/releases/download/v0.9.4/geth-linux-amd64
chmod +x $HOME/geth
mv $HOME/geth ~/go/bin/
mkdir -p $HOME/.story/story
mkdir -p $HOME/.story/geth
```

---

## Install Story
Clone the Story repository and build the client:
```bash
cd $HOME
rm -rf story
git clone https://github.com/piplabs/story
cd story
git checkout v0.11.0
go build -o story ./client 
mv $HOME/story/story $HOME/go/bin/
```

---

## Initialize Story App
Initialize the Story node with your custom moniker and network settings:
```bash
story init --moniker test --network iliad
```

---

## Set Seeds and Peers
Set the seeds and peers for your node:
```bash
SEEDS="51ff395354c13fab493a03268249a74860b5f9cc@story-testnet-seed.itrocket.net:26656,b7e9b91c9e8c7e66e46dd15720cbe4f74f005592@galactica.seed-t.stavr.tech:35106,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@testnet-seeds.polkachu.com:29256"
PEERS="0c9b936f1dc0af34679782d2ce8c80f0f8a106b3@136.243.13.36:29256,72a9d2790b6d3ff21fae0e493b62cca6b4c9f91c@65.109.28.187:26656,8a69935f34827dd81c721c63c69bfc54c849d028@46.4.52.158:26656,2f372238bf86835e8ad68c0db12351833c40e8ad@story-testnet-peer.itrocket.net:26656"
sed -i -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*seeds *=.*/seeds = "$SEEDS"/}" -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*persistent_peers *=.*/persistent_peers = "$PEERS"/}" $HOME/.story/story/config/config.toml
```

---

## Download Genesis and Addrbook
Download the required genesis and address book files:
```bash
wget -O $HOME/.story/story/config/genesis.json https://snapshots.story.posthuman.digital/genesis.json
wget -O $HOME/.story/story/config/addrbook.json https://snapshots.story.posthuman.digital/addrbook.json
```

---

## Customize Ports
Set custom ports in your configuration files:
```bash
sed -i.bak -e "s%:1317%:${STORY_PORT}317%g; s%:8551%:${STORY_PORT}551%g" $HOME/.story/story/config/story.toml
sed -i.bak -e "s%:26658%:${STORY_PORT}658%g; s%:26657%:${STORY_PORT}657%g; s%:26656%:${STORY_PORT}656%g; s%^external_address = ""%external_address = "$(wget -qO- eth0.me):${STORY_PORT}656"%;" $HOME/.story/story/config/config.toml
```

---

## Enable Prometheus and Disable Indexing
Enable Prometheus for monitoring and disable indexing:
```bash
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.story/story/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = "null"/" $HOME/.story/story/config/config.toml
```

---

## Create Geth Service File
Create a systemd service file for the Geth daemon:
```bash
sudo tee /etc/systemd/system/story-geth.service > /dev/null <<EOF
[Unit]
Description=Story Geth daemon
After=network-online.target

[Service]
User=$USER
ExecStart=$HOME/go/bin/geth --iliad --syncmode full --http --http.api eth,net,web3,engine --http.vhosts '*' --http.addr 0.0.0.0 --http.port ${STORY_PORT}545 --authrpc.port ${STORY_PORT}551 --ws --ws.api eth,web3,net,txpool --ws.addr 0.0.0.0 --ws.port ${STORY_PORT}546
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

---

## Create Story Service File
Create a systemd service file for the Story application:
```bash
sudo tee /etc/systemd/system/story.service > /dev/null <<EOF
[Unit]
Description=Story Service
After=network.target

[Service]
User=$USER
WorkingDirectory=$HOME/.story/story
ExecStart=$(which story) run

Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF
```

---

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
```

---

## Enable and Start Services
Reload systemd, enable and start the services:
```bash
sudo systemctl daemon-reload
sudo systemctl enable story story-geth
sudo systemctl start story story-geth
```

---

## Check Logs
Monitor the logs for both the Story and Geth services:
```bash
journalctl -u story -u story-geth -f
```

---

## Firewall Configuration
Configure firewall rules to allow network traffic:
```bash
sudo ufw allow 30303/tcp comment geth_p2p_port
sudo ufw allow 26656/tcp comment story_p2p_port
```

---

## Deleting the Node
To completely remove the node and services, run the following commands:
```bash
sudo systemctl stop story story-geth
sudo systemctl disable story story-geth
rm -rf $HOME/.story
sudo rm /etc/systemd/system/story.service /etc/systemd/system/story-geth.service
sudo systemctl daemon-reload
```

---
