import Image from 'next/image';
import Link from 'next/link';

import {
  getChain,
  getRepoChainContributions,
  getRepoChainService,
  getRepoChainServiceGlobal,
  getRepoChains,
} from '@/app/actions/repos';
import NotFound from '@/app/chains/[chain]/not-found';
import StatusSwitch from '@/app/chains/[chain]/status-switch';
import Tabs from '@/app/chains/[chain]/tabs';
import WalletStakeButtons from '@/app/components/chain-list/wallet-stake-buttons';
import type { IChainConfig } from '@/types';

interface OwnProps {
  params: Promise<{ chain: string }>;
}

const ChainPage = async (props: OwnProps) => {
  const { chain } = await props.params;
  const data = await getChain(chain);
  if (!data) return <NotFound chain={chain} />;

  const allChains: IChainConfig[] = await getRepoChains();

  const tabs: { title: string; content: string }[] = [];

  if (data.generatedServices?.length) {
    for (let serviceName of data.generatedServices) {
      let content = await getRepoChainServiceGlobal(data, serviceName);
      tabs.push({ title: serviceName, content });
    }
  }

  for (let serviceName of data.services) {
    const service = await getRepoChainService(chain, serviceName);
    tabs.push({ title: serviceName, content: service });
  }

  if (data.contributions) {
    const contributions = await getRepoChainContributions(data.contributions);
    tabs.push({ title: 'contributions', content: contributions });
  }

  const chainLinksSizes = 'h-9 w-9';
  const medalsSizes = 'h-8 w-8';

  return (
    <div>
      <StatusSwitch current={data} allChains={allChains} />
      <div className="ml-11 mt-8 flex flex-row">
        <div className="mr-10 flex flex-col">
          <h1 className="mb-10 ml-10 text-nowrap text-3xl font-semibold">{data.title}</h1>
          <div className="flex flex-row">
            <Image src={data.icon} alt={data.title} width={180} height={180} />
            <div className="ml-12 flex flex-col justify-center">
              <div>
                <div className="mt-4">
                  <WalletStakeButtons wallets={data.wallets} />
                </div>
                <div className="mt-6 flex flex-row items-center">
                  <div className="flex space-x-4">
                    <Link
                      title={`${data.title} explorer`}
                      href={`https://validatorinfo.com/networks/${data.name}/overview`}
                      target="_blank"
                      rel="nofollow"
                      className="transition-all duration-150 hover:scale-105"
                    >
                      <Image
                        width={30}
                        height={30}
                        src={'/icons/validator-info.svg'}
                        alt={data.title + ' validator-info'}
                        className={chainLinksSizes}
                      />
                    </Link>
                    {data.codebase?.git_repo && (
                      <Link
                        title={`${data.title} Github repo`}
                        href={data.codebase.git_repo}
                        target="_blank"
                        rel="nofollow"
                        className="transition-all duration-150 hover:scale-105"
                      >
                        <Image
                          width={30}
                          height={30}
                          src={'/icons/github.svg'}
                          alt={data.title + ' github'}
                          className={chainLinksSizes}
                        />
                      </Link>
                    )}
                    {data.twitter && (
                      <Link
                        title={`${data.title} Twitter (X)`}
                        href={data.twitter}
                        target="_blank"
                        rel="nofollow"
                        className="transition-all duration-150 hover:scale-105"
                      >
                        <Image
                          width={30}
                          height={30}
                          src={'/icons/x.svg'}
                          alt={data.title + ' Twitter (X)'}
                          className={chainLinksSizes}
                        />
                      </Link>
                    )}
                    {data.website && (
                      <Link
                        title={`${data.title} Website`}
                        href={data.website}
                        target="_blank"
                        rel="nofollow"
                        className="transition-all duration-150 hover:scale-105"
                      >
                        <Image
                          width={30}
                          height={30}
                          src={'/icons/website.svg'}
                          alt={data.title + ' website'}
                          className={chainLinksSizes}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(data?.horcrux || data?.shi || data?.otgi || data?.restake) && (
        <div className="ml-12 flex flex-row items-center">
          <div className="mr-4 self-end text-xl font-semibold">Medals:</div>
          <div className="mt-8 flex space-x-4">
            {data?.horcrux && (
              <div
                title="Key Sharding via Horcrux"
                className="brightness-50 transition-all duration-150 hover:scale-105 hover:brightness-100"
              >
                <Image
                  width={30}
                  height={30}
                  src="/icons/horcrux.svg"
                  alt={`${data.title} horcrux`}
                  className={medalsSizes}
                />
              </div>
            )}
            {data?.shi && (
              <div
                title="Self-Hosted Infrastructure"
                className="brightness-50 transition-all duration-150 hover:scale-105 hover:brightness-100"
              >
                <Image
                  width={30}
                  height={30}
                  src="/icons/shi.svg"
                  alt={`${data.title} self-hosted infrastructure`}
                  className={medalsSizes}
                />
              </div>
            )}
            {data?.otgi && (
              <div
                title="Off the Grid Infrastructure"
                className="brightness-50 transition-all duration-150 hover:scale-105 hover:brightness-100"
              >
                <Image
                  width={30}
                  height={30}
                  src="/icons/otgi.svg"
                  alt={`${data.title} off-the-grid infrastructure`}
                  className={medalsSizes}
                />
              </div>
            )}
            {data?.restake && (
              <div
                title="Auto Reward Re-Stake x2 p/day"
                className="brightness-50 transition-all duration-150 hover:scale-105 hover:brightness-100"
              >
                <Image
                  width={30}
                  height={30}
                  src="/icons/restake.svg"
                  alt={`${data.title} restake`}
                  className={medalsSizes}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="markdown mt-4">
        <Tabs items={tabs} />
      </div>
    </div>
  );
};

export default ChainPage;
