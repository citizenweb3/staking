import { NodeItem } from '@/types';

export type SortKey = 'network' | 'totalSecure' | 'totalDelegators';
export type SortDir = 'asc' | 'desc';

const cmpStr = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '', undefined, { sensitivity: 'base' });

const cmpNum = (a?: number | null, b?: number | null) => {
  const x = a ?? Number.NEGATIVE_INFINITY;
  const y = b ?? Number.NEGATIVE_INFINITY;
  return x === y ? 0 : x < y ? -1 : 1;
};

export const computeTotalSecure = (node: NodeItem) => {
  const decimals = node.chain?.params?.coinDecimals;
  const price = node.chain?.prices?.[0]?.value;
  const tokensAmount = node.delegatorShares;

  if (decimals == null || price == null || !tokensAmount) return null;

  const sharesNum = Number(tokensAmount);
  if (!Number.isFinite(sharesNum)) return null;

  return (sharesNum / 10 ** decimals) * price;
};

export const sortRows = (nodes: NodeItem[], sortKey: SortKey, sortDir: SortDir) => {
  const sgn = sortDir === 'asc' ? 1 : -1;

  const rows = nodes.map((row) => {
    row.totalSecure = computeTotalSecure(row);
    return row;
  });

  rows.sort((a, b) => {
    let r = 0;
    if (sortKey === 'network') {
      r = cmpStr(a.chain.name, b.chain.name);
    } else if (sortKey === 'totalSecure') {
      r = cmpNum(a.totalSecure, b.totalSecure);
    } else if (sortKey === 'totalDelegators') {
      r = cmpNum(a.delegatorsAmount, b.delegatorsAmount);
    }
    return sgn * r;
  });

  return rows;
};
