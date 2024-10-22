### Update system and install build tools
Ensure your system is up to date and has all the necessary tools for the installation:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential bsdmainutils git make ncdu gcc git jq chrony liblz4-tool -y
```


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


### Install node

```
cd $HOME
mkdir src
cd src
git clone {{codebase.git_repo}}
cd {{chain_name}}
git checkout {{codebase.recommended_version}}
make install
{{daemon_name}} version
```

### Initialize Node

Replace <node_name>

```
~/go/bin/.{{daemon_name}} init <node_name> --chain-id="{{chain_id}}"
```

### Download genesis.json

```
curl -Ls {{codebase.genesis.genesis_url}} > $HOME/.{{daemon_name}}/config/genesis.json
```

### Download addrbook.json

```
curl -Ls {{addrbookUrl}} > $HOME/.{{daemon_name}}/config/addrbook.json
```

### Create Service

#### Cosmovisor:

If you haven't cosmovisor, you should install it

```
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

You can find cosmovisor biniry in `~/go/bin/` folder. After that you should create

```
mkdir -p ~/.{{chain_name}}/cosmovisor/genesis/bin && mkdir -p ~/.{{chain_name}}/cosmovisor/upgrades
```

Set up service:

```
sudo nano /etc/systemd/system/{{daemon_name}}.service
```

Replace <your_user>

```
[Unit]
Description={{daemon_name}} Daemon cosmovisor
After=network-online.target

[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/cosmovisor run start
Restart=always
RestartSec=3
LimitNOFILE=4096
Environment="DAEMON_NAME={{daemon_name}}"
Environment="DAEMON_HOME=/home/<your_user>/.{{daemon_name}}"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_LOG_BUFFER_SIZE=512"

[Install]
WantedBy=multi-user.target
```

#### Simple service file:

Set up service:

```
sudo nano /etc/systemd/system/{{daemon_name}}.service
```

Replace <your_user>

```
[Unit]
Description={{daemon_name}} Daemon
After=network-online.target
[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/{{daemon_name}} start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
```

### Sync node:

After that you sould sync node. You have 2 ways. State-sync or download snapsot. See this guides in next tabs.

### Start service

```
sudo systemctl enable {{daemon_name}}.service && sudo systemctl start {{daemon_name}}.service && journalctl -u {{daemon_name}}.service -f
```
