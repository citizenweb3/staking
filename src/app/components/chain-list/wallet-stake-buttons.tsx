import Link from 'next/link';
import { FC } from 'react';

import Button from '@/app/components/common/button';

interface OwnProps {
  wallets?: Array<{ name: string; url: string }>;
  buttons?: Array<{ label: string; url: string }>;
}

const WalletStakeButtons: FC<OwnProps> = ({ wallets, buttons }) => {
  if ((!wallets || wallets.length === 0) && (!buttons || buttons.length === 0)) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {wallets?.map((wallet) => (
        <Link key={wallet.name} href={wallet.url} rel="nofollow" target="_blank">
          <Button external className="text-lg capitalize">
            Stake with {wallet.name}
          </Button>
        </Link>
      ))}
      {buttons?.map((button) => (
        <Link key={`${button.label}-${button.url}`} href={button.url} rel="nofollow" target="_blank">
          <Button external className="text-lg">
            {button.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default WalletStakeButtons;
