import Link from 'next/link';
import { FC } from 'react';

import Button from '@/app/components/common/button';

interface OwnProps {
  stake?: string;
  wallets?: Array<{ name: string; url: string }>;
}

const WalletStakeButtons: FC<OwnProps> = ({ stake, wallets }) => {
  if (!stake && (!wallets || wallets.length === 0)) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {stake && (
        <Link href={stake} rel="nofollow" target="_blank">
          <Button external className="text-lg capitalize">
            Stake with Citizen Web3
          </Button>
        </Link>
      )}
      {wallets?.map((wallet) => (
        <Link key={wallet.name} href={wallet.url} rel="nofollow" target="_blank">
          <Button external className="text-lg capitalize">
            Stake with {wallet.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default WalletStakeButtons;
