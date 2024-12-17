import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

type TVariants = 'filled' | 'bordered';

const variantClasses: { [key in TVariants]: string } = {
  filled: 'bg-button-bg hover:bg-button-bgHover',
  bordered: 'border border-button-border',
};

interface OwnProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: TVariants;
  pulse?: boolean;
  external?: boolean;
}
const Button: FC<PropsWithChildren<OwnProps>> = ({
  children,
  onClick,
  type = 'button',
  variant = 'filled',
  pulse = false,
  external = false,
}) => {
  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${pulse ? 'animate-pulse' : ''} relative cursor-pointer rounded-md px-8 py-2 uppercase text-white transition-all duration-150 hover:scale-105`}
      onClick={onClick}
    >
      {external && (
        <Image
          src={'/img/icons/external-arrow.svg'}
          alt="external icon"
          width={6}
          height={7.5}
          className="absolute right-1.5 top-1.5 h-auto w-2"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
