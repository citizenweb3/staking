# TheGraph-Indexer-Setup
## A guide to installing from scratch, how to install an indexer on the main network

## Pre-requisites 
1) Dedicated server (16 Core, RAM 128Gb, 2Tb nvme)
2) Domain like https://web3validator.info/
3) 100,000 GRT for indexing
4) A 12-word mnemonic phrase in order for it to work
### 1)Server

Server must be with minimum 12-core proccessor and 64gb RAM , good example is AX101 in hetzner you can check the [step-by-step guide here](https://www.indivar.com/blog/setup-new-dedicated-hetzner-server/)

### 2)Domain
Domain you can buy on imena.ua and [step-by-step guide here](https://www.imena.ua/en/domains)

After you bought a domain, you need to make dns records indicating the ip address of your server , it looks like this:

<img width="1381" alt="image" src="https://user-images.githubusercontent.com/59205554/216107600-24e8fda6-bffc-4c9b-ba80-49d2edac393b.png">
<img width="1377" alt="image" src="https://user-images.githubusercontent.com/59205554/216142709-7c3141a5-9ab8-4731-af12-6f347ee96f26.png">

### 3) 100,000 GRT for indexing

 100,000 GRT need for create indexer , you can buy it through the CEX like Binance, Coinbase or Kucoin and in DEX like Uniswap, Sushiswap and etc. 

### 4) A 12-word mnemonic phrase 

You need a wallet with a seed phrase that is registered as your operator wallet. This wallet will be the one that makes transactions on behalf of your main wallet (which holds and stakes the GRT).

The operator wallet has limited functionality, and it's recommended to be used for security reasons.

*You need a 12-word, or 15-word mnemonic phrase in order for it to work.*

To make yourself a mnemonic eth wallet you can go to this [website](https://iancoleman.io/bip39/), select ETH from the dropdown and press generate.

You get a seed phrase in the input field labeled BIP39 Mnemonic.

You can find your address, public key and private key in the first row of the table if you scroll down the page in the section with the heading "Derived Addresses".

**Make sure you save the mnemonic, private key and the wallet address somewhere safe.**

If you need, you can import the wallet using the private key into Metamask

# Install from scratch
## Stake on the Network

In order to become an indexer on the Graph Protocol Network, you'll have to stake a minimum of 100,000 GRT.

This can easily be done via the Web UI, by going to the [Graph Explorer](https://thegraph.com/explorer).

1. Login with Metamask on the Wallet that holds your GRT

2. Go to your Profile, then switch to the "Indexing" Tab and hit "Stake"

<img width="1413" alt="image" src="https://user-images.githubusercontent.com/59205554/216149101-3f4b2537-6420-4a5f-a07e-a5fc77cfe813.png">

3. Stake the amount of GRT that you desire, then you're all done!


## Set your Operator

The Operator is a wallet address that is entirely separate from the address which you staked your GRT from. This Operator wallet will be filled with ETH, and will be used to send transactions (such as allocations) to the network, while keeping your Staked GRT safe in case of an attack on your infrastructure. It is highly recommended for you to use a new wallet, generated from a new mnemonic phrase.

For this, follow the [instructions here](https://github.com/StakeSquid/graphprotocol-mainnet-docker/blob/master/docs/getting-started.md#create-a-mnemonic) first, then head back for the rest.

Okay, assuming that you followed the instructions and you have your new Operator wallet at hand, lets go and link it up with the wallet that you used to stake your GRT.

 Login with Metamask on the wallet that you used to stake your GRT
4. Click the Profile dropdown button
5. Go to "Settings", and then to the "Operators" tab
<img width="1406" alt="image" src="https://user-images.githubusercontent.com/59205554/216149964-e73d4831-0871-46d7-8601-fcda614eedd5.png">

6. Click the Plus (+) button and add your operator public address there
7. Submit the transaction, then you're done


#  Getting started 
### Run the following commands to clone the GraphProtocol's repository

```bash
git clone https://github.com/web3validator/graphprotocol-mainnet-docker.git
cd graphprotocol-mainnet-docker

```

Then you need to edit the file called .env and add your values to the following envs:
```bash
EMAIL=email@sld.tld
INDEX_HOST=index.sld.tld
GRAFANA_HOST=grafana.sld.tld
AGENT_GUI_HOST=agent.sld.tld
ADMIN_USER=your_user
ADMIN_PASSWORD=your_password
DB_USER=your_db_user
DB_PASS=your_db_password
GRAPH_NODE_DB_NAME=your_graphnode_db_name
AGENT_DB_NAME=your_agent_db_name
CHAIN_0_NAME="network-name"
CHAIN_0_RPC="http://ip:port"
TXN_RPC="http://ip:port"
OPERATOR_SEED_PHRASE="12 or 15 word mnemonic"
STAKING_WALLET_ADDRESS=0xAdDreSs
GEO_COORDINATES='69.420 69.420'
INDEXER_AGENT_OFFCHAIN_SUBGRAPHS=""


#Optional env vars depending on which services you use:

###Indexer agent GUI:
#AGENT_GUI_HOST=agent.sld.tld
#NEXTAUTH_SECRET=$(openssl rand -base64 32)

```




It should looks like :

<img width="882" alt="image" src="https://user-images.githubusercontent.com/59205554/216146684-17e6532c-a2b5-4213-9546-3b7f3512e238.png">
**Required env vars:**

```bash

- `EMAIL` - only used as contact to create SSL certificates. Usually it doesn't receive any emails but is required by the certificate issuer.
- `INDEX_HOST` - your indexer public endpoint. The gateway will be sending queries to this endpoint.
- `GRAFANA_HOST` - your Grafana dashboard for indexer stack monitoring.
- `ADMIN_USER` and `ADMIN_PASSWORD` - will be used by Grafana, Prometheus and AlertManager.
- `DB_USER` and `DB_PASS` - will be used for initializing the PostgreSQL Databases (both index/query DB and indexer agent/service DB).
- `GRAPH_NODE_DB_NAME` - the name of the database used by the Index/Query nodes.
- `AGENT_DB_NAME` - the name of the database used by the Indexer agent/service nodes.
- `CHAIN_0_NAME` - the name of the network that you want to index
- `CHAIN_0_RPC` - your RPCs (archive nodes) used by the index nodes.
- `TXN_RPC` - your Goerli ETH RPC used by Indexer agent/service nodes. This can be a fast/full/archive node, up to you! Please note that using Erigon as the TXN_RPC has proven unreliable by some indexers.
- `OPERATOR_SEED_PHRASE` - the 12/15 word mnemonic that you generated earlier. Will be used by the Agent/Service to send transactions (open/close allocations, etc)
- `STAKING_WALLET_ADDRESS` - the address (0x...) that you staked your GRT with, ideally living on an entirely different mnemonic phrase than your Operator Wallet.
- `GEO_COORDINATES` of your server - you can search for an ip location website and check your server exact coordinates.

**Optional env vars:**
- `AGENT_GUI_HOST` - your Agent GUI endpoint for controlling the Agent and allocations remotely
- `NEXTAUTH_SECRET` - used by the Agent GUI to salt your password

```

**Note:** If you want to use any of the optional env vars, you need to copy the line that you want to enable above the last line, and uncomment it.

## Start

Start by picking up the right stack that you want to spin up.

There are several start files used to spin up different components.

I would recommend to start with:

```bash
bash start-essential

```

Be aware that initially it takes several minutes to download and run all the containers (especially the cli container, that one takes a while to build), so be patient. :)

Subsequent restarts will be much faster.

In case something goes wrong, find the problem, edit the variables, and add `--force-recreate` at the end of the command, plus the container you want to recreate:

```bash
bash start-essential --force-recreate <container_name>

```

Or to recreate the entire stack:

```bash
bash start-essential --force-recreate

```

### Start file variants:

**start-essential** - starts up the graphnode, indexer and monitoring stack - all you need to get up and running on the network

**start-optional** - starts up the optional stack (for components, read above)

**start-autoagora** - starts up the autoagora stack  (for components, read above)

**start-all** - starts up the entire stack




## Verify that it runs properly

To verify that everything is up and running, you need to:

```bash
docker ps

```

And look for containers that are crash looping - you will notice `restarting` and a countdown - that means those containers are not working properly.

To further debug, try looking for the container logs and see what they say. 
More information in the [troubleshooting](https://github.com/StakeSquid/graphprotocol-mainnet-docker/blob/master/docs/troubleshooting.md) section.




## Indexer Infrastructure Ports

### Ports Overview

The following ports are being used by all components by default. Also listed are
the CLI flags and environment variables that can be used to change the ports.

#### Graphical Overview

![](https://raw.githubusercontent.com/graphprotocol/mission-control-indexer/master/files/ports.png)

#### Graph Node

| Port | Purpose                                    | Routes                                             | CLI argument        | Environment variable |
| ---- | ------------------------------------------ | -------------------------------------------------- | ------------------- | -------------------- |
| 8000 | GraphQL HTTP server (for subgraph queries) | `/subgraphs/id/...` <br/> `subgraphs/name/.../...` | `--http-port`       | -                    |
| 8001 | GraphQL WS (for subgraph subscriptions)    | `/subgraphs/id/...` <br/> `subgraphs/name/.../...` | `--ws-port`         | -                    |
| 8020 | JSON-RPC (for managing deployments)        | `/`                                                | `--admin-port`      | -                    |
| 8030 | Subgraph indexing status API               | `/graphql`                                         | `--index-node-port` | -                    |
| 8040 | Prometheus metrics                         | `/metrics`                                         | `--metrics-port`    | -                    |

#### Indexer Service

| Port | Purpose                                         | Routes                                                              | CLI argument | Environment variable   |
| ---- | ----------------------------------------------- | ------------------------------------------------------------------- | ------------ | ---------------------- |
| 7600 | GraphQL HTTP server (for paid subgraph queries) | `/subgraphs/id/...` <br/> `/status` | `--port`     | `INDEXER_SERVICE_PORT` |
| 7300 | Prometheus metrics                              | `/metrics`                                                          | -            | -                      |

#### Indexer Agent

| Port | Purpose                                      | Routes | CLI argument                | Environment variable                    |
| ---- | -------------------------------------------- | ------ | --------------------------- | --------------------------------------- |
| 8000 | Indexer management API (for `graph indexer`) | `/`    | `--indexer-management-port` | `INDEXER_AGENT_INDEXER_MANAGEMENT_PORT` |
