import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@/app/components/layout/footer';
import Header from '@/app/components/layout/header';

import './globals.css';

const fontMain = localFont({
  src: '../../public/fonts/RedHatDisplay.ttf',
  variable: '--font-main',
});

const hisqaida = localFont({
  src: [
    {
      path: '../../public/fonts/hisqaida2018_bold.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-hisqaida',
});

export const metadata: Metadata = {
  title: 'Non Custodial Staking with Citizen Web3 Validator',
  description: 'Stake securely with Citizen Web3, a non-custodial, self-hosted bare-metal validator. Focused on Privacy networks. Offering public endpoints, archives, snapshots, and relayers. Off-the-grid infrastructure in the Atlantic Ocean for decentralized blockchain validation and rewards.',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={`${fontMain.variable} ${hisqaida.variable}`}>
    <head>
      <title>Non Custodial Staking with Citizen Web3 Validator</title>
      <script defer data-domain="staking.citizenweb3.com" src="https://plausible.io/js/script.js"></script>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <meta name="description"
            content="Stake securely with Citizen Web3, a non-custodial, self-hosted bare-metal validator. Focused on Privacy networks. Offering public endpoints, archives, snapshots, and relayers. Off-the-grid infrastructure in the Atlantic Ocean for decentralized blockchain validation and rewards."/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="robots" content="index,follow"/>
      <meta name="keywords"
            content="non-custodial staking, bare-metal validator, blockchain infrastructure, off-grid validator, privacy validator, public endpoints, snapshots relayers, decentralized staking, Web3 validator, archive nodes, staking rewards"/>

      <meta property="og:type" content="website"/>
      <meta property="og:title" content="Non Custodial Staking with Citizen Web3 Validator"/>
      <meta property="og:description"
            content="Stake securely with Citizen Web3, a non-custodial, self-hosted bare-metal validator. Focused on Privacy networks. Offering public endpoints, archives, snapshots, and relayers. Off-the-grid infrastructure in the Atlantic Ocean for decentralized blockchain validation and rewards."/>
      <meta property="og:image" content="https://staking.citizenweb3.com/cw3logo.png"/>
      <meta property="og:url" content="https://staking.citizenweb3.com"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Non Custodial Staking with Citizen Web3 Validator"/>
      <meta name="twitter:description"
            content="Stake securely with Citizen Web3, a non-custodial, self-hosted bare-metal validator. Focused on Privacy networks. Offering public endpoints, archives, snapshots, and relayers. Off-the-grid infrastructure in the Atlantic Ocean for decentralized blockchain validation and rewards."/>
      <meta name="twitter:image" content="https://staking.citizenweb3.com/cw3logo.png"/>
      <meta name="twitter:url" content="https://https://staking.citizenweb3.com"/>

      <link rel="canonical" href="https://staking.citizenweb3.com/"/>
    </head>
    <body className={`${fontMain.className} scrollbar-track-scroll-bg scrollbar-thumb-scroll-item`}>
    <div className="flex min-h-screen w-full flex-col justify-between bg-black px-8 py-4 text-white">
      <Header />
      <main className="flex-1 pt-6">{children}</main>
      <Footer />
    </div>
    <ToastContainer
      position="top-right"
      autoClose={300}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />
    </body>
    </html>
  );
};

export default RootLayout;
