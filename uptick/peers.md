### Live Peers for Uptick

Add this peers, from the registry, to your **config.toml**:

```
f97a75fb69d3a5fe893dca7c8d238ccc0bd66a8f@uptick.seed.brocha.in:30600,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@uptick.rpc.kjnodes.com:11559,e71bae28852a0b603f7360ec17fe91e7f065f324@uptick-mainnet-seed.itrocket.net:35656,bfc5a787583ee52e9e5f2e160e6b32a9cfe213fd@seed-node.mms.team:36656,df949a46ae6529ae1e09b034b49716468d5cc7e9@seeds.stakerhouse.com:10656,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=94b63fddfc78230f51aeb7ac34b9fb86bd042a77@uptick-rpc.p2p.brocha.in:30601,dd482d080820020b144ca2efaf128d78261dea82@uptick-mainnet-peer.itrocket.net:10656,c65c6ecfb60635fc8a076b6f90fcd2607aceaa64@uptick.peers.stavr.tech:3156,37604dc6535a2f1b91e38c35f77b5be4a93c35b2@45.77.168.172:26656,038aca614e49ec4e5e3a06c875976a94c478cb09@65.108.195.29:21656,3ffde1aaf638c681fb4bd3fa24f0786f68a16611@peer-uptick.mms.team:56105
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.uptickd/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
bddaa78825892bde04b5aa8f28b95a072a50eaf9@mainnet.seednode.citizenweb3.com:29656
```
