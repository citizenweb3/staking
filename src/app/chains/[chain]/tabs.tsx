'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';

import Mdn from '@/app/components/mdn/mdn';

interface OwnProps {
  items: { title: string; content: string }[];
}

const Tabs: FC<OwnProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const item = useMemo(() => {
    const routerTab = searchParams.get('tab');
    if (!routerTab) {
      return items[0];
    }

    return items.find((i) => i.title === routerTab) || items[0];
  }, [searchParams, items]);

  return (
    <div>
      <div className="mt-8 flex justify-center">
        <ul className="flex flex-wrap items-end justify-center space-x-8 text-center">
          {items.map((tab) => (
            <li
              key={tab.title}
              className="my-1 list-none text-3xl font-semibold capitalize transition-all duration-150 hover:scale-105"
            >
              <span
                onClick={() => router.push(`${pathname}?tab=${tab.title}`)}
                className={
                  item.title === tab.title
                    ? 'active inline-block border-b-2 border-b-tab-borderActive pb-1'
                    : 'inline-block cursor-pointer border-b-2 border-b-transparent pb-1 hover:border-b-tab-borderHover'
                }
              >
                {tab.title.replace(/-/g, ' ')}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {item?.content && <div className="mt-2 max-w-full overflow-hidden">
        <Mdn content={item.content} />
      </div>}
    </div>
  );
};

export default Tabs;
