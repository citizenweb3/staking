### Live Peers for {{pretty_name}}

Add this peers, from the registry, to your **config.toml**:

```
{{:peers.seeds:{id}@{address}:,}}
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS={{:peers.persistent_peers:{id}@{address}:,}}
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" {{node_home}}/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
{{endpoints.seed-node}}
```
