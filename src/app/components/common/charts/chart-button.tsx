import { FC, PropsWithChildren } from 'react';

interface OwnProps {
  onClick?: () => void;
  className?: string;
  contentClassName?: string;
  isActive?: boolean;
}

const Button: FC<PropsWithChildren<OwnProps>> = ({
  children,
  onClick,
  className = '',
  contentClassName = '',
  isActive = false,
}) => {
  const cn =
    (isActive ? `bg-button-bgHover text-black` : 'border-b border-solid border-b-white/40') +
    `${className} rounded-lg hover:bg-button-bgHover hover:text-black hover:border-b-0`;

  let content = <div className={`${contentClassName} active:pt-0.5`}>{children}</div>;

  return (
    <button onClick={onClick} className={cn}>
      {content}
    </button>
  );
};

export default Button;
