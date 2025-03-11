import { FC } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import MdnLink from '@/app/components/mdn/mdn-link';
import MdnCopyLink from '@/app/components/mdn/mdn-copy-link';
import Pre from '@/app/components/mdn/pre';

interface OwnProps {
  content: string;
}

const Mdn: FC<OwnProps> = ({ content }) => {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // @ts-ignore
        pre: Pre,
        // @ts-ignore
        a: MdnLink,
        // @ts-ignore
        span: MdnCopyLink,
      }}
    >
      {content}
    </Markdown>
  );
};

export default Mdn;
