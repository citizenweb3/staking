'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import Switch from '@/app/components/common/switch';
import { findOppositeByTitle } from '@/app/utils/chain-status-switcher';
import type { IChainConfig } from '@/types';

interface OwnProps {
  current: IChainConfig;
  allChains: IChainConfig[];
}

const StatusSwitch: FC<OwnProps> = ({ current, allChains }) => {
  const router = useRouter();
  const search = useSearchParams();

  const pair = findOppositeByTitle(allChains, current);
  if (!pair) return null;

  const checked = current.type === 'testnet';

  const onChange = async (next: boolean) => {
    const target = next ? pair.name : pair.type === 'testnet' ? current.name : pair.name;
    const params = new URLSearchParams(search?.toString() ?? '');
    const qs = params.toString();
    const url = `/chains/${target}${qs ? `?${qs}` : ''}`;

    router.prefetch(url);
    requestAnimationFrame(() => router.replace(url));
  };

  return (
    <div className="flex justify-self-center">
      <div className="text-3xl font-semibold">Mainnet</div>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`mx-8 self-center`}
        ariaLabel={checked ? 'Switch to mainnet' : 'Switch to testnet'}
      />
      <div className="text-3xl font-semibold">Testnet</div>
    </div>
  );
};

export default StatusSwitch;
