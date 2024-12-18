## Update PEERS and AddressBook

### add peers to config.toml file
```bash
PEERS="tcp://d630c49e04eb60a2c9e179a1a3001313fbaff061@seed.namada.posthuman.digital:26656,tcp://7233f22a664457479a6b194f590f2db95c726240@namada-testnet-peer.itrocket.net:33656,tcp://95d58c49e8177dbb67ded1475381011b7c28c375@116.202.241.157:26656,tcp://8a9872e2502be4fd2664dc1477020f36a38a4940@5.78.71.104:26656"
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/.local/share/namada/shielded-expedition.88f17d1d14/config.toml
```
### Addrbook
We refresh the addrbook every 4 hours.

```bash
wget -O $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/config/addrbook.json https://snapshots.namada.posthuman.digital/addrbook.json
```
