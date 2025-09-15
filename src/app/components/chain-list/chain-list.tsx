import { FC } from 'react';

import ChainCard from '@/app/components/chain-list/chain-card';
import { CATEGORIES } from '@/app/config';
import { Selected, applyFacetFilter, normalizeArray } from '@/app/utils/chain-list/filters-utils';
import { Group, toFilterView } from '@/app/utils/chain-list/group-adapter';
import type { IChainConfig } from '@/types';

interface OwnProps {
  chains: IChainConfig[];
  selected: Selected;
}

const ChainList: FC<OwnProps> = ({ chains, selected }) => {
  const combinedCategory = 'AI + DePin';

  let groupByTitle = new Map<string, { mainnet?: IChainConfig; testnet?: IChainConfig }>();

  for (const chain of chains) {
    const key = chain.title ?? chain.name;
    const entry = groupByTitle.get(key) ?? {};
    const t = String(chain.type ?? '').toLowerCase();
    if (t === 'testnet') {
      entry.testnet = chain;
    } else {
      entry.mainnet = chain;
    }
    groupByTitle.set(key, entry);
  }

  let groups: Group[] = [];

  for (const pair of Array.from(groupByTitle.values())) {
    const base = pair.mainnet ?? pair.testnet!;
    const hasMainnet = Boolean(pair.mainnet);
    const hasTestnet = Boolean(pair.testnet);
    const typeSet = new Set<string>([...(hasMainnet ? ['mainnet'] : []), ...(hasTestnet ? ['testnet'] : [])]);

    groups.push({
      base,
      hasMainnet,
      hasTestnet,
      mainnetName: pair.mainnet?.name,
      testnetName: pair.testnet?.name,
      virtualCategories: hasTestnet ? ['Testnet'] : [],
      typeSet,
    });
  }

  const groupsFilterViews = groups.map((group) => toFilterView(group, selected));

  const passedMask = applyFacetFilter(groupsFilterViews, selected);
  const filteredGroups: Group[] = groups.filter((_, i) => passedMask.includes(groupsFilterViews[i]));

  if (filteredGroups.length === 0) {
    return (
      <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-md border border-dashed p-6 text-sm text-white">
        Can't find networks for combination of filters. Please reset filters.
      </div>
    );
  }

  const displayCategories: string[] = [];
  let combined = false;

  for (const category of CATEGORIES) {
    const cat = category.trim().toLowerCase();
    if (cat === 'ai' || cat === 'depin') {
      if (!combined) {
        displayCategories.push(combinedCategory);
        combined = true;
      }
      continue;
    }
    displayCategories.push(category);
  }

  const getAllCategories = (group: Group) => {
    const originals = normalizeArray((group.base as any).category);
    return originals.concat(group.virtualCategories ?? []);
  };

  const inDisplaySection = (group: Group, displayCategory: string) => {
    const categories = getAllCategories(group);
    if (displayCategory === combinedCategory) {
      const lower = categories.map((x) => x.trim().toLowerCase());
      return lower.includes('ai') || lower.includes('depin');
    }
    return categories.includes(displayCategory);
  };

  return (
    <>
      {displayCategories.map((displayCategory) => {
        let items = filteredGroups.filter((g) => inDisplaySection(g, displayCategory));
        if (items.length === 0) return null;

        if (displayCategory === combinedCategory) {
          const isAI = (group: Group) => getAllCategories(group).some((x) => x.trim().toLowerCase() === 'ai');
          items = items.slice().sort((a, b) => +!isAI(a) - +!isAI(b));
        }

        return (
          <div key={displayCategory} className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">{displayCategory}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {items.map((g) => (
                <ChainCard
                  key={g.base.name}
                  chain={
                    {
                      ...g.base,
                      hasMainnet: g.hasMainnet,
                      hasTestnet: g.hasTestnet,
                      mainnetName: g.mainnetName,
                      testnetName: g.testnetName,
                    } as any
                  }
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChainList;
