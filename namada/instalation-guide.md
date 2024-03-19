# Custom Installation Guide for Ubuntu Server
RPC:
https://rpc.namada.posthuman.digital:443
## Introduction

This custom guide outlines the process for manually setting up a server environment on Ubuntu, focusing on installing specific software with security and efficiency in mind. It covers everything from updating system packages to configuring essential services.

### Recommended Hardware

- **CPU**: Preferably x86_64 or arm64
- **Memory**: At least 8GB DDR4
- **Storage**: Minimum 1TB of disk space

## Preparation

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
    echo "export PATH=\$PATH:/usr/local/go/bin:\$HOME/go/bin" >> \$HOME/.bash_profile
    source \$HOME/.bash_profile
fi
```

### Setting Up Environment Variables

Customize your setup by replacing placeholders with your specific details and save them as environment variables:

```bash
NAMADA_PORT=26
echo "export NAMADA_PORT=\$NAMADA_PORT" >> \$HOME/.bash_profile
echo "export ALIAS='YOUR_VALIDATOR_NAME'" >> \$HOME/.bash_profile
echo "export MEMO='YOUR_TPK_NAM_ADDRESS'" >> \$HOME/.bash_profile
echo "export WALLET='YOUR_WALLET_NAME'" >> \$HOME/.bash_profile
echo "export PUBLIC_IP=\$(wget -qO- eth0.me)" >> \$HOME/.bash_profile
echo "export TM_HASH='v0.1.4-abciplus'" >> \$HOME/.bash_profile
echo "export CHAIN_ID='shielded-expedition.88f17d1d14'" >> \$HOME/.bash_profile
echo "export BASE_DIR='\$HOME/.local/share/namada'" >> \$HOME/.bash_profile
source \$HOME/.bash_profile
```

## Rust and CometBFT Installation

Install Rust and set up CometBFT for enhanced security and performance:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source \$HOME/.cargo/env

cd \$HOME
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
cd \$HOME
git clone https://github.com/anoma/namada
cd namada
wget https://github.com/anoma/namada/releases/download/v0.31.9/namada-v0.31.9-Linux-x86_64.tar.gz
tar -xvf namada-v0.31.9-Linux-x86_64.tar.gz
sudo mv namad* /usr/local/bin/
if [ ! -d "\$BASE_DIR" ]; then
    mkdir -p "\$BASE_DIR"
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
namada client utils join-network --chain-id \$CHAIN_ID
```

### Service Configuration

Create a systemd service file for Namada to ensure it runs smoothly:

```bash
sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=Namada Service
After=network-online.target

[Service]
User=\$USER
WorkingDirectory=\$BASE_DIR
ExecStart=\$(which namada) node ledger run
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

This guide is intended for advanced users comfortable with command-line interfaces and system administration.

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

### Fund Your Wallet from Faucet
- After a couple of minutes, check the balance:
```bash
namadac balance --owner $WALLET
```

### List Known Keys and Addresses in the Wallet:
```bash
namadaw list
```

### Delete Wallet:
```bash
namadaw remove --alias $WALLET --do-it
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

### Replace Your Validator Address and Save:
```bash
VALIDATOR_ADDRESS=$(namadaw list | grep -A 1 ""$ALIAS"" | grep "Established" | awk '{print $3}') 
echo "export VALIDATOR_ADDRESS="$VALIDATOR_ADDRESS"" >> $HOME/.bash_profile 
source $HOME/.bash_profile
```

### Restart the Node and Wait for 2 Epochs:
```bash
sudo systemctl restart namadad && sudo journalctl -u namadad -f
```
