import { FC } from 'react';

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
    'cursor-pointer select-none py-3 px-2 rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 py-3 -m-0.5';

  return (
    <div>
      <table className="mt-4 w-full table-auto">
        <thead>
          <tr className="bg-button-bg">
            <th>
              <SortControls label="Network" sortKey="network" currentKey={sortKey} dir={sortDir} className={thBtn} />
            </th>
            <th>
              <div className={thBtn}>Commission</div>
            </th>
            <th>
              <div className={thBtn}>Daily Commission</div>
            </th>
            <th>
              <SortControls
                label="Total Secured"
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
            <th>
              <div className={thBtn}>Token Price per Chain</div>
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
  );
};

export default ValidatorTable;
