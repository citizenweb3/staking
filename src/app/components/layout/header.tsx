import Image from 'next/image';
import Link from 'next/link';

import Button from '@/app/components/common/button';
import ValidatorLinks from '@/app/components/monitor/validator-links';

const Header = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex w-full flex-row justify-between">
      <Link href={'/'} className="font-hisqaida">
        <div className="group flex flex-row items-center">
          <Image
            width={100}
            height={100}
            src={'/cw3logo.png'}
            alt={'Logo'}
            className="h-10 w-10 sm:h-12 sm:w-12 shadow transition-all duration-300 group-hover:scale-110 group-hover:brightness-150 group-active:scale-95 group-active:brightness-75"
          />
          <div className="flex flex-row items-end">
            <div className="text-2xl transition-all duration-300 group-hover:text-3xl group-active:text-2xl sm:text-3xl sm:group-hover:text-4xl sm:group-active:text-3xl">citizen</div>
            <div className="text-base transition-all duration-300 group-hover:text-lg group-active:text-base sm:text-lg sm:group-hover:text-2xl sm:group-active:text-lg"> web3</div>
          </div>
        </div>
      </Link>

      <div className="flex space-x-2">
        <Link href={`https://staking.citizenweb3.com/`} target="_blank" rel="nofollow" className="text-sm sm:text-base">
          <Button external>Staking</Button>
        </Link>
        <Link href={`https://validatorinfo.com/networks`} target="_blank" rel="nofollow" className="text-sm sm:text-base">
          <Button external>Val Info</Button>
        </Link>
        <Link href={`https://www.citizenweb3.com/episodes`} target="_blank" rel="nofollow" className="text-sm sm:text-base">
          <Button external>Podcast</Button>
        </Link>
      </div>
    </div>

    <div className="flex justify-start ml-2">
      <ValidatorLinks />
    </div>
  </div>
);

export default Header;
