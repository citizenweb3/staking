import { IChainConfig, NodeItem } from '@/types';

type Row = {
  networkName: string;
  chainName: string;
  totalDelegators: number | null;
  totalSecure: number | null;
  node: NodeItem | null;
};

export type SortKey = 'network' | 'totalSecure' | 'totalDelegators';
export type SortDir = 'asc' | 'desc';

const cmpStr = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '', undefined, { sensitivity: 'base' });

const cmpNum = (a?: number | null, b?: number | null) => {
  const x = a ?? Number.NEGATIVE_INFINITY;
  const y = b ?? Number.NEGATIVE_INFINITY;
  return x === y ? 0 : x < y ? -1 : 1;
};

const computeTotalSecure = (node: NodeItem | null) => {
  if (!node) {
    return null;
  }

  const decimals = node.chain?.params?.coinDecimals;
  const price = node.chain?.prices?.[0]?.value;
  const tokensAmount = node.delegatorShares;

  if (decimals == null || price == null || !tokensAmount) {
    return null;
  }

  return (+tokensAmount / 10 ** decimals) * price;
};

export const buildRows = (chains: IChainConfig[], nodes: NodeItem[]) => {
  const byName = new Map<string, NodeItem>();

  for (const node of nodes) {
    const name = node.chain?.name;
    if (name && !byName.has(name)) {
      byName.set(name, node);
    }
  }

  const list: Row[] = [];

  for (const chain of chains) {
    const name = chain.name;
    const node = byName.get(name) ?? null;
    const pretty = node?.chain?.prettyName ?? chain.title ?? name;
    list.push({
      networkName: pretty ?? name,
      chainName: name,
      totalDelegators: node?.delegatorsAmount ?? null,
      totalSecure: computeTotalSecure(node),
      node: node,
    });
  }

  for (const node of nodes) {
    const name = node.chain?.name;
    if (!name) {
      continue;
    }
    if (list.some((x) => x.chainName === name)) {
      continue;
    }

    const prettyName = node.chain?.prettyName ?? name;
    list.push({
      networkName: prettyName,
      chainName: name,
      totalDelegators: node.delegatorsAmount ?? null,
      totalSecure: computeTotalSecure(node),
      node: node,
    });
  }

  return list;
};

export const sortRows = (rows: Row[], sortKey: SortKey, sortDir: SortDir) => {
  const arr = [...rows];
  const sgn = sortDir === 'asc' ? 1 : -1;

  arr.sort((a, b) => {
    let r = 0;
    if (sortKey === 'network') {
      r = cmpStr(a.networkName, b.networkName);
    } else if (sortKey === 'totalSecure') {
      r = cmpNum(a.totalSecure, b.totalSecure);
    } else if (sortKey === 'totalDelegators') {
      r = cmpNum(a.totalDelegators, b.totalDelegators);
    }
    return sgn * r;
  });

  return arr;
};
