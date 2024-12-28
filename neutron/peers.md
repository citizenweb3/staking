### Live Peers for Neutron

Add this peers, from the registry, to your **config.toml**:

```
74f3a4a0423e72334f4439b438b29934e5f0dbbd@p2p-xyphion.neutron-1.neutron.org:26656,65beeffac5c0f29e6c3749687f03b2040d265895@p2p-talzor.neutron-1.neutron.org:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:19156,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:19156,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-neutron.ibs.team:16686
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=74f3a4a0423e72334f4439b438b29934e5f0dbbd@p2p-xyphion.neutron-1.neutron.org:26656,65beeffac5c0f29e6c3749687f03b2040d265895@p2p-talzor.neutron-1.neutron.org:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:19156,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:19156,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-neutron.ibs.team:16686
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.neutrond/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
1020d1490712fe3e669658e506b46a5974a430fc@mainnet.seednode.citizenweb3.com:31656
```
