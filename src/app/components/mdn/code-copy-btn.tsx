'use client';

import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

import Button from '@/app/components/common/button';

import CopyIcon from '../../../../public/img/icons/copy.svg';

const CodeCopyBtn: FC<PropsWithChildren> = ({ children }) => {
  const handleClick = () => {
    // @ts-ignore
    navigator.clipboard.writeText(children.props.children);
    toast.success('Copied');
  };
  return (
    <div className="opacity-10 transition-opacity duration-150 group-hover:opacity-100">
      <Button onClick={handleClick}>
        <Image src={CopyIcon} alt="copy" className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CodeCopyBtn;
