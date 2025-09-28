### Live Peers for Quicksilver

Add this peers, from the registry, to your **config.toml**:

```
8e14e58b054248a04be96e4a40d6359e93b636ac@65.108.65.94:26656,5a3c424c19d9ab694190a7805a2b1a146460d752@65.108.2.27:26656,17574de80eeda21ae1ed94e162ad55b58914c6fa@quickt.peers.stavr.tech:20026,e6bf55bc9f08958b7518bea455423375db78d1ef@65.108.13.176:26657
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=8e14e58b054248a04be96e4a40d6359e93b636ac@65.108.65.94:26656,5a3c424c19d9ab694190a7805a2b1a146460d752@65.108.2.27:26656,17574de80eeda21ae1ed94e162ad55b58914c6fa@quickt.peers.stavr.tech:20026,e6bf55bc9f08958b7518bea455423375db78d1ef@65.108.13.176:26657
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.quicksilverd/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
25fff0b03188a1bda4ae87a64a8b43b5b241df38@195.201.197.246:33656
```
