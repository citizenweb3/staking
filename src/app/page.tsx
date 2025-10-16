import { FC } from 'react';

import { getRepoChains, getValidatorData } from '@/app/actions/repos';
import Subtitle from '@/app/components/common/subtitle';
import Medals from '@/app/components/monitor/medals';
import MetricsCards from '@/app/components/monitor/metrics-cards';
import Player from '@/app/components/monitor/player';
import SocialIcons from '@/app/components/monitor/social-icons';
import ValidatorNetworks from '@/app/components/monitor/validator-networks/validator-networks';
import { SortDir, SortKey, computeTotalSecure } from '@/app/utils/monitor-table/prepare-table-data';
import { IChainConfig, NodeItem } from '@/types';

type PageProps = { searchParams: Record<string, string | string[] | undefined> };

const MainPage: FC<PageProps> = async ({ searchParams }) => {
  const sortKey: SortKey = (searchParams.sort as SortKey) ?? 'network';
  const sortDir: SortDir = (searchParams.dir as SortDir) ?? 'asc';

  const testnetsParam = searchParams.testnets;
  const showTestnets = Array.isArray(testnetsParam) ? testnetsParam.includes('true') : testnetsParam === 'true';

  const chains: IChainConfig[] = await getRepoChains();
  const validatorData: NodeItem[] = await getValidatorData();

  const validatorDataWithTotalSecure = validatorData.map(validator => ({
    ...validator,
    totalSecure: computeTotalSecure(validator)
  }));

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-8 mb-14 text-center text-xl font-semibold leading-tight sm:mt-0 md:text-2xl">
          Citizen Web3 Validator Public Projects Monitor
        </h1>
      </div>
      <div className="mb-8 flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex justify-center lg:justify-start">
          <Player />
        </div>
        <div className="flex justify-center lg:justify-end">
          <SocialIcons />
        </div>
      </div>
      <Subtitle text={'Citizen Web3 Validator Rewards Statistics and Infrastructure Perks'} size={'h2'} />
      <div className="mb-8 mt-10 flex flex-col items-center justify-center">
        <Medals />
        <MetricsCards chains={chains} validatorData={validatorDataWithTotalSecure} />
      </div>
      <Subtitle text={'Citizen Web3 Validator Supported Networks and Tokens'} size={'h2'} />
      <ValidatorNetworks
        chains={chains}
        validatorData={validatorData}
        sortKey={sortKey}
        sortDir={sortDir}
        showTestnets={showTestnets}
      />
    </div>
  );
};

export default MainPage;
