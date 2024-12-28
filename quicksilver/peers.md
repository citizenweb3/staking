### Live Peers for Quicksilver

Add this peers, from the registry, to your **config.toml**:

```
940c0dc153b0e344de6368d101a97fd4d9e69eff@seeds.cros-nest.com:25656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:11156,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:11156,babc3f3f7804933265ec9c40ad94f4da8e9e0017@seed.rhinostake.com:11156,ebc272824924ea1a27ea3183dd0b9ba713494f83@quicksilver-mainnet-seed.autostake.com:27026,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@quicksilver.rpc.kjnodes.com:11159,a85a651a3cf1746694560c5b6f76d566c04ca581@quicksilver-seed.takeshi.team:10456,559e316b30830ddd5e93617592ef70330ecce86d@seed-quicksilver.ibs.team:16668,95fe6a416dff4150e0394f8b429743db60ea1327@seed-node.mms.team:27656,20783f43c3b574e9020d22be3415f8a545f0617f@seed.quicksilver.validatus.com:4000
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=ebc272824924ea1a27ea3183dd0b9ba713494f83@quicksilver-mainnet-peer.autostake.com:27026,3461638afd470034067392e5dba8dcf6de49f81f@rpc.quicksilver.indonode.net:28656,958d4be52e81fb4d2cbca134ba7fc9f91cfef247@65.108.226.26:16656,ae44851a5d63d70382c1621bc7727db2a40d10d0@quick.peers.stavr.tech:21026,58fe3a7b075e7302f8b46b8171a0aa19ff4a427a@65.108.195.29:31126,9bd2b7e39fb0d823402f22c90e3000fdf3cd05bf@88.99.104.180:26656,8200b77d075f2634e6f9dab11fd56726a2e6d75b@quicksilver-seed.theamsolutions.info:31656,82b49e6cc0826642e745b7a7a621aecbf8083af7@peer-quicksilver.mms.team:56103,3b3384dc98b0e0d8bb12eb21c396c19ce0e46cb0@138.201.21.197:50656,66a0cd5eff87ec7b1ea2e3b41032c1c2d22aa284@mainnet-quicksilver.konsortech.xyz:46657
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.quicksilverd/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
719ddc260d5bbd17a7c6ed4219bdbad60d423d96@mainnet.seednode.citizenweb3.com:28656
```
