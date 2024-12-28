### Live Peers for Likecoin

Add this peers, from the registry, to your **config.toml**:

```
913bd0f4bea4ef512ffba39ab90eae84c1420862@34.82.131.35:26656,e44a2165ac573f84151671b092aa4936ac305e2a@nnkken.dev:26656,d354a96014507ea480d04f8fe009dd5a4f7fe7fb@likecoin-seed.oldcat.io.oldcat.io:26656,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=f087d600cf3d34d3bac04a9723a53180619e8445@35.247.83.138:26656,fd7589625f4ad41bb93f96f4c962ed6638426497@like.peer.stavr.tech:1006,20afcd5637b2278efc78c54fd523bd331d1820f2@78.47.110.110:26656,5940f55e0e7e2f1a2c9507bf62fbfd7c6d2f3874@likechain.oursky.com:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.liked/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
c46842036cfd8b956f0969e25f0a6599ad98e2a9@mainnet.seednode.citizenweb3.com:33656
```
