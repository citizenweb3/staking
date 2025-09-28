### Live Peers for Namada

Add this peers, from the registry, to your **config.toml**:

```
tcp://a26e06ea312c6c5612b38aafc45cbec300b6a43b@b3.emberstake.xyz:14200,tcp://9a8b49025b395b356d8b76591ab84134bbb435fd@138.197.133.118:26656,tcp://e3d64ac69ebb09cc05e2966db2943dbc386ba955@namada-testnet-peer.itrocket.net:33656,tcp://a118ec7551a264789c3b07d00fc848e6988e2328@namada-housefire-peer.denodes.xyz:56656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=tcp://a26e06ea312c6c5612b38aafc45cbec300b6a43b@b3.emberstake.xyz:14200,tcp://9a8b49025b395b356d8b76591ab84134bbb435fd@138.197.133.118:26656,tcp://e3d64ac69ebb09cc05e2966db2943dbc386ba955@namada-testnet-peer.itrocket.net:33656,tcp://a118ec7551a264789c3b07d00fc848e6988e2328@namada-housefire-peer.denodes.xyz:56656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.local/share/namada/namada.5f5de2dd1b88cba30586420/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
tcp://1dae6535bf5e4663ccb7c7294c129221b6018d22@168.119.37.164:26656
```
