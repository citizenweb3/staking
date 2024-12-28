### Live Peers for Dymension

Add this peers, from the registry, to your **config.toml**:

```
45bffa41836302b06310af67f012500cc0d1da31@rpc.dymension.nodestake.org:666,ebc272824924ea1a27ea3183dd0b9ba713494f83@dymension-mainnet-seed.autostake.com:27086,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:20556,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@dymension.rpc.kjnodes.com:14659,193262e32a9d7d3fffe14073160cabc4cdfef26b@dymension-rpc.stakeandrelax.net:20556,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:20556,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-dymension.ibs.team:16676,86bd5cb6e762f673f1706e5889e039d5406b4b90@seed.dymension.node75.org:10956,258f523c96efde50d5fe0a9faeea8a3e83be22ca@seed.mainnet.dymension.aviaone.com:10290,a413834999fa34ae17d6a32a36017bceb68783ca@seed.dymension.mainnet.dteam.tech:29656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=792be7c7645f0547b786e89cd6ec3ba267d11613@141.94.64.81:26656,e0d84deab2d0fd85f447c5c417fecbbdba584be0@dymension-m.peer.stavr.tech:17086,be3c133f618a8326f2f8da6f803750292454ebdc@45.76.38.67:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@dymension-mainnet-peer.autostake.com:27086,babe3d67aa5570e65953a5253eaf36c7ebfbbb44@82.223.0.229:26646,c600039ef70040740ae130d455768c509d173b12@peer.dymension.node75.org:23836,e3522d6de016578ac0935c4c55e13e4aac6f0693@peer.dymension.mainnet.dteam.tech:29656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.dymension/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
8679333e027be05116c388c040d7c45ca1aeeeeb@mainnet.seednode.citizenweb3.com:14656
```
