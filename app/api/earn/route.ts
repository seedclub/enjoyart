import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import {
  createPublicClient,
  encodeFunctionData,
  formatEther,
  http,
  parseEther,
  parseGwei,
} from 'viem';
import { zora } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import Swap from '@/utils/swap.json';
import { chain } from '@/constants/chain';

const publicClient = createPublicClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const abi = Swap.abi;
  const to = Swap.address as `0x${string}`;
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const ethAddress = '0x4200000000000000000000000000000000000006';
  const enjoyAddress = '0xa6b280b42cb0b7c4a4f789ec6ccc3a7609a1bc39';
  const path = [ethAddress, enjoyAddress] as const;
  const ethAmount = '0.001';
  const value = parseEther(ethAmount).toString();

  const result = (await publicClient.readContract({
    abi,
    address: to,
    functionName: 'getAmountsOut',
    args: [BigInt(value), path],
  })) as string[];

  const resultEth = result[1] as any;
  const formattedEther = formatEther(resultEth);

  const amountOut = formattedEther.split('.')[0];

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const userAddress = message.interactor.verified_accounts[0];

  const data = encodeFunctionData({
    abi,
    functionName: 'swapETHForExactTokens',
    args: [Number(resultEth), path, userAddress, deadline],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${zora.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to,
      value,
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
