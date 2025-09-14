import { Selected, normalizeArray } from '@/app/utils/chain-list/filters-utils';
import type { IChainConfig } from '@/types';

export interface Group {
  base: IChainConfig;
  hasMainnet: boolean;
  hasTestnet: boolean;
  mainnetName?: string;
  testnetName?: string;
  virtualCategories?: string[];
  typeSet: Set<string>;
}

export const toFilterView = (group: Group, selected: Selected): IChainConfig => {
  let typeForFilter = group.base.type ?? '';
  if (selected.types.length > 0) {
    if (selected.types.includes('testnet') && group.typeSet.has('testnet')) {
      typeForFilter = 'testnet';
    } else if (selected.types.includes('mainnet') && group.typeSet.has('mainnet')) {
      typeForFilter = 'mainnet';
    } else typeForFilter = '';
  }

  const origCategories = normalizeArray((group.base as any).category);
  const categories = [...origCategories, ...(group.virtualCategories ?? [])];

  const provision = normalizeArray((group.base as any).provision);

  return {
    ...group.base,
    type: typeForFilter,
    category: categories as any,
    provision: provision,
  } as IChainConfig;
};
