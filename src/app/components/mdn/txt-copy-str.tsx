'use client';

import React, { FC } from 'react';
import { toast } from 'react-toastify';

interface Props {
  title: string;
  value: string;
}

const TxtCopyStr: FC<Props> = ({ title, value }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(value);
    toast.success('Copied');
  };
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="text-xs uppercase">{title}: </div>
      <div className="cursor-copy text-nowrap text-base text-primary hover:font-semibold" onClick={() => handleClick()}>
        {value}
      </div>
    </div>
  );
};

export default TxtCopyStr;
