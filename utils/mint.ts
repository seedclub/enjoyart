import { createWalletClient, http, createPublicClient, Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { zora } from 'viem/chains';
import contractAbi from './contract.json';
const contractAddress = process.env.CONTRACT_ADDRESS as `0x`;

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}` as Hex);

export const publicClient = createPublicClient({
  chain: zora,
  transport: http('https://rpc.zora.energy'),
});

const walletClient = createWalletClient({
  account,
  chain: zora,
  transport: http('https://rpc.zora.energy'),
});

export async function mintNft(toAddress: string, id: number = 1) {
  console.log('mintNft', toAddress, id);
  try {
    const { request }: any = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'mint',
      args: [toAddress, id, 1, `0x`],
    });
    const transaction = await walletClient.writeContract(request);
    return transaction;
  } catch (error) {
    console.log(error);
    return 'Already minted';
  }
}

export async function balanceOf(address: string) {
  try {
    const balanceData = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'balanceOf',
      args: [address as `0x`, 0],
    });
    const balance: number = Number(balanceData);
    return balance;
  } catch (error) {
    console.log(error);
    return error;
  }
}
