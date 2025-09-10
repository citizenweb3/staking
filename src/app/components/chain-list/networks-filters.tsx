'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { FacetKeys, toSlug } from '@/app/utils/chain-list/filters-utils';

type OwnProps = {
  selected: string[];
  options: string[];
  tag: FacetKeys;
  title: string;
};

const NetworksFilters: FC<OwnProps> = ({ selected, options, tag, title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAll = selected.length === 0;

  const onClickAll = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete(tag);
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(url);
  };

  const onToggle = (label: string) => {
    const val = toSlug(label);
    const curr = (searchParams?.getAll(tag) ?? []).map(toSlug);
    const set = new Set(curr);
    set.has(val) ? set.delete(val) : set.add(val);

    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete(tag);
    Array.from(set)
      .sort()
      .forEach((v) => params.append(tag, v));
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(url);
  };

  return (
    <div className="mb-4 grid grid-cols-[15%_85%]">
      <div className="text-lg font-semibold">{title}:</div>
      <div>
        <button
          onClick={onClickAll}
          aria-pressed={isAll}
          className={`rounded-md border px-3 py-1.5 text-sm font-semibold capitalize transition ${
            isAll ? 'hover:bg-gray-100 border-gray-300 bg-white text-black' : 'border-black bg-black text-white'
          }`}
        >
          all
        </button>
        {options.map((label) => {
          const val = toSlug(label);
          const active = selected.includes(val);
          return (
            <button
              key={val}
              onClick={() => onToggle(label)}
              aria-pressed={active}
              className={`rounded-md border px-3 py-1.5 text-sm font-semibold capitalize transition ${
                active ? 'hover:bg-gray-100 border-gray-300 bg-white text-black' : 'border-black bg-black text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NetworksFilters;
