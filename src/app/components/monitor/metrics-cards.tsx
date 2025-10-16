import { FC } from 'react';

import MetricsCard from '@/app/components/common/metrics-card';
import { fmt } from '@/app/utils/format-money';
import { IChainConfig, NodeItem } from '@/types';

interface OwnProps {
  chains: IChainConfig[];
  validatorData: NodeItem[];
}

const MetricsCards: FC<OwnProps> = ({ chains, validatorData }) => {
  let dailyRevenue: number = 0;

  for (const validator of validatorData) {
    if (
      validator.totalSecure &&
      validator.chain.tokenomics.apr &&
      validator.rate
    ) {
      const dailyCommission = ((validator.totalSecure * +validator.chain.tokenomics.apr) / 365) * +validator.rate;
      dailyRevenue += dailyCommission;
    }
  }

  return (
    <div className="mt-8 flex w-full flex-row justify-center gap-6">
      <MetricsCard title={'Amount of Networks'} data={chains.length} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard title={'Total Rewards Paid'} data={'>1.2M USD'} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard
        titleTooltip={'Approximate calculation. Actual number is slightly higher'}
        title={'Daily Revenue'}
        data={`~$${fmt.format(dailyRevenue)}`}
        className={'py-5'}
        dataClassName={'mb-4'}
      />
    </div>
  );
};

export default MetricsCards;
