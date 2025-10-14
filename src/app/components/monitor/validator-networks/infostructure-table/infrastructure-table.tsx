import { FC } from 'react';

import InfrastructureTableItem from '@/app/components/monitor/validator-networks/infostructure-table/infrastructure-table-item';
import { InfrastructureItem } from '@/types';

interface OwnProps {
  data: InfrastructureItem[];
}

const InfrastructureTable: FC<OwnProps> = ({ data }) => {
  const thBtn =
    'py-3 px-2 rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 py-3 -m-0.5';

  return (
    <div>
      <table className="mt-8 w-full table-auto">
        <thead>
          <tr className="bg-button-bg">
            <th>
              <div className={thBtn}>Network</div>
            </th>
            <th>
              <div className={thBtn}>Infrastructure</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <InfrastructureTableItem key={row.name} item={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfrastructureTable;
