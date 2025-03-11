import { FC, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

const MdnCopyLink: FC<PropsWithChildren<{ title: string; text: string }>> = ({ title, text = '', children }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${title} was copied to clipboard`);
  };

  return (
    <span
      onClick={() => (text ? handleCopy(text) : null)}
      className="inline-block max-w-full overflow-hidden truncate align-bottom cursor-pointer text-primary hover:underline"
    >
      {children}
    </span>
  );
};
export default MdnCopyLink;
