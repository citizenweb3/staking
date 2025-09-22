import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ValidatorLinks: FC = () => {
  return (
    <div className="flex my-2">
      <Link
        title="Website"
        href="https://citizenweb3.com"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-105"
      >
        <Image width={30} height={30} src={'/icons/web.png'} alt="website" className="h-10 w-10" />
      </Link>
      <Link
        title="Github"
        href="https://github.com/citizenweb3"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-105"
      >
        <Image width={30} height={30} src={'/icons/github.png'} alt="github" className="h-10 w-10" />
      </Link>
      <Link
        title="Twitter (X)"
        href="https://x.com/citizen_web3"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-105"
      >
        <Image width={30} height={30} src={'/icons/x.png'} alt="Twitter (X)" className="h-10 w-10" />
      </Link>
    </div>
  );
};

export default ValidatorLinks;
