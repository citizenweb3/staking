import Link from 'next/link';

import Button from '@/app/components/common/button';

const Header = () => (
  <div className="flex flex-row justify-between">
    <Link href={'/'} className="font-hisqaida">
      <span className="text-3xl">citizen</span>
      <span className={`text-lg`}> web3</span>
    </Link>

    <Link href={`https://validatorinfo.com/`} target="_blank" rel="nofollow" className="text-base">
      <Button external>Open App</Button>
    </Link>
  </div>
);

export default Header;
