import Image from 'next/image';
import Link from 'next/link';

import Button from '@/app/components/common/button';

const Header = () => (
  <div className="flex flex-row items-center justify-between">
    <Link href={'/'} className="font-hisqaida">
      <div className="flex flex-row items-center">
        <Image width={30} height={30} src={'/cw3logo.png'} alt={'Logo'} className="h-12 w-12" />
        <div className="flex flex-row items-end">
          <div className="text-3xl">citizen</div>
          <div className={`text-lg`}> web3</div>
        </div>
      </div>
    </Link>

    <div className="flex space-x-2">
      <Link href="/#mainnets" className="text-base">
        <Button>Mainnets</Button>
      </Link>
      <Link href="/#testnets" className="text-base">
        <Button>Testnets</Button>
      </Link>
      <Link href="/#infra" className="text-base">
        <Button>Infra</Button>
      </Link>
      <Link href={``} target="_blank" rel="nofollow" className="text-base">
        <Button external>Monitor</Button>
      </Link>
      <Link href={`https://validatorinfo.com/networks`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Val Info</Button>
      </Link>
      <Link href={`https://www.citizenweb3.com/episodes`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Podcast</Button>
      </Link>
    </div>
  </div>
);

export default Header;
