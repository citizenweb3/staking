### Live Peers for Space-Pussy

Add this peers, from the registry, to your **config.toml**:

```
62d74096cc8ddb83570a7d3167b5ef56f74853f5@212.248.62.42:36656,0b2689ae3b712adbaf4f3a124ca175725aa01fcd@95.216.76.211:26656,6c8dc2888fc42b910c4bd34d7d51ee1d01946c76@93.159.134.158:36656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=62d74096cc8ddb83570a7d3167b5ef56f74853f5@212.248.62.42:36656,0b2689ae3b712adbaf4f3a124ca175725aa01fcd@95.216.76.211:26656,6c8dc2888fc42b910c4bd34d7d51ee1d01946c76@93.159.134.158:36656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.pussy/config/config.toml
```
