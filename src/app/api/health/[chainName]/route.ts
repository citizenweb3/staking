import { NextResponse } from 'next/server';

import { getChain } from '@/app/actions/repos';

export async function GET(req: Request, ctx: any) {
  const { params } = ctx;
  const chain = await getChain(params.chainName);
  try {
    return NextResponse.json({
      status: chain
        ? ((await fetch(`${chain.endpoints.rpc}/status`, { next: { revalidate: 0 } })
            .then((data) => data.json())
            .then((result) => {
              return (
                !result.result.sync_info.catching_up &&
                Date.now() - Date.parse(result.result.sync_info.latest_block_time) <= 50000
              );
            })) as boolean)
        : NextResponse.json({ status: false }),
    });
  } catch {
    return NextResponse.json({ status: false });
  }
}
