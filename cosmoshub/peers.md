### Live Peers for Cosmos Hub

Add this peers, from the registry, to your **config.toml**:

```
ba3bacc714817218562f743178228f23678b2873@public-seed-node.cosmoshub.certus.one:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:14956,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:14956,57a5297537b9b6ef8b105c08a8ad3f6ac452c423@seeds.goldenratiostaking.net:1618,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:14956,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@cosmoshub.rpc.kjnodes.com:11359,fe21dd474640247888fc7c4dce82da8da08a8bfd@seed-cosmos-hub-01.stakeflow.io:26656,11c6114a18f7b380e536b0bd17c031f4746e4ded@seed-node.mms.team:43656,87ccc1dcc0b846fc1623ab9a5ab55682e8e2ad2e@seed-cosmoshub.freshstaking.com:26656,b85358e035343a3b15e77e1102857dcdaf70053b@seeds.bluestake.net:28156,00bf1f9d3c65137dc99c40cd03864384ce0ef7c3@cosmoshub-mainnet-seed.itrocket.net:34656,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-cosmos.ibs.team:16685
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=d6318b3bd51a5e2b8ed08f2e520d50289ed32bf1@52.79.43.100:26656,b0e746acb6fbed7a0311fe21cfb2ee94581ca3bc@51.79.21.187:26656,1da54d20c7339713f1d6d28dd2117087dd33d0ca@cosmos-seed.icycro.org:26656,fe21dd474640247888fc7c4dce82da8da08a8bfd@peer-cosmos-hub-01.stakeflow.io:26656,01c0d24922dcdf6f8816ec814a5c3436c5d5fbc5@65.108.195.29:36656,28d36c3d45f0208528de3c38f2934ae241bd23e7@peer-cosmoshub.mms.team:26656,87ccc1dcc0b846fc1623ab9a5ab55682e8e2ad2e@seed-cosmoshub.freshstaking.com:26656,2441723e318545be469d43611d331e3271477ede@cosmoshub-mainnet-peer.itrocket.net:34656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.gaia/config/config.toml

```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
d567c93fa5b646c8cca8ba0a2d7499bca6aeba52@mainnet.seednode.citizenweb3.com:26656
```
