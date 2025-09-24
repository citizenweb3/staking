import Image from 'next/image';

import NavigationBar from '@/app/components/layout/navigation-bar';

const Header = () => (
  <div className="relative h-[40vh] md:h-[60vh] lg:h-[120vh]">
    <Image src="/img/header.svg" alt="Citizen Web 3" fill priority className="object-cover object-center" />
    <div className="absolute mt-4 ml-4">
      <NavigationBar />
    </div>
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-[65%] w-full -translate-x-1/2 -translate-y-1/2">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="font-inter text-2xl font-semibold text-white/70">
            Citizen Web3: Non Custodial, Privacy Focused, Self‑Hosted Validator
          </h1>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
