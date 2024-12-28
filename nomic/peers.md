### Live Peers for Nomic

Add this peers, from the registry, to your **config.toml**:

```
238120dfe716082754048057c1fdc3d6f09609b5@rpc.nomic.mappum.io:26656,34544f82960d2ff2b1defb7b04f097557f4183be@seeds.goldenratiostaking.net:26656,c28827cb96c14c905b127b92065a3fb4cd77d7f6@seeds.whispernode.com:12756,27b6d74c8408e033e2e5a9e966a0d15782e33596@seeds.nethernode.xyz:12756,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=d4342c478c75704e8284dc3494fbd0acc444e674@basementnodes.ca:20656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.nomic-stakenet-3/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
bbc08b38a7fb1fdc03c7f28fc5196ed534c37625@testnet.seednode:26656
```
