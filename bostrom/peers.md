### Live Peers for Bostrom

Add this peers, from the registry, to your **config.toml**:

```
d0518ce9881a4b0c5872e5e9b7c4ea8d760dad3f@85.10.207.173:26656,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=d0518ce9881a4b0c5872e5e9b7c4ea8d760dad3f@85.10.207.173:26656,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.cyber/config/config.toml
```
