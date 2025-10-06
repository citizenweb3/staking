import Link from 'next/link';
import { FC } from 'react';

import { InfrastructureItem } from '@/types';

interface OwnProps {
  item: InfrastructureItem;
}

const InfrastructureTableItem: FC<OwnProps> = ({ item }) => {
  const cn = 'rounded-md border border-solid border-white/40 py-3 -m-0.5';

  return (
    <tr className="">
      <td className="w-[16%] text-center">
        <div className={`relative ${cn}`}>
          <div className="relative capitalize">{item.name}</div>
          <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-green" />
        </div>
      </td>
      <td className="w-[84%]">
        <Link href={`https://staking.citizenweb3.com/chains/${item.name}`}>
          <div className={`${cn} pl-10`}>
            Providing infrastructure such as{' '}
            {item.infrastructure
              .filter((v): v is string => Boolean(v && v.trim()))
              .map((val, idx) => (
                <span key={val + idx} className="inline">
                  {val}
                  {idx < item.infrastructure.filter((v) => v && v.trim()).length - 1 ? ', ' : ''}
                </span>
              ))}
            .
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default InfrastructureTableItem;
