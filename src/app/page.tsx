import { FC } from 'react';

import { getRepoChains, getValidatorData } from '@/app/actions/repos';
import Subtitle from '@/app/components/common/subtitle';
import ChartLine from '@/app/components/monitor/chart-line';
import Medals from '@/app/components/monitor/medals';
import MetricsCards from '@/app/components/monitor/metrics-cards';
import Player from '@/app/components/monitor/player';
import SocialIcons from '@/app/components/monitor/social-icons';
import ValidatorLinks from '@/app/components/monitor/validator-links';
import ValidatorNetworks from '@/app/components/monitor/validator-networks/validator-networks';
import { SortDir, SortKey } from '@/app/utils/monitor-table/prepare-table-data';
import { IChainConfig } from '@/types';

type PageProps = { searchParams: Record<string, string | string[] | undefined> };

const MainPage: FC<PageProps> = async ({ searchParams }) => {
  const sortKey: SortKey = (searchParams.sort as SortKey) ?? 'network';
  const sortDir: SortDir = (searchParams.dir as SortDir) ?? 'asc';

  const chains: IChainConfig[] = await getRepoChains();
  const validatorData = await getValidatorData();

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 flex text-2xl font-semibold">Citizen Web3 Validator and Public Projects Monitor</h1>
        <ValidatorLinks />
      </div>
      <div className="-mt-14 mb-12 flex flex-row justify-between">
        <div className="">
          <Player />
        </div>
        <div className="">
          <SocialIcons />
        </div>
      </div>
      <Subtitle text={'Citizen Web3 Validator Total Value Secured and Total Delegators'} size={'h2'} />
      <ChartLine />
      <Subtitle text={'Operator Rewards Statistics and Infrastructure Perks'} size={'h2'} />
      <div className="mb-8 mt-10 flex flex-col items-center justify-center">
        <Medals />
        <MetricsCards />
      </div>
      <Subtitle text={'Citizen Web3 Validator Supported Networks and Tokens'} size={'h2'} />
      <ValidatorNetworks chains={chains} validatorData={validatorData} sortKey={sortKey} sortDir={sortDir} />
    </div>
  );
};

export default MainPage;
