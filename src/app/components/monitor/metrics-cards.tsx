import MetricsCard from '@/app/components/common/metrics-card';

const MetricsCards = async () => {
  return (
    <div className="mt-8 flex w-full flex-row justify-center gap-6">
      <MetricsCard title={'Amount of Networks'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard title={'Total Rewards Paid'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
      <MetricsCard title={'Daily Revenue'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
    </div>
  );
};

export default MetricsCards;
