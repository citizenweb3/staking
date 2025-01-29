import Link from 'next/link';
import Button from '@/app/components/common/button';

const Header = () => (
  <div className="flex flex-row justify-between items-center">
    <Link href={'/'} className="font-hisqaida">
      <span className="text-3xl">citizen</span>
      <span className={`text-lg`}> web3</span>
    </Link>

    <div className="flex space-x-2"> {/* Добавляем flex контейнер для кнопок */}
    <Link href={``} target="_blank" rel="nofollow" className="text-base">
        <Button external>Monitor</Button>
      </Link>
      <Link href={`https://validatorinfo.com/`} target="_blank" rel="nofollow" className="text-base">
        <Button external>App</Button>
      </Link>
      <Link href={`https://www.citizenweb3.com/episodes`} target="_blank" rel="nofollow" className="text-base">
        <Button external>Podcast</Button>
      </Link>
    </div>
  </div>
);

export default Header;
