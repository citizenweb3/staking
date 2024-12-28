### Live Peers for Bitcanna

Add this peers, from the registry, to your **config.toml**:

```
d6aa4c9f3ccecb0cc52109a95962b4618d69dd3f@seed1.bitcanna.io:26656,e2e7c704f766ef6b9e2c8dd61d963f8393b87966@seed3.bitcanna.io:26656,f0e6c86d769bf5c52f78e01864091690e731643f@bitcanna-seed.panthea.eu:37656,258f523c96efde50d5fe0a9faeea8a3e83be22ca@seed.bitcanna-1.bitcanna.aviaone.com:10263,33ab202dfef5e08d5d0346e7b3cfaab2a946198a@seeds.bitcanna-mainnet.hexnodes.one:27656,d5ed854872ad96f114737889ac9521ea3a29e3a3@bitcanna-seed.oldcat.io:26656,d37062587a2aba2a5256b7363f722f4acb4b8e2f@seed-node.mms.team:30656,10ed1e176d874c8bb3c7c065685d2da6a4b86475@seed-bcna.ibs.team:16656,951cadb1888c0360dce506c1eff925cb6eb47e06@seeds-2.anode.team:10258,400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc@bitcanna.rpc.kjnodes.com:14259,daa1e4a3d0f202109baea2a3be589f7eb6d9ea62@seeds-bcna.kjinc.io:26656,5f5cfac5c38506fbb4275c19e87c4107ec48808d@seeds.nodex.one:11710,1531b73fed2ad4eb55ea537fa7fd66f137c12934@seeds.blockhunters.org:38656,80f05ef09003f3303a4529a8a42e87562dd218cb@bitcanna-mainnet.seed.l0vd.com:57656,71df77a8f57af72a4d2b4e842c9ac7eaec31cc09@mainnet-seed.konsortech.xyz:27156,9e2b0de599e1b0b69fe156d783a5365858c43027@bitcanna-seed.kalia.network:12656,6f6a3a908634b79b6fe7c4988efec2553f188234@bitcanna.seed.nodeshub.online:13056,b85358e035343a3b15e77e1102857dcdaf70053b@seeds.bluestake.net:24356
```

Update **persistent_peers** setting in **config.toml**. Stale peers can cause node inefficiency over time. This script selects up to 5 random live peers:

```
PEERS=0a658df9d9fab096983a12e6f878e87281a15ce6@bitcanna-peer.panthea.eu:27656,756fa9ce5d65c3c43021d2780e1bda0924a6cd14@144.76.97.251:27656,5a048cab1d183de5c465c56b29a16fd93a8bf9bd@mainnet-bitcanna.konsortech.xyz:27656,50e4ad8f5847c1fc4d9cb3de2cb6356d1a14291b@95.214.55.138:32656,2ff33d346b1b0f19cd59018ceb62d06a6406d472@bitcanna.peers.stavr.tech:21326,9ca926169792c5e0dc7cf01520e9bc9a46d62d67@49.12.86.120:26686,6ae1dfa46884560e13962d73462e5bda0bb8c019@bitcanna-mainnet.peers.l0vd.com:17656,526e4529131070e39134d94edc0e7e48289a64b1@176.191.97.120:28656,3cb7bc8d5c448eaa42558347fb6cb03cd414b223@38.242.232.202:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:13056,45589e6147e36dda9e429668484d7614fb25b142@bitcanna.nodejumper.io:27656,e8bbbe53969162a893ab67c1eeb40432d57edec6@rpc.bitcanna.indonode.net:11656,d2cb1f04b351e82dada97794d32a468dd71d6a84@peer-bitcanna.mms.team:56104,f28f565a6514340f2506b8f2b4e1d5322c4a26dd@p2p.bitcanna.safeblock.space:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@bitcanna.rpc.kjnodes.com:14256,d1d43cc7c7aef715957289fd96a114ecaa7ba756@bitcanna.rpc.nodex.one:11756,7fef7708e4eb2f3a1245f00ca42ad56e446b3d66@rpc.bitcanna.bh.rocks:42656,bf47ac16ca517beca4ba5ba2e4a92798cf9409c0@104.207.129.116:26656,fe587eb0d37cabb9b8089ec8899cf32ee2870994@185.144.99.40:46656,637077d431f618181597706810a65c826524fd74@bitcanna.rpc.nodeshub.online:13056
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.bcna/config/config.toml
```

Add Citizen Web3 state-sync peer to **persistent_peers** in **config.toml**:

```
c098c53e76d204cd843cec99855cf7febe4277bf@mainnet.seednode.citizenweb3.com:32656
```
