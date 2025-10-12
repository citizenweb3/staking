import Image from 'next/image';
import Link from 'next/link';

import Button from '@/app/components/common/button';

const Header = () => (
  <div className="flex flex-row items-center justify-between">
    <div className="flex flex-col">
      <Link href={'/'} className="font-hisqaida">
        <div className="group flex flex-row items-center">
          <Image
            width={100}
            height={100}
            src={'/cw3logo.png'}
            alt={'Logo'}
            className="h-12 w-12 shadow transition-all duration-300 group-hover:scale-110 group-hover:brightness-150 group-active:scale-95 group-active:brightness-75"
          />
          <div className="flex flex-row items-end">
            <div className="text-3xl transition-all duration-300 group-hover:text-4xl group-active:text-3xl">
              citizen
            </div>
            <div className="text-lg transition-all duration-300 group-hover:text-2xl group-active:text-lg"> web3</div>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-row gap-x-4 justify-center">
        <Link
          title="Website"
          href="https://citizenweb3.com"
          target="_blank"
          rel="nofollow"
          className="transition-all duration-150 hover:scale-110"
        >
          <Image width={24} height={24} src={'/icons/website.svg'} alt="website" className="h-6 w-6" />
        </Link>
        <Link
          title="Github"
          href="https://github.com/citizenweb3"
          target="_blank"
          rel="nofollow"
          className="transition-all duration-150 hover:scale-110"
        >
          <Image width={24} height={24} src={'/icons/github.svg'} alt="github" className="h-6 w-6" />
        </Link>
        <Link
          title="Twitter (X)"
          href="https://x.com/citizen_web3"
          target="_blank"
          rel="nofollow"
          className="transition-all duration-150 hover:scale-110"
        >
          <Image width={24} height={24} src={'/icons/x.svg'} alt="Twitter (X)" className="h-6 w-6" />
        </Link>
      </div>
    </div>

    <div className="flex space-x-2">
      <Link href={`https://validatorinfo.com/networks`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Val Info</Button>
      </Link>
      <Link href={`https://monitor.citizenweb3.com`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Monitor</Button>
      </Link>
      <Link href={`https://www.citizenweb3.com/episodes`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Podcast</Button>
      </Link>
    </div>
  </div>
);

export default Header;
