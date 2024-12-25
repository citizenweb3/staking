### Live Peers for Namada

Add this peers, from the registry, to your **config.toml**:

```
tcp://05309c2cce2d163027a47c662066907e89cd6b99@104.251.123.123:26656,tcp://54386c1252ecabe5ba1fae2f083b37ca5ebd57dc@192.64.82.62:26656,tcp://2bf5cdd25975c239e8feb68153d69c5eec004fdb@64.118.250.82:46656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=tcp://05309c2cce2d163027a47c662066907e89cd6b99@104.251.123.123:26656,tcp://54386c1252ecabe5ba1fae2f083b37ca5ebd57dc@192.64.82.62:26656,tcp://2bf5cdd25975c239e8feb68153d69c5eec004fdb@64.118.250.82:46656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.local/share/namada/namada.5f5de2dd1b88cba30586420/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
tcp://509f1e843cf881650a4151aa804ddd7a7188e88f@195.201.197.246:32656
```
