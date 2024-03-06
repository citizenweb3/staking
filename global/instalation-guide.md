Before node instalation make sure you have installed go
Useful guile: <https://www.digitalocean.com/community/tutorials/how-to-install-go-on-ubuntu-20-04>
### Update system and install build tools

```
sudo apt update
sudo apt-get install git curl build-essential make jq gcc snapd chrony lz4 tmux unzip bc -y
```

### Install node

```
cd $HOME
mkdir src
cd src
git clone {{gitRepo}}
cd {{homeDir}}
git checkout {{currentVersion}}
make install
gaiad version
```

### Initialize Node

Replace <node_name>

```
~/go/bin/.{{daemonName}} init <node_name> --chain-id="{{chainId}}"
```

### Download genesis.json

```
curl -Ls {{genesisUrl}} > $HOME/.{{daemonName}}/config/genesis.json
```

### Download addrbook.json

```
curl -Ls {{addrbookUrl}} > $HOME/.{{daemonName}}/config/addrbook.json
```

### Create Service

#### Cosmovisor:

If you haven't cosmovisor, you should install it

```
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

You can find cosmovisor biniry in `~/go/bin/` folder. After that you should create

```
mkdir -p ~/.{{homeDir}}/cosmovisor/genesis/bin && mkdir -p ~/.{{homeDir}}/cosmovisor/upgrades
```

Set up service:

```
sudo nano /etc/systemd/system/{{daemonName}}.service
```

Replace <your_user>

```
[Unit]
Description={{daemonName}} Daemon cosmovisor
After=network-online.target

[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/cosmovisor run start
Restart=always
RestartSec=3
LimitNOFILE=4096
Environment="DAEMON_NAME={{daemonName}}"
Environment="DAEMON_HOME=/home/<your_user>/.{{daemonName}}"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_LOG_BUFFER_SIZE=512"

[Install]
WantedBy=multi-user.target
```

#### Simple service file:

Set up service:

```
sudo nano /etc/systemd/system/{{daemonName}}.service
```

Replace <your_user>

```
[Unit]
Description={{daemonName}} Daemon
After=network-online.target
[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/.{{daemonName}}
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
sudo systemctl enable {{daemonName}}.service && sudo systemctl start {{daemonName}}.service && journalctl -u {{daemonName}}.service -f
```
