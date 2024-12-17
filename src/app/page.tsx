import { getRepoChains } from '@/app/actions/repos';
import ChainCard from '@/app/components/chain-card';

const Home = async () => {
  const mainnet = await getRepoChains();
  return (
    <div>
      <h2 className="text-3xl font-semibold">Mainnets</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {mainnet
          .filter((chain) => chain.type === 'mainnet')
          .map((chain) => {
            return <ChainCard key={chain.name} chain={chain} />;
          })}
      </div>
      <h2 className="mt-12 text-3xl font-semibold">Testnets</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {mainnet
          .filter((chain) => chain.type === 'testnet')
          .map((chain) => {
            return <ChainCard key={chain.name} chain={chain} />;
          })}
      </div>
    </div>
  );
};

export default Home;
