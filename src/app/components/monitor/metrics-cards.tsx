import MetricsCard from '@/app/components/common/metrics-card';
import { FC } from 'react';

interface OwnProps {
  networksAmount: number;
}

const MetricsCards: FC<OwnProps> = ({ networksAmount }) => {
  return (
    <div className="mt-8 flex w-full flex-row justify-center gap-6">
      <MetricsCard title={'Amount of Networks'} data={networksAmount} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard title={'Total Rewards Paid'} data={'Under Development'} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard title={'Daily Revenue'} data={'Under Development'} className={'py-5'} dataClassName={'mb-4'} />
    </div>
  );
};

export default MetricsCards;
