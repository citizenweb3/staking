import { FC } from 'react';

import ChainCard from '@/app/components/chain-list/chain-card';
import { Selected, applyFacetFilter } from '@/app/utils/chain-list/filters-utils';
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
        Can't find networks for combination of filters. Please clean filters or click All button.
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {filtered.map((chain) => (
        <ChainCard key={chain.name} chain={chain} />
      ))}
    </div>
  );
};

export default ChainList;
