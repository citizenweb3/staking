import { FC, Suspense } from 'react';

import { getRepoChains } from '@/app/actions/repos';
import ChainList from '@/app/components/chain-list/chain-list';
import NetworksFilters from '@/app/components/chain-list/networks-filters';
import ResetFilters from '@/app/components/chain-list/reset-filters';
import { CATEGORIES } from '@/app/config';
import {
  type Selected,
  buildCanonMaps,
  getAllCanonFromPage,
  normalizeArray,
  optionsForFacet,
  uniqueStable,
} from '@/app/utils/chain-list/filters-utils';
import type { IChainConfig } from '@/types';

type PageProps = { searchParams: Record<string, string | string[] | undefined> };

const MainPage: FC<PageProps> = async ({ searchParams }) => {
  const selected: Selected = {
    types: getAllCanonFromPage(searchParams, 'type'),
    categories: getAllCanonFromPage(searchParams, 'category'),
    provisions: getAllCanonFromPage(searchParams, 'provision'),
  };

  const chains: IChainConfig[] = await getRepoChains();

  const { typeMap, catMap, provMap } = buildCanonMaps(chains);

  const provisionUniverseCanon = uniqueStable(
    chains.flatMap((c) => normalizeArray((c as any).provision).map((v) => v.trim().toLowerCase())),
  );

  const order = new Map(provisionUniverseCanon.map((v, i) => [v, i]));

  const typeOptionsCanon = optionsForFacet(chains, 'type', selected);
  const categoryOptionsCanon = CATEGORIES; //optionsForFacet(chains, 'category', selected);
  const rawProvisionOptionsCanon = optionsForFacet(chains, 'provision', selected);

  const provisionOptionsCanon = rawProvisionOptionsCanon.slice().sort((a, b) => {
    const ia = order.has(a) ? order.get(a)! : Number.MAX_SAFE_INTEGER;
    const ib = order.has(b) ? order.get(b)! : Number.MAX_SAFE_INTEGER;
    return ia - ib;
  });

  const typeOptions = typeOptionsCanon.map((k) => typeMap.get(k) ?? k);
  const categoryOptions = categoryOptionsCanon.map((k) => catMap.get(k) ?? k);
  const provisionOptions = provisionOptionsCanon.map((k) => provMap.get(k) ?? k);

  return (
    <div className="flex flex-col font-semibold">
      <h1 className="text-center text-2xl ">Non Custodial Staking with Citizen Web3 Validator</h1>
      <div className="mx-auto my-6 w-1/12 border-b text-center"></div>
      <h2 className="mb-12 text-center text-xl">
        Citizen Web3 is a privacy-focused, self-hosted bare-metal validator. Located in the middle of the Atlantic ocean
        with off the grid capabilities.
      </h2>
      <NetworksFilters selected={selected.types} options={typeOptions} tag="type" title="Network Status" />
      <NetworksFilters selected={selected.categories} options={categoryOptions} tag="category" title="Category" />
      <NetworksFilters selected={selected.provisions} options={provisionOptions} tag="provision" title="Provisions" />
      <ResetFilters />
      <p className="mt-2 mb-6 text-sm text-gray font-medium">
        * Please note, every day at 06:00 and 18:00 UTC our public infrastructure makes snapshots.
        This means that for a period of approximately 30 minutes our public nodes won&apos;t respond
        to calls.
      </p>
      <Suspense fallback={<ChainList chains={chains} selected={selected} />}>
        <ChainList chains={chains} selected={selected} />
      </Suspense>
    </div>
  );
};

export default MainPage;
