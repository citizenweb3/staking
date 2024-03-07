### All Live Peers for Dymension

Here is a list of peers from registry. Add them to your **config.toml** if you have trouble finding peers.

```
{{:peers.seeds:{id}@{address}:,}}
```

Here is a script for you to update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time, so the script below selects up to 5 random live peers.

```
PEERS={{:peers.persistent_peers:{id}@{address}:,}}
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" {{node_home}}/config/config.toml
```

When you state-sync, you might also consider adding Posthuman's state-sync peer to your **persistent_peers** setting in **config.toml**.
{{endpoints.seed-node}}
