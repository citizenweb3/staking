### Live Peers for Oraichain

Add this peers, from the registry, to your **config.toml**:

```
d2204d84427052e2659509aa17c8cd39871a5cd8@195.201.197.246:27656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:22556,5f46d50a022f5ff38c0497360ce63b7f94ff1ced@orai-seed.ibs.team:9656,0baa806b3a4dd17be6e06369d899f140c3897d6e@18.223.242.70:26656,9749da4a81526266d7b8fe9a03d260cd3db241ad@18.118.109.61:26656,35c1f999d67de56736b412a1325370a8e2fdb34a@5.189.169.99:26656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=5f46d50a022f5ff38c0497360ce63b7f94ff1ced@orai-seed.ibs.team:9656,0baa806b3a4dd17be6e06369d899f140c3897d6e@18.223.242.70:26656,9749da4a81526266d7b8fe9a03d260cd3db241ad@18.118.109.61:26656,35c1f999d67de56736b412a1325370a8e2fdb34a@5.189.169.99:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:22556
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.oraid/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
d2204d84427052e2659509aa17c8cd39871a5cd8@195.201.197.246:27656
```
