import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@/app/components/layout/footer';
import Header from '@/app/components/layout/header';

import './globals.css';

const zonaPro = localFont({
  src: [
    {
      path: '../../public/fonts/ZonaPro-Regular.woff2',

      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ZonaPro-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/ZonaPro-SemiBold.woff2',
      weight: '600',
      style: 'bold',
    },
    {
      path: '../../public/fonts/ZonaPro-Black.woff2',
      weight: '900',
      style: 'black',
    },
  ],
  variable: '--font-zp',
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
  title: 'Citizen Web3 staking',
  description: 'Fast links to Citizen Web3 staking',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={`${zonaPro.variable} ${hisqaida.variable}`}>
    <head>
      <title>Stake with Citizen Web3 Validator. Our public goods, tools and infrastructure</title>
      <script defer data-domain="staking.citizenweb3.com" src="https://plausible.io/js/script.js"></script>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Stake with Citizen Web3 Validator. Our public goods, tools and infrastructure" />
      <meta property="og:description" content="Citizen Web3 - Non-Custodial, Self-Hosted, Bare-Metal Validator. Stake with us to earn rewards" />
      <meta property="og:image" content="https://staking.citizenweb3.com/cw3black.png" />
      <meta property="og:url" content="https://staking.citizenweb3.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Stake with Citizen Web3 Validator. Our public goods, tools and infrastructure" />
      <meta name="twitter:description" content="Citizen Web3 - Non-Custodial, Self-Hosted, Bare-Metal Validator. Stake with us to earn rewards" />
      <meta name="twitter:image" content="https://staking.citizenweb3.com/cw3black.png" />
      <meta name="twitter:url" content="https://https://staking.citizenweb3.com" />
    </head>
    <body className={`${zonaPro.className} scrollbar-track-scroll-bg scrollbar-thumb-scroll-item`}>
    <div className="flex min-h-screen w-full flex-col justify-between bg-black px-8 py-4 text-white">
      <Header />
      <main className="flex-1 pt-10">{children}</main>
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
