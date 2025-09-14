'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import Switch from '@/app/components/common/switch';
import type { IChainConfig } from '@/types';

interface OwnProps {
  current: IChainConfig;
  allChains: IChainConfig[];
}

const findOppositeByTitle = (chains: IChainConfig[], current: IChainConfig) => {
  if (!current?.title || !current?.type) return null;
  const other = current.type === 'mainnet' ? 'testnet' : 'mainnet';
  return chains.find((c) => c.title === current.title && c.type === other) ?? null;
};

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
      <div className="text-2xl font-semibold">Mainnet</div>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`mx-8 self-center`}
        ariaLabel={checked ? 'Switch to mainnet' : 'Switch to testnet'}
      />
      <div className="text-2xl font-semibold">Testnet</div>
    </div>
  );
};

export default StatusSwitch;
