import { FC } from 'react';

import TestnetToggleButton from '@/app/components/monitor/validator-networks/testnet-toggle-button';
import SortControls from '@/app/components/monitor/validator-networks/sort-controls';
import ValidatorNetworksItem from '@/app/components/monitor/validator-networks/validator-table/validator-networks-item';
import { SortDir, SortKey } from '@/app/utils/monitor-table/prepare-table-data';
import { NodeItem } from '@/types';

interface OwnProps {
  data: NodeItem[];
  sortKey: SortKey;
  sortDir: SortDir;
}

const ValidatorTable: FC<OwnProps> = ({ data, sortKey, sortDir }) => {
  const thBtn =
    'cursor-pointer select-none py-2 px-1 sm:py-3 sm:px-2 rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 -m-0.5 text-xs sm:text-sm';

  const th =
    'py-2 px-1 sm:py-3 sm:px-2 rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 -m-0.5 text-xs sm:text-sm';

  return (
    <div>
      <div className="my-2 flex justify-end">
        <TestnetToggleButton />
      </div>
      <div className="overflow-x-auto sm:overflow-x-visible">
        <table className="w-full table-auto min-w-[500px] sm:min-w-auto">
        <thead>
          <tr className="bg-button-bg">
            <th>
              <SortControls label="Network" sortKey="network" currentKey={sortKey} dir={sortDir} className={thBtn} />
            </th>
            <th>
              <div className={th}>Commission</div>
            </th>
            <th>
              <div className={th}>Daily Commission</div>
            </th>
            <th>
              <SortControls
                label="Total Secured USD"
                sortKey="totalSecure"
                currentKey={sortKey}
                dir={sortDir}
                className={thBtn}
              />
            </th>
            <th>
              <SortControls
                label="Total Delegators"
                sortKey="totalDelegators"
                currentKey={sortKey}
                dir={sortDir}
                className={thBtn}
              />
            </th>
            <th title={'As per Coingecko API data'}>
              <div className={th}>Token Price per Chain</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <ValidatorNetworksItem key={row.chain.name} node={row} />
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidatorTable;
