import { getRepoChains } from '@/app/actions/repos';
import ValidatorNetworksItem from '@/app/components/monitor/validator-networks/validator-networks-item';
import { IChainConfig } from '@/types';


const ValidatorNetworksList = async () => {
  const chains: IChainConfig[] = await getRepoChains();

  return (
    <tbody>
      {chains.map((item) => (
        <ValidatorNetworksItem key={item.chain_id + item.name} item={item} />
      ))}
    </tbody>
  );
};

export default ValidatorNetworksList;
