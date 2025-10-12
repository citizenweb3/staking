import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const cardBase = 'relative flex h-14 w-32 xs:h-16 xs:w-36 sm:h-20 sm:w-48 items-center justify-center rounded-xl bg-paper hover:bg-button-bg flex-shrink-0  my-4';
const dot = 'absolute right-2 top-2 xs:right-3 xs:top-3 h-2 w-2 rounded-full bg-green';
const logoWrap = 'relative aspect-square w-10 xs:w-12 sm:w-14 rounded-full';

const SocialIcons: FC = () => {
  return (
    <div className="flex 2xl:flex-row flex-col items-center justify-center gap-x-1 xs:gap-x-2 sm:gap-x-4 overflow-x-auto">
      <Link href="https://validatorinfo.com" className={cardBase} aria-label="validatorinfo.com" title="validatorinfo.com">
        <div className={logoWrap}>
          <Image src="/img/logo/valinfo.png" alt="validatorinfo.com logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://bvc.citizenweb3.com" className={cardBase} aria-label="BVC" title="BVC">
        <div className={logoWrap}>
          <Image src="/img/logo/bvc.png" alt="bvc logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://t.me/web_3_society" className={cardBase} aria-label="Web3 Society" title="Web3 Society">
        <div className={logoWrap}>
          <Image src="/img/logo/web3c.png" alt="web society logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>
    </div>
  );
};

export default SocialIcons;
