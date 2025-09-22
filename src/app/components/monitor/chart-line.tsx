'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import ChartPeriodsButtons from '@/app/components/common/charts/chart-periods-buttons';

const ChartLine: FC = () => {
  const [isChart, setIsChart] = useState<boolean>(true);
  const [chartType, setChartType] = useState<string | undefined>('Daily');

  const handleChartChanged = (value: boolean) => {
    setIsChart(value);
    if (!value) {
      setChartType(undefined);
    } else {
      setChartType('Daily');
    }
  };
  return (
    <div className="mt-6">
      <div className="mr-28 flex justify-end">
        <ChartPeriodsButtons
          onlyDays
          isChart={isChart}
          onChartChanged={handleChartChanged}
          chartType={chartType}
          onTypeChanged={(name) => setChartType(name)}
        />
      </div>
      <Image src={'/img/tmp/chart.png'} width={1345} height={317} alt="tem chart 1" className="mt-8 w-full px-32" />
    </div>
  );
};

export default ChartLine;
