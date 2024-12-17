'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { IChainConfig } from '@/types';

interface OwnProps {
  chain: IChainConfig;
}

const ChainCard: FC<OwnProps> = ({ chain }) => {
  const [status, setStatus] = useState<boolean>(true);

  // useEffect(() => {
  //   const getHealth = async () => {
  //     try {
  //       const response = await fetch(`/api/health/${chain.name}`);
  //       const data = await response.json();
  //       setStatus(data.status);
  //     } catch (error) {
  //       console.error('Error fetching health:', error);
  //     }
  //   };
  //
  //   const intervalId = setInterval(getHealth, 2500);
  //
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [chain.name]);

  return (
    <Link
      href={`/chains/${chain.name}`}
      className="flex w-full cursor-pointer flex-col items-center rounded-3xl bg-paper p-4 shadow transition-all duration-300 hover:scale-105 hover:brightness-150"
    >
      <div
        key={chain.name + 'status'}
        className={`border-1 ml-auto animate-ping rounded-full border-black ${status ? 'bg-green' : 'bg-red'} bg-green p-0.5`}
      />
      <Image src={chain.icon} alt={chain.title} width={100} height={100} className="h-24 w-24" />
      <div className="mt-4 text-2xl font-semibold">{chain.title}</div>
    </Link>
  );
};

export default ChainCard;
