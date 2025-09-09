'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { FacetKeys, makeCanon } from '@/app/utils/chain-list/filters-utils';

type OwnProps = { facet: FacetKeys; value: string };

const TagLink: FC<OwnProps> = ({ facet, value }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCanon = (searchParams?.getAll(facet) ?? []).map(makeCanon);
  const key = makeCanon(value);
  const active = selectedCanon.includes(key);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const set = new Set(selectedCanon);
    active ? set.delete(key) : set.add(key);

    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete(facet);
    Array.from(set)
      .sort()
      .forEach((v) => params.append(facet, v));
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(url);
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      className={`rounded-md px-2 py-0.5 text-xs font-semibold capitalize border border-grayLight hover:bg-grayLight ${active ? 'hover:bg-gray bg-white text-black' : 'text-white'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default TagLink;
