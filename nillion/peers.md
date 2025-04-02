### Live Peers for Nillion

Add this peers, from the registry, to your **config.toml**:

```
dd44b6758db4590df52c64bfae9a4f549db019bf@65.21.214.84:28156,6807aee514f058b42abcfae875f400fe50f9b11c@13.124.58.33:26656,3b9feb89a38538c8e476071e9da84d6b5777f0bc@162.55.132.169:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@185.16.39.172:27076,9da9bd9147db409d1e3c080379d09753c7cc8889@35.214.131.222:26656,396e0e151da5e4f2c46b797785a6a54c2091fb2c@65.21.16.240:28156,46bf306966af92060402066f765b3ec890e35dd1@88.99.161.228:26656,cb6ae22e1e89d029c55f2cb400b0caa19cbe5523@38.132.56.20:32606
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=da35ecf9bfe1c6c0b69c0514a51a990aba77f34c@149.50.101.126:26656,4349a7c643ddc877f17e6888684d65c71ad7127d@135.181.239.99:28156,dd46a0e919753c2bc199a3c99cb463a55dc01290@157.180.4.156:56656,c7ceed47dc6ef55193a2653894ff19ad525ca864@40.160.12.190:26656,cb6ae22e1e89d029c55f2cb400b0caa19cbe5523@38.132.56.20:32606
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.nillionapp/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
0e31070d51997952d06a5fc1b0506e7d5c2d4de8@78.46.79.242:18056
```
