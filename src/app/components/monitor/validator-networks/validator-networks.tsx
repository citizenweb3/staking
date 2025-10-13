import { FC } from 'react';

import InfrastructureTable from '@/app/components/monitor/validator-networks/infostructure-table/infrastructure-table';
import ValidatorTable from '@/app/components/monitor/validator-networks/validator-table/validator-table';
import { SortDir, SortKey, sortRows } from '@/app/utils/monitor-table/prepare-table-data';
import { IChainConfig, InfrastructureItem, NodeItem } from '@/types';
import Subtitle from '@/app/components/common/subtitle';
import ChartLine from '@/app/components/monitor/chart-line';

interface OwnProps {
  validatorData: NodeItem[];
  chains: IChainConfig[];
  sortKey: SortKey;
  sortDir: SortDir;
  showTestnets: boolean;
}

const ValidatorNetworks: FC<OwnProps> = ({ validatorData, chains, sortKey, sortDir, showTestnets }) => {
  let chainsWithValidator: string[] = [];

  for (const chain of chains) {
    if (!showTestnets && chain.name.includes('-testnet')) {
      continue;
    }

    if (chain.provision.includes('Validator') || chain.provision.includes('Sequencer')) {
      chainsWithValidator.push(chain.name);
    }
  }

  let validators: NodeItem[] = [
    {
      totalSecure: null,
      validatorId: 302,
      operatorAddress: '',
      jailed: null,
      delegatorShares: '100000000',
      moniker: '',
      identity: '',
      rate: null,
      outstandingRewards: null,
      delegatorsAmount: 1,
      missedBlocks: null,
      uptime: null,
      chain: {
        chainId: '',
        name: 'aztec',
        prettyName: 'Aztec',
        params: { denom: 'STK', minimalDenom: 'ustk', coinDecimals: 6 },
        prices: [{ value: 0, createdAt: '' }],
        tokenomics: { apr: null },
      },
    },
  ];

  for (const validator of validatorData) {
    if (chainsWithValidator.includes(validator.chain.name)) {
      validators.push(validator);
    }
  }

  const validatorsSorted = sortRows(validators, sortKey, sortDir);

  let infrastructureItems: InfrastructureItem[] = [];

  for (const chain of chains) {
    if (!showTestnets && chain.name.includes('-testnet')) {
      continue;
    }

    if (!chainsWithValidator.includes(chain.name) || chain.name === 'zkverify') {
      infrastructureItems.push({ name: chain.name, infrastructure: chain.provision });
    }
  }

  return (
    <div>
      <ValidatorTable data={validatorsSorted} sortKey={sortKey} sortDir={sortDir} />
      <div className="my-4">
        <Subtitle text={'Citizen Web3 Validator Total Value Secured and Total Delegators'} size={'h2'} />
        <ChartLine />
      </div>
      <InfrastructureTable data={infrastructureItems} />
    </div>
  );
};
export default ValidatorNetworks;
