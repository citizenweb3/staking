import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import TagLink from '@/app/components/chain-list/tag-link';
import { normalizeArray } from '@/app/utils/chain-list/filters-utils';
import type { IChainConfig } from '@/types';

interface isGroup extends IChainConfig {
  hasMainnet?: boolean;
  hasTestnet?: boolean;
  mainnetName?: string;
  testnetName?: string;
}

interface OwnProps {
  chain: isGroup;
}

const ChainCard: FC<OwnProps> = ({ chain }) => {
  const typeTag = chain.type ? String(chain.type) : '';
  const categoryTags = normalizeArray((chain as any).category);
  const provisionTags = normalizeArray((chain as any).provision);

  const typeBadges: Array<'mainnet' | 'testnet'> =
    chain.hasMainnet || chain.hasTestnet
      ? ([
          ...(chain.hasMainnet ? (['mainnet'] as const) : []),
          ...(chain.hasTestnet ? (['testnet'] as const) : []),
        ] as Array<'mainnet' | 'testnet'>)
      : typeTag
        ? [typeTag.toLowerCase() as 'mainnet' | 'testnet']
        : [];

  return (
    <Link
      href={`/chains/${chain.name}`}
      className="group flex w-full flex-row rounded-3xl bg-paper p-4 shadow transition-all duration-300 hover:scale-105 hover:brightness-150 active:scale-95 active:brightness-75"
    >
      <div className="flex">
        <div className="flex flex-col items-center">
          <Image src={chain.icon} alt={chain.title} width={100} height={100} className="h-24 w-24" />
          <div className="mt-2 text-center text-lg font-semibold">{chain.title}</div>
        </div>
        <div className="ml-6">
          <div className="flex flex-col gap-2">
            {typeBadges.length > 0 && (
              <div className="mt-1 flex gap-2">
                {typeBadges.map((t) => (
                  <TagLink key={`type-${chain.name}-${t}`} facet="type" value={t} />
                ))}
              </div>
            )}
            {categoryTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {categoryTags.map((t) => (
                  <TagLink key={`cat-${chain.name}-${t}`} facet="category" value={t} />
                ))}
              </div>
            )}
            {provisionTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {provisionTags.map((s) => (
                  <TagLink key={`prov-${chain.name}-${s}`} facet="provision" value={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChainCard;
