import { FC } from 'react';

import { IChainConfig } from '@/types';

interface OwnProps {
  item: IChainConfig;
}

const ValidatorNetworksItem: FC<OwnProps> = ({ item }) => {
  const randBool = Math.random() < 0.8;

  const cn = 'rounded-md border border-solid border-white/40 py-3 -m-0.5';

  return (
    <tr className="">
      <td className="text-center">
        <div className={`relative ${cn}`}>
          <div className="relative capitalize">{item.name}</div>
          <div className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ${randBool ? 'bg-green' : 'bg-red'} `} />
        </div>
      </td>
      <td className="text-center">
        <div className={cn}>90%</div>
      </td>
      <td className="text-center">
        <div className={cn}>$1000</div>
      </td>
      <td className="text-center">
        <div className={cn}>$3.500</div>
      </td>
      <td className="text-center">
        <div className={cn}>1570</div>
      </td>
      <td className="text-center">
        <div className={cn}>$10</div>
      </td>
    </tr>
  );
};

export default ValidatorNetworksItem;
