import { FC, PropsWithChildren } from 'react';

import CodeCopyBtn from '@/app/components/mdn/code-copy-btn';

const Pre: FC<PropsWithChildren> = ({ children }) => (
  <pre className="group relative">
    <div className="absolute right-5 top-2 ">
      <CodeCopyBtn>{children}</CodeCopyBtn>
    </div>
    <div className="overflow-auto bg-transparent p-4 scrollbar-thin">{children}</div>
  </pre>
);

export default Pre;
