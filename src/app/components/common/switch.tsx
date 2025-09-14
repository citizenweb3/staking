'use client';

import { FC } from 'react';

interface OwnProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const Switch: FC<OwnProps> = ({ checked, onChange, className = '', disabled, ariaLabel }) => {
  const next = !checked;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? (checked ? 'On' : 'Off')}
      disabled={disabled}
      onClick={() => !disabled && onChange(next)}
      className={`${className} relative mx-1 h-7 w-14 cursor-pointer rounded-md bg-gradient-to-b from-[#4a4a4a] to-[#3f3f3f] ring-inset transition focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60`}
    >
      <span
        className={`absolute inset-y-0 mx-1 my-auto h-[1.2rem] w-[1.2rem] rounded-md border border-[#3f3f3f] bg-white px-2 transition-all duration-200 
        ${checked ? 'right-[0.1rem]' : 'left-[0.1rem]'}`}
      />
    </button>
  );
};

export default Switch;
