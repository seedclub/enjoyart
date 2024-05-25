'use client';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import React, { useState } from 'react';
import { chain } from '@/constants/chain';
import useWalletClient from '@/hooks/useWallentClient';
import { parse } from 'uuid';
import { bytesToHex, createPublicClient, formatEther, http } from 'viem';
import claimCampaignAbi from '@/utils/claim-abi.json';
import toast from 'react-hot-toast';
import { numberWithCommas } from '@/utils/helpers';

export default function Claim() {
  const { login, user, logout } = usePrivy();
  const [claim, setClaim] = useState<any>(null);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);
  const { wallets } = useWallets();
  const address = user?.wallet?.address as `0x${string}`;
  const wallet = wallets.filter((wallet) => wallet?.address === address)[0];
  const walletClient = useWalletClient({ chain, wallet });
  const uuid = 'f16b6742-4383-49a1-9eaa-8ec5ff89d94e';
  const publicClient = createPublicClient({
    chain,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL),
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const checkEligibility = async () => {
    setIsChecking(true);
    const address = user?.wallet?.address as `0x${string}`;
    const bytesArray = parse(uuid);
    const hexId = bytesToHex(bytesArray);

    try {
      const claimed = await publicClient.readContract({
        abi: claimCampaignAbi.abi,
        address: '0xbc452fdc8f851d7c5b72e1fe74dfb63bb793d511' as `0x${string}`,
        functionName: 'claimed',
        args: [hexId, address],
      });

      if (claimed) setHasClaimed(claimed as boolean);
    } catch {}

    try {
      const response = await fetch(
        'https://hibxjljwpk.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage/proof',
        {
          method: 'POST',
          body: JSON.stringify({
            address,
            uuid,
          }),
        }
      );

      const data = await response.json();
      setClaim(data);
      setIsChecking(false);
    } catch {
      toast.error('Check your ENS, enjoy');
      setIsChecking(false);
    }
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    const bytesArray = parse(uuid);
    const hexId = bytesToHex(bytesArray);
    const client = await walletClient;
    const proof = claim.proof;
    const amount = claim.amount;
    const address = wallet?.address as `0x${string}`;

    const abi = claimCampaignAbi.abi;

    const claimTokens = {
      abi,
      address: '0xbc452fdc8f851d7c5b72e1fe74dfb63bb793d511' as `0x${string}`,
      functionName: 'claimTokens',
      args: [hexId, proof, amount],
      account: address,
      chain,
    };

    try {
      const hash = (await client?.writeContract(claimTokens)) as `0x${string}`;

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      toast.success('Claimed, enjoy');
      setHasClaimed(false);
    } catch {
      toast.error('Error claiming, enjoy');
      setHasClaimed(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      {!user && (
        <button
          onClick={login}
          className="bg-accent text-white py-4 rounded-full shadow-light text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
        >
          Connect to claim
        </button>
      )}

      {user && !claim && (
        <div className="flex flex-col gap-3 txt-sm">
          <p>
            Connected wallet:{' '}
            {user.wallet?.address.slice(0, 6) +
              '...' +
              user.wallet?.address.slice(-4)}
          </p>
          <p
            style={{
              fontSize: '48px',
            }}
          >
            You may be eligible for $ENJOY
          </p>
          <button
            disabled={isChecking}
            onClick={checkEligibility}
            className="bg-accent text-white py-4 rounded-full shadow-light text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            {isChecking ? 'Checking...' : 'Check eligibility'}
          </button>
        </div>
      )}

      {user && claim && !claim.canClaim && (
        <div className="flex flex-col gap-3 txt-sm">
          <p>
            Connected wallet:{' '}
            {user.wallet?.address.slice(0, 6) +
              '...' +
              user.wallet?.address.slice(-4)}
          </p>
          <p
            style={{
              fontSize: '48px',
            }}
          >
            Not eligible for !!! Airdrop 1
          </p>
          <button
            onClick={logout}
            className="bg-accent text-white py-4 rounded-full shadow-light text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            Disconnect
          </button>
        </div>
      )}

      {user && claim && claim.canClaim && hasClaimed && (
        <div className="flex flex-col gap-3 txt-sm">
          <p>
            Connected wallet:{' '}
            {user.wallet?.address.slice(0, 6) +
              '...' +
              user.wallet?.address.slice(-4)}
          </p>
          <p
            style={{
              fontSize: '48px',
            }}
          >
            You claimed{' '}
            <span className="text-accent">
              {numberWithCommas(formatEther(claim?.amount))} $ENJOY
            </span>
          </p>
          <button
            onClick={logout}
            className="bg-accent text-white py-4 rounded-full shadow-light text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            Disconnect
          </button>
        </div>
      )}

      {user && claim && claim.canClaim && !hasClaimed && (
        <div className="flex flex-col gap-3 txt-sm">
          <p>
            Connected wallet:{' '}
            {user.wallet?.address.slice(0, 6) +
              '...' +
              user.wallet?.address.slice(-4)}
          </p>
          <p
            style={{
              fontSize: '48px',
            }}
          >
            {`You’re`} eligible for{' '}
            <span className="text-accent">
              {formatEther(claim?.amount)} $ENJOY
            </span>
          </p>
          <button
            disabled={isClaiming}
            onClick={handleClaim}
            className="bg-accent text-white py-4 rounded-full shadow-light text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            {isClaiming ? 'Claiming...' : 'Claim $ENJOY Tokens'}
          </button>
        </div>
      )}
    </div>
  );
}
