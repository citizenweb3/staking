'use client';

import { FC, useState } from 'react';

import Mdn from '@/app/components/mdn/mdn';

interface OwnProps {
  items: { title: string; content: string }[];
}

const Tabs: FC<OwnProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? null;

  return (
    <div>
      {items.length > 0 && (
        <div className="mt-8 flex justify-center">
          <ul className="flex flex-wrap items-end justify-center space-x-8 text-center">
            {items.map((tab, idx) => (
              <li
                key={tab.title}
                className="my-1 list-none text-3xl font-semibold transition-all duration-150 hover:scale-105"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={
                    activeIndex === idx
                      ? 'active inline-block border-b-2 border-b-tab-borderActive pb-1 capitalize'
                      : 'inline-block cursor-pointer border-b-2 border-b-transparent pb-1 capitalize hover:border-b-tab-borderHover'
                  }
                >
                  {tab.title.replace(/-/g, ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {active?.content && (
        <div className="mt-2 max-w-full overflow-hidden">
          <Mdn content={active.content} />
        </div>
      )}
    </div>
  );
};

export default Tabs;
