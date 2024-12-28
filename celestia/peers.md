### Live Peers for Celestia

Add this peers, from the registry, to your **config.toml**:

```
e6116822e1a5e283d8a85d3ec38f4d232274eaf3@consensus-full-seed-1.celestia-bootstrap.net:26656,cf7ac8b19ff56a9d47c75551bd4864883d1e24b5@consensus-full-seed-1.celestia-bootstrap.net:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@celestia-mainnet-seed.autostake.com:27206,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:16656,24a607a217cf12be29bae5b2e8151391bde2d8c8@seed-celestia-01.stakeflow.io:15007,c809ca6486cd54501ce5291714c892f5dc9cfa93@celestia.seeds.validao.xyz:36656,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@celestia.rpc.kjnodes.com:12059,9aa8a73ea9364aa3cf7806d4dd25b6aed88d8152@celestia.seed.mzonder.com:13156,3abb9ad6d7a3c728984c4b7e9c05e91731779865@seed-celestia.theamsolutions.info:23656,23b88ebcfb2177dbd2d8b2920c363a25e038e69a@seed.celestia.validatus.com:2000,b7408d0c59fc0fd0c9153365d5593c6c32870cb0@seed-celestia.freshstaking.com:34656,8de3b1534abc9d565f232982c0fb7933c0038ead@celestia-full.avril14th.org:26656,12ad7c73c7e1f2460941326937a039139aa78884@celestia-mainnet-seed.itrocket.net:40656,86bd5cb6e762f673f1706e5889e039d5406b4b90@seed.celestia.node75.org:20356,9b1d22c3a78487d1a664a4b6a331fce527d14fb4@seed.celestia.mainnet.dteam.tech:27656
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=ebc272824924ea1a27ea3183dd0b9ba713494f83@celestia-mainnet-peer.autostake.com:27206,24a607a217cf12be29bae5b2e8151391bde2d8c8@peer-celestia-01.stakeflow.io:15007,6de4ce5baa9d2bed33c0c53b9518b907cfaab33b@65.108.128.201:11656,a26091f9c247c1e68410a4e8b107a715a0e886f6@65.108.226.26:29656,c48d92566837d95f1eeae5815ac7e70fb80416f7@74.208.94.42:26656,8de3b1534abc9d565f232982c0fb7933c0038ead@celestia-full.avril14th.org:26656,d535cbf8d0efd9100649aa3f53cb5cbab33ef2d6@celestia-mainnet-peer.itrocket.net:40656,ce99d7da2530f75d05880d13d9eda384d5a1afe4@peer.celestia.node75.org:23356,076c9cc9de3039819a98522aeea39e8c72b49682@peer.celestia.mainnet.dteam.tech:28656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.celestia-app/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
7066852273cf94ec60003b40428010a4eac86f5b@mainnet.seednode.citizenweb3.com:27656
```
