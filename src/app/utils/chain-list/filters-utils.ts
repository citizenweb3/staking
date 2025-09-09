import type { IChainConfig } from '@/types';

export type FacetKeys = 'type' | 'category' | 'provision';
export type Selected = { types: string[]; categories: string[]; provisions: string[] };

export const makeCanon = (s: string) => s.trim().toLowerCase();

export const normalizeArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0);
  if (typeof value === 'string' && value.trim().length > 0) return [value];
  return [];
};

export const normalizeCanonArray = (value: unknown): string[] => normalizeArray(value).map(makeCanon);

export const uniqueStable = (arr: string[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of arr)
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  return out;
};

export const uniqueSorted = (arr: string[]) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));

export const isChainMatch = (c: IChainConfig, selected: Selected) => {
  const { types, categories, provisions } = selected;
  const hasTypes = types.length > 0;
  const hasCategories = categories.length > 0;
  const hasProvisions = provisions.length > 0;

  if (hasTypes) {
    const typeVal = c.type ? makeCanon(String(c.type)) : '';
    if (!typeVal || !types.includes(typeVal)) return false;
  }

  if (hasCategories) {
    const cats = normalizeCanonArray((c as any).category);
    if (!cats.some((t) => categories.includes(t))) return false;
  }

  if (hasProvisions) {
    const prov = normalizeCanonArray((c as any).provision);
    if (!provisions.every((p) => prov.includes(p))) return false;
  }

  return true;
};

export const applyFacetFilter = (chains: IChainConfig[], selected: Selected) =>
  chains.filter((c) => isChainMatch(c, selected));

const sliceWithoutFacet = (chains: IChainConfig[], facet: FacetKeys, selected: Selected) => {
  const s: Selected = {
    types: facet === 'type' ? [] : selected.types,
    categories: facet === 'category' ? [] : selected.categories,
    provisions: facet === 'provision' ? [] : selected.provisions,
  };
  return applyFacetFilter(chains, s);
};

export const optionsForFacet = (chains: IChainConfig[], facet: FacetKeys, selected: Selected): string[] => {
  const slice = sliceWithoutFacet(chains, facet, selected);
  if (facet === 'type') {
    return uniqueSorted(slice.map((c) => (c.type ? makeCanon(String(c.type)) : '')).filter(Boolean));
  }
  if (facet === 'category') {
    return uniqueSorted(slice.flatMap((c) => normalizeCanonArray((c as any).category)));
  }
  return uniqueStable(slice.flatMap((c) => normalizeCanonArray((c as any).provision)));
};

export const buildCanonMaps = (chains: IChainConfig[]) => {
  const typeMap = new Map<string, string>();
  const catMap = new Map<string, string>();
  const provMap = new Map<string, string>();

  for (const c of chains) {
    if (c.type) {
      const orig = String(c.type);
      const k = makeCanon(orig);
      if (!typeMap.has(k)) typeMap.set(k, orig);
    }
    for (const orig of normalizeArray((c as any).category)) {
      const k = makeCanon(orig);
      if (!catMap.has(k)) catMap.set(k, orig);
    }
    for (const orig of normalizeArray((c as any).provision)) {
      const k = makeCanon(orig);
      if (!provMap.has(k)) provMap.set(k, orig);
    }
  }
  return { typeMap, catMap, provMap };
};

export const getAllCanonFromPage = (sp: Record<string, string | string[] | undefined>, key: string) => {
  const raw = sp[key];
  const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return arr.map((v) => makeCanon(String(v)));
};
