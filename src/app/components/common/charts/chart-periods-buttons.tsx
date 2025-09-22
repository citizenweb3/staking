'use client';

import { FC } from 'react';

import ChartButton from '@/app/components/common/charts/chart-button';

interface OwnProps {
  isChart: boolean;
  chartType: string | undefined;
  onChartChanged: (isChart: boolean) => void;
  onTypeChanged: (name: string) => void;
  onlyDays?: boolean;
}

const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const ChartPeriodsButtons: FC<OwnProps> = ({ isChart, onChartChanged, chartType, onTypeChanged, onlyDays = false }) => {
  return (
    <div className="flex space-x-4">
      {!onlyDays && (
        <ChartButton
          isActive={isChart}
          contentClassName="px-2 py-0"
          onClick={() => {
            onChartChanged(!isChart);
          }}
        >
          {'Show Charts'}
        </ChartButton>
      )}
      {buttons.map((name) => (
        <ChartButton
          key={name}
          isActive={chartType === name}
          contentClassName="px-2 py-0"
          onClick={() => {
            onTypeChanged(name);
          }}
        >
          {name as 'Weekly' | 'Monthly' | 'Daily' | 'Yearly'}
        </ChartButton>
      ))}
    </div>
  );
};

export default ChartPeriodsButtons;
