import { getRepoChains } from '@/app/actions/repos';
import ChainCard from '@/app/components/chain-card';
import { IChainConfig } from '@/types';
import { FC } from 'react';

interface Props {
  chains: IChainConfig[]
  category: string
}
const ChainList: FC<Props> = async ({chains, category}) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {chains
        .filter((chain) => chain.category === category)
        .map((chain) => {
          return <ChainCard key={chain.name} chain={chain} />;
        })}
    </div>
  )
}

const Home = async () => {
  const chains = await getRepoChains();

  return (
    <div>
      <h2 className="text-3xl font-semibold">Mainnets</h2>
      <ChainList chains={chains} category={'mainnet'} />
      <h2 className="mt-12 text-3xl font-semibold">Testnets</h2>
      <ChainList chains={chains} category={'testnet'} />
      <h2 className="mt-12 text-3xl font-semibold">Only infra</h2>
      <ChainList chains={chains} category={'infra'} />
    </div>
  );
};

export default Home;
