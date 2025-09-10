import { FC } from 'react';

import ChainCard from '@/app/components/chain-list/chain-card';
import { CATEGORIES } from '@/app/config';
import { Selected, applyFacetFilter, normalizeArray } from '@/app/utils/chain-list/filters-utils';
import type { IChainConfig } from '@/types';

type OwnProps = {
  chains: IChainConfig[];
  selected: Selected;
};

const ChainList: FC<OwnProps> = ({ chains, selected }) => {
  const filtered = applyFacetFilter(chains, selected);

  if (filtered.length === 0) {
    return (
      <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-md border border-dashed p-6 text-sm text-white">
        Can't find networks for combination of filters. Please reset filters.
      </div>
    );
  }

  const displayCategories: string[] = [];

  let combined = false;

  for (const category of CATEGORIES) {
    displayCategories.push(category);
  }

  const inDisplaySection = (chain: IChainConfig, displayCategory: string) => {
    const originalCategories = normalizeArray((chain as any).category);
    return originalCategories.includes(displayCategory);
  };

  return (
    <>
      {displayCategories.map((displayCategory) => {
        const items = filtered.filter((chain) => inDisplaySection(chain, displayCategory));
        if (items.length === 0) return null;

        return (
          <div key={displayCategory} className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{displayCategory}</h1>
            <div className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {items.map((chain) => (
                <ChainCard key={chain.name} chain={chain} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChainList;
