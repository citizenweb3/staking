import { FC } from 'react';

import SortControls from '@/app/components/monitor/validator-networks/sort-controls';
import ValidatorNetworksItem from '@/app/components/monitor/validator-networks/validator-networks-item';
import { SortDir, SortKey, buildRows, sortRows } from '@/app/utils/monitor-table/prepare-table-data';
import { IChainConfig, NodeItem } from '@/types';

interface OwnProps {
  chains: IChainConfig[];
  validatorData: NodeItem[];
  sortKey: SortKey;
  sortDir: SortDir;
}

const ValidatorNetworks: FC<OwnProps> = ({ chains, validatorData, sortKey, sortDir }) => {
  const rows = buildRows(chains, validatorData);
  const sorted = sortRows(rows, sortKey, sortDir);

  const thBtn =
    'cursor-pointer select-none py-3 px-2 rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 py-3 -m-0.5';

  return (
    <div>
      <table className="mt-10 w-full table-auto">
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
              <SortControls label="Total Secure" sortKey="totalSecure" currentKey={sortKey} dir={sortDir} className={thBtn}
              />
            </th>
            <th>
              <SortControls label="Total Delegators" sortKey="totalDelegators" currentKey={sortKey} dir={sortDir} className={thBtn}
              />
            </th>
            <th>
              <div className={thBtn}>Token Price per Chain</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <ValidatorNetworksItem
              key={row.chainName}
              node={
                row.node ?? {
                  operatorAddress: '',
                  jailed: false,
                  delegatorShares: '0',
                  moniker: '',
                  identity: '',
                  rate: '0',
                  outstandingRewards: null,
                  delegatorsAmount: null,
                  missedBlocks: null,
                  uptime: null,
                  chain: {
                    chainId: '',
                    name: row.chainName,
                    prettyName: row.networkName,
                    params: { denom: '', minimalDenom: '', coinDecimals: 0 },
                    prices: [],
                    tokenomics: { apr: null },
                  },
                }
              }
              totalSecure={row.totalSecure}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidatorNetworks;
