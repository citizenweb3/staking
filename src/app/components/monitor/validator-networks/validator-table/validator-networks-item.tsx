import Link from 'next/link';
import { FC } from 'react';

import { fmt } from '@/app/utils/format-money';
import { NodeItem } from '@/types';

interface OwnProps {
  node: NodeItem;
}

const ValidatorNetworksItem: FC<OwnProps> = ({ node }) => {
  const cn = 'rounded-md border border-solid border-white/40 py-2 px-1 sm:py-3 sm:px-2 -m-0.5 text-xs sm:text-sm';

  const dailyCommission =
    node.totalSecure && node.chain.tokenomics.apr && node.rate
      ? ((node.totalSecure * +node.chain.tokenomics.apr) / 365) * +node.rate
      : null;

  // const tokensDelegated =
  //   node.delegatorShares && node.chain.params.coinDecimals
  //     ? +node.delegatorShares / 10 ** node.chain.params.coinDecimals
  //     : null;

  return (
    <tr className="">
      <td className="text-center">
        <div className={`relative ${cn}`}>
          <Link
            href={
              node.validatorId && node.operatorAddress
                ? `https://validatorinfo.com/validators/${node.validatorId}/${node.operatorAddress}/validator_passport/authz/withdraw_rewards`
                : '/'
            }
            target={'_blank'}
          >
            <div className="relative capitalize">{node.chain.name}</div>
          </Link>
          <div className={`absolute right-1 top-1 sm:right-1.5 sm:top-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${node.jailed ? 'bg-red' : 'bg-green'} `} />
        </div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.rate ? `${+node.rate * 100}%` : 'N/A'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{dailyCommission ? `$${fmt.format(dailyCommission)}` : 'N/A'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.totalSecure ? `$${fmt.format(node.totalSecure)}` : 'N/A'}</div>
      </td>
      <td className="text-center">
        <div className={cn}>{node.delegatorsAmount ? node.delegatorsAmount : 'N/A'}</div>
      </td>
      <td
        className="text-center"
        title={node.chain.prices.length > 0 && node.chain.prices[0].value !== 0 ? 'As per Coingecko API data' : ''}
      >
        <div className={cn}>
          {node.chain.prices.length > 0 && node.chain.prices[0].value !== 0
            ? `$${node.chain.prices[0].value.toFixed(2)}`
            : 'N/A'}
        </div>
      </td>
    </tr>
  );
};

export default ValidatorNetworksItem;
