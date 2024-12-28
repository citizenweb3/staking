### Live Peers for Gravity Bridge

Add this peers, from the registry, to your **config.toml**:

```
2b089bfb4c7366efb402b48376a7209632380c9c@65.19.136.133:26656,63e662f5e048d4902c7c7126291cf1fc17687e3c@95.211.103.175:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:14256,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:14256,86bd5cb6e762f673f1706e5889e039d5406b4b90@gravity.seed.node75.org:10556,4e595d6781b122b2aea91b08da0ad97f708bf52a@seed-gravity-bridge-01.stakeflow.io:1306,9f4ed62cd0b60d7c4bdbdce5db5794211707528b@seed-gravity.ibs.team:16661,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,258f523c96efde50d5fe0a9faeea8a3e83be22ca@seed.gravity-bridge-3.gravity.aviaone.com:10266
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=b9180ddd3329ddaea74fe6fbdc729506b90f313b@gravity.ramuchi.tech:36656,4e595d6781b122b2aea91b08da0ad97f708bf52a@peer-gravity-bridge-01.stakeflow.io:1306,64a8bf0acf5385086409c1e1cc3cc9b9e5645243@65.21.91.99:26776
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.gravity/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
cba79db1bb3a5438fb293da0a627a8450f053941@mainnet.seednode.citizenweb3.com:34656
```
