'use client';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import React, { useState, useEffect } from 'react';
import { chain } from '@/constants/chain';
import { createPublicClient, http, parseEther, formatEther } from 'viem';
import stakingAbi from '@/utils/staking-abi.json';
import toast from 'react-hot-toast';
import erc20 from '@/utils/erc20.json';
import { ethers } from 'ethers';
import useWalletClient from '@/hooks/useWallentClient';
import { numberWithCommas } from '@/utils/helpers';
import Button from './button';
import S from './text/s';
import XXXS from './text/xxxs';
import ExternalLink from './external-link';

export default function Farm() {
  const { login, user } = usePrivy();
  const [balance, setBalance] = useState<string>('');
  const [stakedBalance, setStakedBalance] = useState<string>('');
  const [allowance, setAllowance] = useState<string>('');
  const [earned, setEarned] = useState<string>('');
  const { wallets } = useWallets();
  const [action, setAction] = useState<string>('deposit');
  const address = user?.wallet?.address as `0x${string}`;
  const wallet = wallets.filter((wallet) => wallet?.address === address)[0];
  const MAX_UINT256 = ethers.MaxUint256.toString();
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const walletClient = useWalletClient({ chain, wallet });
  const publicClient = createPublicClient({
    chain,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL),
  });

  const handleBalance = async () => {
    if (!wallet?.address) return;

    const allowance = (await publicClient.readContract({
      address: '0x3a3F615b05AAD54d8A7Af1D1B20854f0513278Da' as `0x${string}`,
      abi: erc20.abi,
      functionName: 'allowance',
      args: [
        address as `0x${string}`,
        '0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8',
      ],
    })) as bigint;

    const balance = (await publicClient.readContract({
      address: '0x3a3F615b05AAD54d8A7Af1D1B20854f0513278Da' as `0x${string}`,
      abi: erc20.abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    })) as bigint;

    const stakedBalance = (await publicClient.readContract({
      address: '0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8' as `0x${string}`,
      abi: stakingAbi.abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    })) as bigint;

    const earned = (await publicClient.readContract({
      address: '0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8' as `0x${string}`,
      abi: stakingAbi.abi,
      functionName: 'earned',
      args: [address as `0x${string}`],
    })) as bigint;

    setEarned(formatEther(earned));
    setAllowance(formatEther(allowance));
    setBalance(formatEther(balance));
    setStakedBalance(formatEther(stakedBalance));
  };

  useEffect(() => {
    if (wallet) handleBalance();
  }, [wallet]);

  const handleApprove = async () => {
    setIsApproving(true);
    const client = await walletClient;
    const account = user?.wallet?.address as `0x${string}`;

    try {
      const { request: approval } = await publicClient.simulateContract({
        address: '0x3a3F615b05AAD54d8A7Af1D1B20854f0513278Da' as `0x${string}`,
        abi: erc20.abi,
        functionName: 'approve',
        args: [
          '0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8',
          BigInt(MAX_UINT256),
        ],
        account,
      });

      const hash = (await client?.writeContract(approval)) as `0x${string}`;

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      setIsApproving(false);
      toast.success('Approved, enjoy');
    } catch {
      toast.error('Approval failed, enjoy');
      setIsApproving(false);
    }
    handleBalance();
  };

  const handleFarm = async () => {
    setIsStaking(true);
    const client = await walletClient;
    const account = user?.wallet?.address as `0x${string}`;

    try {
      const { request } = await publicClient.simulateContract({
        address: stakingAbi.address as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'stake',
        args: [parseEther(balance as string)],
        account,
      });

      const hash = (await client?.writeContract(request)) as `0x${string}`;
      await publicClient.waitForTransactionReceipt({
        hash,
      });

      setBalance('0');
      setIsStaking(false);
      handleBalance();
      toast.success('Staked, enjoy');
    } catch {
      toast.error('Staking failed, enjoy');
      setIsStaking(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    const client = await walletClient;
    const account = user?.wallet?.address as `0x${string}`;

    try {
      const { request } = await publicClient.simulateContract({
        address: stakingAbi.address as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'withdraw',
        args: [parseEther(stakedBalance as string)],
        account,
      });

      const hash = (await client?.writeContract(request)) as `0x${string}`;

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      toast.success('Withdrawn, enjoy');
      setIsWithdrawing(false);
    } catch {
      toast.error('Approval failed, enjoy');
      setIsWithdrawing(false);
    }
    handleBalance();
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    const client = await walletClient;
    const account = user?.wallet?.address as `0x${string}`;

    try {
      const { request } = await publicClient.simulateContract({
        address: stakingAbi.address as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'getReward',
        account,
      });

      const hash = (await client?.writeContract(request)) as `0x${string}`;

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      toast.success('Claimed, enjoy');
      setIsClaiming(false);
    } catch {
      toast.error('Claim failed, enjoy');
      setIsClaiming(false);
    }
    handleBalance();
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full justify-between">
      {user && (
        <div className="flex flex-col gap-6">
          <div className="flex w-full">
            <button
              onClick={() => setAction('deposit')}
              className={`border rounded-full py-2 px-3 text-grey500 ${
                action === 'deposit' ? 'border-primary' : 'border-transparent'
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setAction('withdraw')}
              className={`text-grey500 border rounded-full py-2 px-3 ${
                action === 'withdraw' ? 'border-primary' : 'border-transparent'
              }`}
            >
              Withdraw
            </button>
            <button
              onClick={() => setAction('claim')}
              className={`text-grey500 border rounded-full py-2 px-3 ${
                action === 'claim' ? 'border-primary' : 'border-transparent'
              }`}
            >
              Claim Rewards
            </button>
          </div>

          {action === 'withdraw' && (
            <S>You can withdraw {numberWithCommas(stakedBalance)} LP tokens</S>
          )}

          {action === 'deposit' && (
            <S>You can stake {numberWithCommas(balance)} LP tokens</S>
          )}

          {action === 'claim' && (
            <S>You can claim {numberWithCommas(earned)} $Enjoy</S>
          )}
        </div>
      )}

      {!user ? (
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <S>Enjoyoor’s Liquidity Rewards Program</S>
              <div className="flex gap-1 items-center">
                <XXXS>
                  <span
                    style={{
                      boxShadow:
                        '2px 2px 4px 0px rgba(0, 199, 255, 0.25) inset, 0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset',
                    }}
                    className="text-primary py-0.5 px-2 bg-[#E6F9FF]"
                  >
                    MARCH 6
                  </span>
                </XXXS>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                >
                  <path
                    d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5H13V3.5H1V4.5Z"
                    fill="#03C7FF"
                  />
                </svg>
                <XXXS>
                  <span
                    style={{
                      boxShadow:
                        '2px 2px 4px 0px rgba(0, 199, 255, 0.25) inset, 0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset',
                    }}
                    className="text-primary py-0.5 px-2 bg-[#E6F9FF]"
                  >
                    SEPTEMBER 6
                  </span>
                </XXXS>
              </div>
            </div>
            <S>
              10% of the total supply will be distributed to LP providers
              through this rewards program.
            </S>
            <S>
              To participate, first provide liquidity at 
              <span className="text-primary">univ2.zora.energy</span> then
              connect & stake your LP tokens here.
            </S>
            <ExternalLink
              href="https://univ2.zora.energy/#/swap"
              text="univ2.zora.energy"
            />
          </div>
          <Button onClick={login}>Connect</Button>
        </div>
      ) : (
        <>
          {action === 'deposit' && (
            <>
              {Number(allowance) < Number(balance) ? (
                <Button onClick={handleApprove} disabled={isApproving}>
                  {isApproving ? 'Approving...' : 'Approve'}
                </Button>
              ) : (
                <Button
                  onClick={handleFarm}
                  disabled={isStaking || Number(balance) === 0}
                >
                  {isStaking ? 'Staking...' : 'Stake'}
                </Button>
              )}
            </>
          )}

          {action === 'withdraw' && (
            <Button
              onClick={handleWithdraw}
              disabled={isWithdrawing || Number(stakedBalance) === 0}
            >
              {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
            </Button>
          )}

          {action === 'claim' && (
            <Button
              disabled={isClaiming || Number(earned) === 0}
              onClick={handleClaim}
            >
              {isClaiming ? 'Claiming...' : `Claim Rewards`}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
