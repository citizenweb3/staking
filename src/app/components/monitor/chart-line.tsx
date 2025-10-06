'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import ChartPeriodsButtons from '@/app/components/common/charts/chart-periods-buttons';

const ChartLine: FC = () => {
  const [isChart, setIsChart] = useState<boolean>(true);
  const [chartType, setChartType] = useState<string | undefined>('Daily');

  const handleChartChanged = (value: boolean) => {
    setIsChart(value);
    setChartType(value ? 'Daily' : undefined);
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

      <div className="relative mt-8 w-full px-32">
        <Image
          src="/img/tmp/chart.png"
          width={1345}
          height={317}
          alt="temp chart"
          className="w-full rounded-md"
          priority
        />

        <div
          className="
          absolute inset-0
          flex items-center justify-center
          rounded-md
          bg-black/10
          backdrop-blur-sm
        "
        >
          <span className="text-xl font-semibold tracking-wide text-white/90">Under Development</span>
        </div>
      </div>
    </div>
  );
};

export default ChartLine;
