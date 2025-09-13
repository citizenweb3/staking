import type { IChainConfig } from '@/types';

export const findOppositeByTitle = (chains: IChainConfig[], current: IChainConfig) => {
  if (!current?.title || !current?.type) return null;
  const other = current.type === 'mainnet' ? 'testnet' : 'mainnet';
  return chains.find((c) => c.title === current.title && c.type === other) ?? null;
};
