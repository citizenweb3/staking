import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  getChain,
  getRepoChainContributions,
  getRepoChainService,
  getRepoChainServiceGlobal,
} from '@/app/actions/repos';
import NotFound from '@/app/chains/[chain]/not-found';
import Tabs from '@/app/chains/[chain]/tabs';
import Button from '@/app/components/common/button';
import TxtCopyStr from '@/app/components/mdn/txt-copy-str';

interface OwnProps {
  params: { chain: string };
}

const MainnetPage: FC<OwnProps> = async ({ params }) => {
  const data = await getChain(params.chain);

  if (!data) {
    return <NotFound chain={params.chain} />;
  }

  const tabs: { title: string; content: string }[] = [];

  if (data.generatedServices?.length) {
    for (let serviceName of data.generatedServices) {
      let content = await getRepoChainServiceGlobal(data, serviceName);
      tabs.push({ title: serviceName, content });
    }
  }

  for (let serviceName of data.services) {
    const service = await getRepoChainService(params.chain, serviceName);
    tabs.push({ title: serviceName, content: service });
  }

  if (data.contributions) {
    const contributions = await getRepoChainContributions(data.contributions);
    tabs.push({ title: 'contributions', content: contributions });
  }

  return (
    <div>
      <div className="ml-11 mt-16 flex flex-row">
        <div className="mr-10">
          <Image src={data.icon} alt={data.title} width={200} height={200} />
          <div className="mt-8 flex space-x-4">
            {data.website && (
              <Link
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
                  className="h-10 w-10"
                />
              </Link>
            )}
            {data.codebase?.git_repo && (
              <Link
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
                  className="h-10 w-10"
                />
              </Link>
            )}
            {data.horcrux && (
              <div
                className="transition-all duration-150 hover:scale-105"
              >
                <Image
                  width={30}
                  height={30}
                  src={'/icons/horcrux.svg'}
                  alt={data.title + ' horcrux'}
                  className="h-10 w-10"
                />
              </div>
            )}
            {data.shi && (
              <div
                className="transition-all duration-150 hover:scale-105"
              >
                <Image
                  width={30}
                  height={30}
                  src={'/icons/shi.svg'}
                  alt={data.title + ' self-hosted infrastructure'}
                  className="h-10 w-10"
                />
              </div>
            )}
            {data.otgi && (
              <div
                className="transition-all duration-150 hover:scale-105"
              >
                <Image
                  width={30}
                  height={30}
                  src={'/icons/otgi.svg'}
                  alt={data.title + ' off-the-grid infrastructure'}
                  className="h-10 w-10"
                />
              </div>
            )}
            {data.restake && (
              <div
                className="transition-all duration-150 hover:scale-105"
              >
                <Image
                  width={30}
                  height={30}
                  src={'/icons/restake.svg'}
                  alt={data.title + ' restake'}
                  className="h-10 w-10"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-nowrap text-3xl font-semibold">{data.title}</h1>
          <div className="mt-2 space-y-0.5">
            <TxtCopyStr title="type" value={data.type} key={data.type} />
            <TxtCopyStr title="chain id" value={data.chain_id} key={data.chain_id} />
            {data.showTopChainEndpoints && data.endpoints && Object.entries(data.endpoints).map(([key, val]) => (
              <TxtCopyStr title={key} value={val} key={key} />
            ))}
          </div>
          <div className="mt-4 flex space-x-4">
            <Link className="" href={data.explorer} rel="nofollow" target="_blank">
              <Button external>Explorer</Button>
            </Link>
            {data.stake && <Link className="" href={data.stake} rel="nofollow" target="_blank">
              <Button external>Stake with Citizen Web3</Button>
            </Link>}
          </div>
        </div>
      </div>
      <div className="markdown mt-4">
        <Tabs items={tabs} />
      </div>
    </div>
  );
};

export default MainnetPage;
