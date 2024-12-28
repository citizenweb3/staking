### Live Peers for Atomone

Add this peers, from the registry, to your **config.toml**:

```
8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656, 10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-atomone.ibs.team:16684,ebc272824924ea1a27ea3183dd0b9ba713494f83@atomone-mainnet-seed.autostake.com:27396
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=9dac79c27e4dba77cb22b0b25933fee6c8121cf7@72.46.84.243:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@atomone-mainnet-peer.autostake.com:27396
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.atomone/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
57e11247cd5c12420c37e68fe3157bc51ca84ca3@mainnet.seednode.citizenweb3.com:26756
```
