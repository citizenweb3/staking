import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const cardBase = 'relative flex h-20 w-48 items-center justify-center rounded-xl bg-paper hover:bg-button-bg';
const dot = 'absolute right-3 top-3 h-2 w-2 rounded-full bg-green';
const logoWrap = 'relative aspect-square w-14 rounded-full';

const SocialIcons: FC = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <Link href="https://validatorinfo.com" className={cardBase} aria-label="validatorinfo.com">
        <div className={logoWrap}>
          <Image src="/img/icons/logo/valinfo.png" alt="validatorinfo.com logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://bvc.citizenweb3.com" className={cardBase} aria-label="BVC">
        <div className={logoWrap}>
          <Image src="/img/icons/logo/bvc.png" alt="bvc logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://t.me/web_3_society" className={cardBase} aria-label="Web3 Society">
        <div className={logoWrap}>
          <Image src="/img/icons/logo/web3c.png" alt="web society logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>
    </div>
  );
};

export default SocialIcons;
