import Link from 'next/link';
import { FC } from 'react';

interface OwnProps {
  chain: string;
}
const NotFound: FC<OwnProps> = ({ chain }) => (
  <div>
    <div className="text-base">
      <div>
        Mainnet <span className="text-xl font-bold">{chain}</span> was not found!
      </div>
      <div>
        try to fine one{' '}
        <Link href={'/'}>
          <span className="text-xl underline hover:no-underline">here</span>
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
