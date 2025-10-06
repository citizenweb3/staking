import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ValidatorLinks: FC = () => {
  return (
    <div className="my-2 flex flex-row gap-x-10">
      <Link
        title="Website"
        href="https://citizenweb3.com"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-110"
      >
        <Image width={60} height={60} src={'/icons/website.svg'} alt="website" className="h-8 w-8" />
      </Link>
      <Link
        title="Github"
        href="https://github.com/citizenweb3"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-110"
      >
        <Image width={60} height={60} src={'/icons/github.svg'} alt="github" className="h-8 w-8" />
      </Link>
      <Link
        title="Twitter (X)"
        href="https://x.com/citizen_web3"
        target="_blank"
        rel="nofollow"
        className="transition-all duration-150 hover:scale-110"
      >
        <Image width={60} height={60} src={'/icons/x.svg'} alt="Twitter (X)" className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default ValidatorLinks;
