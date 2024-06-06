## Download binary
```bash
cd $HOME
rm -rf initia
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.15
make install
```

## Download addrbook and genesis files
```bash
wget -O $HOME/.initia/config/genesis.json https://initia.s3.ap-southeast-1.amazonaws.com/initiation-1/genesis.json
wget -O $HOME/.initia-chain/config/addrbook.json https://testnet-files.itrocket.net/initia/addrbook.json
```

## Add seeds and peers
```bash
SEEDS="ce895c7e7bca10a581b132be91fbf119eb8981bc@46.39.246.50:16656"
PEERS="aee7083ab11910ba3f1b8126d1b3728f13f54943@initia-testnet-peer.itrocket.net:11656,eaccff99569bbf63456775534cc0f54f52c889bc@158.220.98.217:26656,4c6a1f142c2d26cf52187ecc8411ea9d780dc666@138.201.137.86:13056,54742be13e24c65bb5a5770db40b2a44a8992a4a@144.91.125.32:26656,a9bc4d1b8603236b23f69599996e26b751e23b5f@157.173.198.97:26656,f3b94684ee056875523f0a85d96325fc78d8d709@162.55.24.104:26656,06790b1813bf34bfe8e386454debacd66c5772ea@5.252.52.139:26656,db04d4ffd9efe74ec844d8de94bd1cc1721c2f67@45.67.228.52:26656,5158c741d5be106c16c5fe68b1d83744267a12b8@37.27.131.254:13656,9cf4fb2da8ad23a770284df513b428eb79b42a92@207.244.240.27:26656,214af31867faa1dfa1320b97da7ee1019054b488@188.214.129.222:26656,ea02c6a9ca6a58b7b7a85295d54556ea785f0f8b@89.116.29.140:53456,7b3c2bd99e7f6bcca8c6c073f919a267b52bb867@54.189.184.82:26656,60a02209caf4e59206efa0b95cfdbe6b3d4cf186@141.95.85.179:26656,cce50f542aa842cb814306cc4676fff1f88865c3@162.55.3.199:26656,53eebd12c81059727c4a711084b6037451bdafb6@49.12.151.215:26656,58365247ff80e7e5b840d2aa0bf06e4a8d9fc531@31.220.73.225:26656,b4fba0d7810ff990bf81998eb1febfc1c32ae0ba@133.186.198.236:26656,3d7aad49a75791ea7ddb4a8c00d7de9377617d1e@176.227.202.20:57256,0ac5727d219ee09a12cf3e2b61a25ae51bcbca70@49.12.174.227:26656,babe2962186dcba184b362d7730cadd189c64f93@38.242.255.221:26656"
sed -i -e "s/^seeds *=.*/seeds = \"$SEEDS\"/; s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.initia/config/config.toml

```
## Set minimum gas price, enable prometheus and disable indexing

```bash
# set minimum gas price, enable prometheus and disable indexing
sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "0.15uinit,0.01uusdc"|g' $HOME/.initia/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.initia/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.initia/config/config.toml
```

## Create service file
```bash
sudo nano /etc/systemd/system/initiad.service
```

```
[Unit]
Description=Initia node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.mineplex-chain
ExecStart=$(which crossfid) start --home $HOME/.mineplex-chain
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF
```

## Download snapshot or use state-sync

## Start node 

```
sudo systemctl enable initiad
sudo systemctl restart initiad && sudo journalctl -u initiad -f
```
