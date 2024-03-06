### Update system and install build tools

```
sudo apt update
sudo apt-get install git curl build-essential make jq gcc snapd chrony lz4 tmux unzip bc -y
```

### Install Go

```
rm -rf $HOME/go
sudo rm -rf /usr/local/go
cd $HOME
curl https://dl.google.com/go/go1.21.0linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
source $HOME/.profile
go version
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
~/go/bin/.{{denomName}} init <node_name> --chain-id="{{chainId}}"
```

### Download genesis.json

```
curl -Ls {{genesisUrl}} > $HOME/.{{denomName}}/config/genesis.json
```

### Download addrbook.json

```
curl -Ls {{addrbookUrl}} > $HOME/.{{denomName}}/config/addrbook.json
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
sudo nano /etc/systemd/system/{{denomName}}.service
```

Replace <your_user>

```
[Unit]
Description={{denomName}} Daemon cosmovisor
After=network-online.target

[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/cosmovisor run start
Restart=always
RestartSec=3
LimitNOFILE=4096
Environment="DAEMON_NAME={{denomName}}"
Environment="DAEMON_HOME=/home/<your_user>/.{{denomName}}"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_LOG_BUFFER_SIZE=512"

[Install]
WantedBy=multi-user.target
```

#### Simple service file:

Set up service:

```
sudo nano /etc/systemd/system/{{denomName}}.service
```

Replace <your_user>

```
[Unit]
Description={{denomName}} Daemon
After=network-online.target
[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/.{{denomName}}
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
```

### Start service

```
sudo systemctl enable {{denomName}}.service && sudo systemctl start {{denomName}}.service && journalctl -u {{denomName}}.service -f
```
