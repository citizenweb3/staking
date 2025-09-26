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
import { IChainConfig } from '@/types';
import { SortDir, SortKey } from '@/app/utils/monitor-table/prepare-table-data';

type PageProps = { searchParams: Record<string, string | string[] | undefined> };

const MainPage: FC<PageProps> = async ({ searchParams }) => {
  const sortKey: SortKey = (searchParams.sort as SortKey) ?? 'network';
  const sortDir: SortDir = (searchParams.dir as SortDir) ?? 'asc';

  const chains: IChainConfig[] = await getRepoChains();
  const validatorData = await getValidatorData();

  return (
    <div>
      <div className="mb-10 flex flex-row items-end justify-between">
        <div className="ml-7 flex flex-col">
          <ValidatorLinks />
          <Player />
        </div>
        <SocialIcons />
      </div>
      <Subtitle text={'Title'} size={'h2'} />
      <ChartLine />
      <Subtitle text={'Title'} size={'h2'} />
      <div className="mb-8 mt-10 flex flex-col items-center justify-center">
        <Medals />
        <MetricsCards />
      </div>
      <Subtitle text={'Title'} size={'h2'} />
      <ValidatorNetworks chains={chains} validatorData={validatorData.nodes} sortKey={sortKey} sortDir={sortDir} />
    </div>
  );
};

export default MainPage;
