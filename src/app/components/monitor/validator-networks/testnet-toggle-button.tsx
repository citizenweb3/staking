'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import Button from '@/app/components/common/button';

const TestnetToggleButton: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showTestnets = searchParams.get('testnets') === 'true';

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (showTestnets) {
      params.delete('testnets');
    } else {
      params.set('testnets', 'true');
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  };

  return (
    <Button onClick={handleToggle} variant="bordered">
      {showTestnets ? 'Hide Others' : 'Show Others'}
    </Button>
  );
};

export default TestnetToggleButton;
