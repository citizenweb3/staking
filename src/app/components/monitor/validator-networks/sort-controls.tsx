'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface OnwProps {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  dir: SortDir;
  className?: string;
}

type SortKey = 'network' | 'totalSecure' | 'totalDelegators';
type SortDir = 'asc' | 'desc';

function nextDir(active: boolean, dir: SortDir) {
  return active ? (dir === 'asc' ? 'desc' : 'asc') : 'asc';
}

const SortControls: FC<OnwProps> = ({ label, sortKey, currentKey, dir, className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const active = currentKey === sortKey;
  const newDir = nextDir(active, dir);

  const onClick = () => {
    const params = new URLSearchParams(sp.toString());
    params.set('sort', sortKey);
    params.set('dir', newDir);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={className} onClick={onClick}>
      {label} {active ? (dir === 'asc' ? '▲' : '▼') : '⇵'}
    </div>
  );
};

export default SortControls;
