'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const items = [
  { href: '#validator', label: 'Validator' },
  { href: '#validator-info', label: 'Validator Info' },
  { href: '#podcast', label: 'Podcast' },
  { href: '#w3s', label: 'W3S' },
  { href: '#bvs', label: 'B.V.S.' },
  { href: '#bazaar', label: 'Bazaar' },
  { href: '#about', label: 'About Us' },
  { href: '#contacts', label: 'Contacts' },
];

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute z-50 my-4 ml-16 flex flex-row">
      <div className="flex min-w-40 items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-strip"
          className={`hover:bg-button-mainGray font-inter flex min-w-40 flex-row items-center rounded-2xl px-10 py-2 text-lg font-bold
            ${open ? 'bg-button-mainGray font-medium' : 'bg-paper'}`}
        >
          <Image src={'/icons/nav-bar-button.svg'} alt={'nav-bar'} height={30} width={30} className="h-6 w-6" />
          <div className="mx-2">Menu</div>
        </button>

        {open && (
          <nav id="menu-strip" className="rounded-2xl">
            <ul className="flex items-center gap-3">
              {items.map((it) => (
                <li key={it.href} className="flex-none">
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-button-mainGray font-inter inline-flex min-w-40 items-center justify-center whitespace-nowrap rounded-2xl bg-paper py-2  text-base"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
