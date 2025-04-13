## Citizen Web3 Validator: Staking
Citizen Web3 is a self-hosted, independent off the grid, baremetal validator. We use a mixture of cloud (public infra) and self-hosted infrastructure, which works on a mixture of broadband and Starlink internet connections, and partially runs off solar energy. We strongly believe in decentralized infrastructure, independent of the grid, and that's our end goal.

We use Multi-party computation software [(Horcrux)](https://github.com/strangelove-ventures/horcrux) on all our nodes, to further secure funds, and protect stakers from double signing. We use [Re-Stake](https://restake.app/) on all of our mainnet nodes, set to restake twice per day, so users can compound their staking rewards more efficiently.

Token holders of networks we validate, can stake with us to help secure these networks and to support our activities. Their incentive for doing so, is earning staking rewards, and other potential perks. We are devoted to our [mission](https://github.com/citizenweb3#tldr), we think out of the box, and are proud to be a little crazy. We value security, decentralization, privacy and lack of enforcement.

---------------------------------------

## Delegating / Staking with Citizen Web3 Validator and Services
A full list of networks we support, and our services as a validator can be found [here](https://staking.citizenweb3.com)


![Heather-2](https://github.com/user-attachments/assets/2733f0d3-24c6-41b6-89e7-a34b0c725c56)

--------------------------------------

## Citizen Web3 Validator: Architecture 
We focus heavily on security, modularity and privacy. Our "final vision" of a setup (if such a thing exists) is still being built. We are constantly working on twitches and improvements to it. Currently, this is what we are trying to achieve:

- Our external network, consists of 3 traffic servers, hosted in the cloud. All 3 act as a mesh failover for our internal network.
- The job of these servers is to improve ping with networks, which are mainly hosted in DCs, improve liveliness and several other efficiency related reasons.
- Our network includes Horcrux, Multi-party computation software, and signers that help to improve key security and liveliness of nodes
- Keys are not stored on nodes and are mostly (if the network allows for it) are stored in cold storage
- Key hierarchy is maintained. Where validator key isn't used unless absolutely necessary. Each operation is performed by an assigned key via authz
- Our internal network consists of several layers, and includes internal onion routing of traffic for privacy and security reasons
- Most communication is performed via WireGuard. All services are isolated. Virtualization is applied for management and traffic rules. Firewalls are set up on each step of the traffic
- Traffic is managed internally by enterprise grade routers, with entry and exit nodes that also act as an additional failover
- Failover is set up via Starlink, with a third, mobile operator planned in the future
- All access is done via SHH. Whitelisted. Servers are accessed only via a Bastion device with additional 2FA to each further server
- Additionally, we plan to introduce zerotier as a final layer for the setup
- We use both, enterprise grade and retail equipment. Where 90% is enterprise
- Setups contain numerous modular UPS, main entry batteries. PDUs. Charge protectors. Backup generators
- We are already utilizing solar panels for networking equipment. In plans to expand solar energy as a primary / secondary source for all servers

--------------------------------------


