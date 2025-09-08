import { FC, Suspense } from 'react';

import { getRepoChains } from '@/app/actions/repos';
import ChainList from '@/app/components/chain-list/chain-list';
import NetworksFilters from '@/app/components/chain-list/networks-filters';
import type { IChainConfig } from '@/types';

type OwnProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const getAll = (sp: Record<string, string | string[] | undefined>, key: string): string[] => {
  const raw = sp[key];
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
};

const normalizeArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string' && v.length > 0);
  if (typeof value === 'string' && value.length > 0) return [value];
  return [];
};

const uniqueSorted = (arr: string[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
};

const filterChainsAND = (chains: IChainConfig[], selTypes: string[], selCats: string[], selServices: string[]) => {
  const hasTypes = selTypes.length > 0;
  const hasCats = selCats.length > 0;
  const hasServ = selServices.length > 0;

  return chains.filter((c) => {
    if (hasTypes && (!c.type || !selTypes.includes(String(c.type)))) return false;
    const cats = normalizeArray((c as any).category);
    if (hasCats && (cats.length === 0 || !cats.some((t) => selCats.includes(t)))) return false;
    const servs = normalizeArray((c as any).services);
    if (hasServ && (servs.length === 0 || !servs.some((s) => selServices.includes(s)))) return false;
    return true;
  });
};

const optionsForTypes = (chains: IChainConfig[], selCats: string[], selServices: string[]) => {
  const slice = filterChainsAND(chains, [], selCats, selServices);
  return uniqueSorted(slice.map((c) => String(c.type)).filter((x) => x));
};

const optionsForCategories = (chains: IChainConfig[], selTypes: string[], selServices: string[]) => {
  const slice = filterChainsAND(chains, selTypes, [], selServices);
  const cats = slice.flatMap((c) => normalizeArray((c as any).category));
  return uniqueSorted(cats);
};

const optionsForServices = (chains: IChainConfig[], selTypes: string[], selCats: string[]) => {
  const slice = filterChainsAND(chains, selTypes, selCats, []);
  const servs = slice.flatMap((c) => normalizeArray((c as any).services));
  return uniqueSorted(servs);
};

const MainPage: FC<OwnProps> = async ({ searchParams }) => {
  const selectedTypes = getAll(searchParams, 'type');
  const selectedCategories = getAll(searchParams, 'category');
  const selectedServices = getAll(searchParams, 'service');

  const chains = await getRepoChains();

  const typeOptions = optionsForTypes(chains, selectedCategories, selectedServices);
  const categoryOptions = optionsForCategories(chains, selectedTypes, selectedServices);
  const serviceOptions = optionsForServices(chains, selectedTypes, selectedCategories);

  const selected = { types: selectedTypes, categories: selectedCategories, services: selectedServices };

  return (
    <div>
      <NetworksFilters selected={selected.types} options={typeOptions} tag={'type'} title={'Network Status'} />
      <NetworksFilters selected={selected.categories} options={categoryOptions} tag={'category'} title={'Category'} />
      <NetworksFilters selected={selected.services} options={serviceOptions} tag={'service'} title={'Provisions'} />
      <Suspense fallback={<ChainList chains={chains} selected={selected} />}>
        <ChainList chains={chains} selected={selected} />
      </Suspense>
    </div>
  );
};

export default MainPage;
