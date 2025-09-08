'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

type OwnProps = {
  selected: string[];
  options: string[];
  tag: string;
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

  const onToggle = (val: string) => {
    const set = new Set(selected);
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
      <div className="text-lg">{title}:</div>
      <div>
        <button
          onClick={onClickAll}
          aria-pressed={isAll}
          className={`rounded-md border px-3 py-1.5 text-sm capitalize transition ${
            isAll ? 'hover:bg-gray-100 border-gray-300 bg-white text-black' : 'border-black bg-black text-white'
          }`}
        >
          all
        </button>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              aria-pressed={active}
              className={`rounded-md border px-3 py-1.5 text-sm capitalize transition ${
                active ? 'hover:bg-gray-100 border-gray-300 bg-white text-black' : 'border-black bg-black text-white'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NetworksFilters;
