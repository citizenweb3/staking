import ChainCard from '@/app/components/chain-list/chain-card';
import type { IChainConfig } from '@/types';
import { FC } from 'react';

type Selected = { types: string[]; categories: string[]; services: string[] };

type OwnProps = {
  chains: IChainConfig[];
  selected: Selected;
};

function normalizeArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string' && v.length > 0);
  if (typeof value === 'string' && value.length > 0) return [value];
  return [];
}

const ChainList: FC<OwnProps> = ({ chains, selected }) => {
  const { types, categories, services } = selected;
  const hasTypes = types.length > 0;
  const hasCats = categories.length > 0;
  const hasServ = services.length > 0;

  const filtered = chains.filter((c) => {
    if (hasTypes && (!c.type || !types.includes(String(c.type)))) return false;

    const cats = normalizeArray((c as any).category);
    if (hasCats && (cats.length === 0 || !cats.some((t) => categories.includes(t)))) return false;

    const servs = normalizeArray((c as any).services);
    if (hasServ && (servs.length === 0 || !servs.some((s) => services.includes(s)))) return false;

    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-md border border-dashed p-6 text-sm text-gray-600">
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
