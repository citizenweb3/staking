# Custom Installation Guide for Ubuntu Server

RPC: https://rpc.namada.posthuman.digital:443


### Recommended Hardware

- **CPU**: Preferably x86_64 or arm64
- **Memory**: At least 8GB DDR4
- **Storage**: Minimum 1TB of disk space

This guide is intended for advanced users comfortable with command-line interfaces and system administration.

### System Update and Dependency Installation

Begin by updating your system's package list and upgrading existing packages. Then, install necessary dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y make git-core libssl-dev pkg-config libclang-12-dev build-essential protobuf-compiler
```

### System Update and Dependency Installation

Begin by updating your system's package list and upgrading existing packages. Then, install necessary dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y make git-core libssl-dev pkg-config libclang-12-dev build-essential protobuf-compiler
```

## Go Installation

Proceed with installing Go if it isn't already present on your system:

```bash
cd $HOME
if ! command -v go &> /dev/null; then
    VER="1.20.3"
    wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
    sudo rm -rf /usr/local/go
    sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
    rm "go$VER.linux-amd64.tar.gz"
    echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
    source $HOME/.bash_profile
fi
```

### Setting Up Environment Variables

Customize your setup by replacing placeholders with your specific details and save them as environment variables:

```bash
NAMADA_PORT=26
echo "export NAMADA_PORT=$NAMADA_PORT" >> $HOME/.bash_profile
echo "export ALIAS='YOUR_VALIDATOR_NAME'" >> $HOME/.bash_profile
echo "export MEMO='YOUR_TPK_NAM_ADDRESS'" >> $HOME/.bash_profile
echo "export WALLET='YOUR_WALLET_NAME'" >> $HOME/.bash_profile
echo "export PUBLIC_IP=$(wget -qO- eth0.me)" >> $HOME/.bash_profile
echo "export TM_HASH='v0.1.4-abciplus'" >> $HOME/.bash_profile
echo "export CHAIN_ID='shielded-expedition.88f17d1d14'" >> $HOME/.bash_profile
echo "export BASE_DIR='$HOME/.local/share/namada'" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

## Rust and CometBFT Installation

Install Rust and set up CometBFT for enhanced security and performance:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

cd $HOME
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.2
make build
sudo cp build/cometbft /usr/local/bin/
cometbft version
```

## Namada Binaries Setup

Download and prepare Namada binaries:

```bash
cd $HOME
git clone https://github.com/anoma/namada
cd namada
wget https://github.com/anoma/namada/releases/download/v0.31.9/namada-v0.31.9-Linux-x86_64.tar.gz
tar -xvf namada-v0.31.9-Linux-x86_64.tar.gz
sudo mv namad* /usr/local/bin/
if [ ! -d "$BASE_DIR" ]; then
    mkdir -p "$BASE_DIR"
fi
```

### Verifying Namada Installation

Ensure Namada has been installed correctly:

```bash
namada --version
```

## Finalizing the Installation

Join the network as a Pre-Genesis Validator, configure your node, and set up Namada as a service.

### Joining the Network

```bash
namada client utils join-network --chain-id $CHAIN_ID
```

### Service Configuration

Create a systemd service file for Namada to ensure it runs smoothly:

```bash
sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=Namada Service
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$BASE_DIR
ExecStart=$(which namadad) node ledger run
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```
## add peers to config.toml

```bash
PEERS="tcp://d630c49e04eb60a2c9e179a1a3001313fbaff061@seed.namada.posthuman.digital:26656,tcp://7233f22a664457479a6b194f590f2db95c726240@namada-testnet-peer.itrocket.net:33656,tcp://95d58c49e8177dbb67ded1475381011b7c28c375@116.202.241.157:26656,tcp://8a9872e2502be4fd2664dc1477020f36a38a4940@5.78.71.104:26656"
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/.local/share/namada/shielded-expedition.88f17d1d14/config.toml
```

Use our [snapshot service here](https://github.com/Validator-POSTHUMAN/posthuman-source-data/blob/main/namada/snapshot-service.md) to sync really quick!

### Set custom ports in config.toml:

```bash
sed -i.bak -e "s%:26658%:${NAMADA_PORT}658%g;
s%:26657%:${NAMADA_PORT}657%g;
s%:26656%:${NAMADA_PORT}656%g;
s%:26545%:${NAMADA_PORT}545%g;
s%:8545%:${NAMADA_PORT}545%g;
s%:26660%:${NAMADA_PORT}660%g" $HOME/.local/share/namada/shielded-expedition.88f17d1d14/config.toml
```
## start the service
```bash
sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad && sudo journalctl -u namadad -f
```

## 🔎 Create and Fund Wallet

### Create Wallet:
```bash
namadaw gen --alias $WALLET
```

### Restore Existing Wallet:
```bash
namadaw derive --alias $WALLET
```

### Find Your Wallet Address:
```bash
namadaw find --alias $WALLET
```
- Copy the implicit address (starts with tnam...) for the next step.

### Fund Your Wallet from Faucet [here](https://namada.faucetme.pro/) 
- After a couple of minutes, check the balance:
```bash
namadac balance --owner $WALLET
```

### List Known Keys and Addresses in the Wallet:
```bash
namadaw list
```

### Check Sync Status:
- Once your node is fully synced, the output will confirm:
```bash
curl http://127.0.0.1:26657/status | jq
```

## 🧑‍🎓 Turn Your Full Node into a Validator

### Initiate a Validator:
```bash
namadac init-validator \
    --commission-rate 0.07 \
    --max-commission-rate-change 1 \
    --signing-keys $WALLET \
    --alias $ALIAS \
    --email <EMAIL_ADDRESS> \
    --website <WEBSITE> \
    --discord-handle <DISCORD> \
    --account-keys $WALLET \
    --memo $MEMO
```

### Find Your Validator Address:
```bash
namadaw list | grep -A 1 ""$ALIAS"" | grep "Established"
```

### Check Your Validator Address and Save:
```bash
namadaw list | grep "Established"
```

###  Wait for 2 Epochs and Restart the Node
```bash
sudo systemctl restart namadad && sudo journalctl -u namadad -f
```
