### Our State-Sync Server Setup

Our **_app.toml_** settings related to state-sync is as follows. This is for you information only. You do not need to follow the same setup on your node.

```
# Prune Type
pruning = "custom"

# Prune Strategy
pruning-keep-every = 2000

# State-Sync Snapshot Strategy
snapshot-interval = 2000
snapshot-keep-recent = 5
```

Our state-sync RPC server for {{pretty_name}} is:

```
{{endpoints.rpc}}
```

### Instruction

We assume that you use Cosmovisor to manage your node. If you do not use Cosmovisor, you will need to customize the following instruction slightly.

Create a reusable shell script such as **_state_sync.sh_** with the following code. The code will fetch important state-sync information (such as block height and trust hash) from our server and update your **_config.toml_** file accordingly.

```
#!/bin/bash

SNAP_RPC="{{endpoints.rpc}}"

LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" {{node_home}}/config/config.toml

```

Grant user the privilege to execute script and then run the script:

```
chmod 700 state_sync.sh
./state_sync.sh
```

Stop the node:

```
sudo systemctl stop {{daemon_name}}.service
```

Reset the node:

```
# On some tendermint chains
~/go/bin/.{{daemon_name}} unsafe-reset-all

# On other tendermint chains
~/go/bin/.{{daemon_name}} tendermint unsafe-reset-all --home {{node_home}} --keep-addr-book

```

Restart the node:

```
sudo systemctl start {{daemon_name}}.service
```

If everything goes well, your node should start syncing within 10 minutes.
