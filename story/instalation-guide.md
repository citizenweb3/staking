
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
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y
```

---

## Install Go (Alternative Method)
Instead of downloading the binary, use the following method to install Go:
```bash
sudo apt install golang -y
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
SEEDS="51ff395354c13fab493a03268249a74860b5f9cc@story-testnet-seed.itrocket.net:26656"
PEERS="2f372238bf86835e8ad68c0db12351833c40e8ad@story-testnet-peer.itrocket.net:26656"
sed -i -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*seeds *=.*/seeds = "$SEEDS"/}" -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*persistent_peers *=.*/persistent_peers = "$PEERS"/}" $HOME/.story/story/config/config.toml
```

---

## Download Genesis and Addrbook
Download the required genesis and address book files:
```bash
wget -O $HOME/.story/story/config/genesis.json https://server-3.itrocket.net/testnet/story/genesis.json
wget -O $HOME/.story/story/config/addrbook.json https://server-3.itrocket.net/testnet/story/addrbook.json
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

## Download Snapshots
Backup your current validator state, then download and apply the latest snapshot:
```bash
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data
curl https://server-3.itrocket.net/testnet/story/story_2024-10-18_1530515_snap.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json
```

---

## Enable and Start Services
Reload systemd, enable and start the services:
```bash
sudo systemctl daemon-reload
sudo systemctl enable story story-geth
sudo systemctl restart story story-geth
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
