import { chain } from '@/constants/chain';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export default createPublicClient({
  chain: chain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
