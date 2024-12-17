import { FC, PropsWithChildren } from 'react';

const MdnLink: FC<PropsWithChildren<{ href: string }>> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-block max-w-full overflow-hidden truncate align-bottom"
  >
    {children}
  </a>
);

export default MdnLink;
