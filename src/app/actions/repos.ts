import NodeCache from 'node-cache';

import { CONFIG_REPO, CONTRIBUTIONS_REPO } from '@/app/config';
import deepValue from '@/app/utils/deep-value';
import { IChain, IChainConfig, TChainItem } from '@/types';

const cache = new NodeCache();

export const getRegistryChain = async (chainName: string): Promise<IChain | undefined> => {
  if (cache.has(`registry/${chainName}`)) {
    return cache.get(`registry/${chainName}`);
  }

  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/cosmos/chain-registry/master/${chainName}/chain.json`,
    ).then((r) => r.json());

    cache.set(`registry/${chainName}`, res, 3600);
    return res;
  } catch (e) {
    cache.set(`registry/${chainName}`, undefined, 3600);
    return;
  }
};

export const getRepoChains = async (): Promise<IChainConfig[]> => {
  const cachedData = cache.get('github/chains');
  if (cachedData) return cachedData as IChainConfig[];

  const res = (await fetch(`${CONFIG_REPO}/networks.json`).then((r) => {
    return r.json();
  })) as IChainConfig[];
  cache.set('github/chains', res, 10);
  return res;
};

export const getChain = async (chainName: string): Promise<TChainItem | undefined> => {
  const cachedData = cache.get(`chain/${chainName}`);
  if (cachedData) return cachedData as TChainItem;

  const chains = await getRepoChains();
  const registry = await getRegistryChain(chainName);
  const chainConfig = chains.find((n) => n.name === chainName);
  const chain = Object.assign(registry ?? {}, chainConfig) as TChainItem;
  cache.set(`github/${chainName}`, chain, 10);

  return chain;
};

export const getRepoChainService = async (chain: string, serviceName: string): Promise<string> => {
  const cachedData = cache.get(`github/${chain}/${serviceName}`);
  if (cachedData) return cachedData as string;

  const service = await fetch(`${CONFIG_REPO}/${chain}/${serviceName.toLowerCase()}.md`).then((r) => r.text());
  cache.set(`github/${chain}/${serviceName}`, service, 10);
  return service;
};

export const getRepoChainContributions = async (name: string): Promise<string> => {
  const cachedData = cache.get(`github/contributions/${name}`);
  if (cachedData) return cachedData as string;

  const contributions = await fetch(`${CONTRIBUTIONS_REPO}/main/${name}.md`).then((r) => r.text());
  cache.set(`github/contributions/${name}`, contributions, 10);
  return contributions;
};

export const getRepoChainServiceGlobal = async (chain: TChainItem, serviceName: string): Promise<string> => {
  const cachedData = cache.get(`github/global-service/${chain.name}/${serviceName}`);
  if (cachedData) return cachedData as string;

  let globalService = await fetch(`${CONFIG_REPO}/global/${serviceName.toLowerCase()}.md`).then((r) => r.text());

  globalService = globalService.replace(/\{\{(.+?)}}/g, (_, param: string): string => {
    if (param[0] === ':') {
      const [_, path, template, separator] = param.split(':');
      const arr: any = deepValue(chain, path);
      return arr.map((item: any) => template.replace(/{(.+?)}/g, (_, subParam) => item[subParam])).join(separator);
    }

    return deepValue(chain, param) as string;
  });

  cache.set(`github/global-service/${chain.name}/${serviceName}`, globalService, 10);

  return globalService;
};
