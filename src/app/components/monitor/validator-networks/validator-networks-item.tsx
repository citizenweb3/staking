import Link from 'next/link';
import { FC } from 'react';

import { fmt } from '@/app/utils/format-money';
import { NodeItem } from '@/types';

interface OwnProps {
  node: NodeItem;
  totalSecure: number | null;
  validatorInfoId: number | null;
}

const ValidatorNetworksItem: FC<OwnProps> = ({ node, totalSecure, validatorInfoId }) => {
  const cn = 'rounded-md border border-solid border-white/40 py-3 -m-0.5';

  const dailyCommission =
    totalSecure && node.chain.tokenomics.apr && node.rate
      ? ((totalSecure * +node.chain.tokenomics.apr) / 365) * +node.rate
      : null;

  return (
    <tr className="">
      <td className="text-center">
        <div className={`relative ${cn}`}>
          <Link
            href={
              validatorInfoId && node.operatorAddress
                ? `https://validatorinfo.com/validators/${validatorInfoId}/${node.operatorAddress}/validator_passport/authz/withdraw_rewards`
                : '/'
            }
            target={'_blank'}
          >
            <div className="relative capitalize">{node.chain.name}</div>
          </Link>
          <div className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ${node.jailed ? 'bg-red' : 'bg-green'} `} />
        </div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.rate ? `${+node.rate * 100}%` : '-'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{dailyCommission ? `$${fmt.format(dailyCommission)}` : '-'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{totalSecure ? `$${fmt.format(totalSecure)}` : '-'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.delegatorsAmount ? node.delegatorsAmount : '-'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.chain.prices.length > 0 ? `$${node.chain.prices[0].value.toFixed(2)}` : '-'}</div>
      </td>
    </tr>
  );
};

export default ValidatorNetworksItem;
