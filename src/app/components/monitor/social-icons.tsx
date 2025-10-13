import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const cardBase =
  'relative flex h-20 w-36 sm:h-20 sm:w-36 md:h-20 md:w-36 2xl:h-20 2xl:w-48 items-center justify-center rounded-xl bg-paper hover:bg-button-bg flex-shrink-0 my-2 sm:my-4';
const dot = 'absolute right-1.5 top-1.5 sm:right-2 sm:top-2 md:right-3 md:top-3 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green';
const logoWrap = 'relative aspect-square w-14 sm:w-12 md:w-14 lg:w-14 rounded-full';

const SocialIcons: FC = () => {
  return (
    <div className="flex items-center justify-center gap-x-4 overflow-x-auto flex-row">
      <Link
        href="https://validatorinfo.com"
        className={cardBase}
        aria-label="validatorinfo.com"
        title="validatorinfo.com"
      >
        <div className={logoWrap}>
          <Image src="/img/logo/valinfo.png" alt="validatorinfo.com logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://bvc.citizenweb3.com" className={cardBase} aria-label="BVC" title="BVC">
        <div className={logoWrap}>
          <Image src="/img/logo/bvc.png" alt="bvc logo" fill className="object-contain" />
        </div>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-yellow sm:right-2 sm:top-2 sm:h-2 sm:w-2 md:right-3 md:top-3" />
      </Link>

      <Link href="https://t.me/web_3_society" className={cardBase} aria-label="Web3 Society" title="Web3 Society">
        <div className={logoWrap}>
          <Image src="/img/logo/web3c.png" alt="web society logo" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>

      <Link href="https://github.com/citizenweb3/chain-data-indexer" className={cardBase} aria-label="Chain Data Indexer" title="Chain Data Indexer">
        <div className={logoWrap}>
          <Image src="/icons/github.svg" alt="chain-data-indexer" fill className="object-contain" />
        </div>
        <span className={dot} />
      </Link>
    </div>
  );
};

export default SocialIcons;
