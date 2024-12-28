### Live Peers for Stride

Add this peers, from the registry, to your **config.toml**:

```
babc3f3f7804933265ec9c40ad94f4da8e9e0017@seed.rhinostake.com:12256,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:12256,cb91a11588d66cfd9c01f99541df4978a08e0e39@seedv1.main.stridenet.co:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:12256,ebc272824924ea1a27ea3183dd0b9ba713494f83@stride-mainnet-seed.autostake.com:26886,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@stride.rpc.kjnodes.com:11659,86bd5cb6e762f673f1706e5889e039d5406b4b90@stride.seed.node75.org:10456,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:12256,ced7684f4d60399986cdbc1465ac00a420a14202@seed-stride-01.stakeflow.io:1807,b85358e035343a3b15e77e1102857dcdaf70053b@seeds.bluestake.net:23856,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-stride.ibs.team:16888
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=df3f533e6b9776c11f08da804edcb810cbdd2080@65.108.234.23:12256,e821acdaf0c7a3c60ea3cd4eb4a98a62dad06f58@43.201.12.41:26656,a7b4cf6f65138ba61518c2c45402da32dc8e28b7@stride.peer.stavr.tech:21016,b5f9fa874781f975687018ae559f0d952d3a2e24@52.52.208.179:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@stride-mainnet-peer.autostake.com:26886,ced7684f4d60399986cdbc1465ac00a420a14202@peer-stride-01.stakeflow.io:1807,4d17c6e85a1e6282efee950ff3dfe85b4b043f0f@148.251.51.144:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.stride/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
aab3f03bfb030244e018f20681b2ac6b9ad0d0f7@mainnet.seednode.citizenweb3.com:30656
```
