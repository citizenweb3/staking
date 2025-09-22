import ValidatorNetworksList from '@/app/components/monitor/validator-networks/validator-networks-list';

const ValidatorNetworks = async () => {
  const cn =
    'rounded-b-md rounded-r-md rounded-l-md border-b border-r border-l border-solid border-white/40 py-3 -m-0.5';

  return (
    <div>
      <table className="mt-10 w-full table-auto">
        <thead>
          <tr className="bg-button-bg">
            <th>
              <div className={cn}>Network</div>
            </th>
            <th>
              <div className={cn}>Commission</div>
            </th>
            <th>
              <div className={cn}>Daily Commission</div>
            </th>
            <th>
              <div className={cn}>Total Secure</div>
            </th>
            <th>
              <div className={cn}>Total Delegators</div>
            </th>
            <th>
              <div className={cn}>Token Price per Chain</div>
            </th>
          </tr>
        </thead>
        <ValidatorNetworksList />
      </table>
    </div>
  );
};

export default ValidatorNetworks;
