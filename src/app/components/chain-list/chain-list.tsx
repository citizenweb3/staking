import {FC} from 'react';

import ChainCard from '@/app/components/chain-list/chain-card';
import {applyFacetFilter, Selected} from '@/app/utils/chain-list/filters-utils';
import type {IChainConfig} from '@/types';
import {CATEGORIES} from "@/app/config";

type OwnProps = {
    chains: IChainConfig[];
    selected: Selected;
};

const ChainList: FC<OwnProps> = ({chains, selected}) => {
    const filtered = applyFacetFilter(chains, selected);

    if (filtered.length === 0) {
        return (
            <div
                className="mt-4 flex min-h-[120px] items-center justify-center rounded-md border border-dashed p-6 text-sm text-white">
                Can't find networks for combination of filters. Please clean filters or click All button.
            </div>
        );
    }

    return CATEGORIES.map((category) => (
        <div key={category} className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{category}</h1>
            <div className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.filter(chain => (chain as any).category?.includes(category)).map((chain) => (
                    <ChainCard key={chain.name} chain={chain}/>
                ))}
            </div>
        </div>
    ));
};

export default ChainList;
