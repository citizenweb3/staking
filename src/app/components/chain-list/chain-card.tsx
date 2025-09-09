import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import TagLink from '@/app/components/chain-list/tag-link';
import { normalizeArray } from '@/app/utils/chain-list/filters-utils';
import type { IChainConfig } from '@/types';

interface OwnProps {
  chain: IChainConfig;
}

const ChainCard: FC<OwnProps> = ({ chain }) => {
  const typeTag = chain.type ? String(chain.type) : '';
  const categoryTags = normalizeArray((chain as any).category);
  const provisionTags = normalizeArray((chain as any).provision);

  return (
    <div className="group flex w-full flex-row rounded-3xl bg-paper p-4 shadow transition-all duration-300 hover:brightness-150 hover:scale-105 active:brightness-75 active:scale-95">
      {/*<div className="mb-2 flex items-start gap-2">*/}
      {/*  <div className="ml-auto h-1 w-1 animate-ping rounded-full bg-green" />*/}
      {/*</div>*/}
      <Link href={`/chains/${chain.name}`} className="flex flex-col items-center">
        <Image src={chain.icon} alt={chain.title} width={100} height={100} className="h-24 w-24" />
        <div className="mt-4 text-center text-lg font-semibold">{chain.title}</div>
      </Link>
      <div className="ml-6">
        <div className="flex flex-col gap-2">
          {typeTag && (
            <div className="flex flex-wrap items-center gap-2">
              <TagLink facet="type" value={typeTag} />
            </div>
          )}
          {categoryTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {categoryTags.map((t) => (
                <TagLink key={`c-${chain.name}-${t}`} facet="category" value={t} />
              ))}
            </div>
          )}
          {provisionTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {provisionTags.map((s) => (
                <TagLink key={`s-${chain.name}-${s}`} facet="provision" value={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChainCard;
