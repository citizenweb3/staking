'use client';

import { usePathname, useRouter } from 'next/navigation';

const ResetFilters = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClickResetAll = () => {
    router.replace(pathname);
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onClickResetAll}
        className="rounded-md border border-white bg-black px-3 py-1.5 text-sm font-semibold capitalize text-white transition hover:border-black hover:bg-white hover:text-black active:border-white active:bg-black active:text-white"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ResetFilters;
