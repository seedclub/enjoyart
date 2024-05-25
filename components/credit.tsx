'use client';
import { usePrivy } from '@privy-io/react-auth';
import React, { useEffect, useState } from 'react';
import Button from './button';
import { toHumanReadable } from '@/utils/helpers';
import { createPublicClient, formatEther, http } from 'viem';
import erc20 from '@/utils/erc20.json';
import { zora } from 'viem/chains';
import { getUserRs, getTipsRs } from '@/utils/rockset';
import S from './text/s';
import LG from './text/lg';
import XS from './text/xs';
import XL from './text/xl';
import XXXS from './text/xxxs';

export const zoraClient = createPublicClient({
  chain: zora,
  transport: http('https://rpc.zora.energy'),
});

export default function Credit() {
  const { login, user, logout } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;
  const [holder, setHolder] = useState<any>(null);
  const [tips, setTips] = useState<any>(null);
  const [isQualified, setIsQualified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState('');
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const holder = await getUserRs(address);
      const tips = await getTipsRs(address);
      const ensName = holder?.ens;
      if (ensName !== '') {
        setFormattedAddress(ensName);
      } else {
        setFormattedAddress(formatAddress(address));
      }
      setHolder(holder);
      setTips(tips);
      setIsQualified((holder?.balance || 0) >= 500000);
      if (!holder) {
        const balance = await zoraClient.readContract({
          address: '0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39',
          abi: erc20.abi,
          functionName: 'balanceOf',
          args: [address],
        });
        const formattedBalance = parseInt(formatEther(balance as bigint));
        setIsQualified(formattedBalance >= 500000);
      }
      setIsLoading(false);
    }
    if (address) fetchData().catch(console.error);
  }, [address]);

  const creationHeatmapCount = holder?.weeks_with_collectors_in_last_52 || 0;
  const collectStreakCount = holder?.collect_streak_unique_mints || 0;
  const uniqueMintsCount = holder?.unique_mints || 0;
  const uniqueCollectorsCount = holder?.unique_collectors || 0;

  if (isLoading) return <S>Enjoying ...</S>;

  console.log('holder', holder);

  return (
    <div className="flex flex-col gap-6 h-full">
      {user && (
        <div className="flex items-center gap-2">
          <img
            className="rounded-full h-9 w-9"
            src={`https://zora.co/api/avatar/${address}?size=36`}
            alt="avatar"
          />
          <XL>{formattedAddress}</XL>
        </div>
      )}

      {!user ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <S>
              <span className="text-primary">!!! Airdrop 2</span> will be
              distributed via community through{' '}
              <span className="text-primary">mint comment tipping</span> on
              Zora.
            </S>
            <S>
              To participate, connect an account holding at least 500,000{' '}
              <span className="text-primary">$Enjoy</span> and check your weekly
              tip allowance. The more active you are onchain, the higher your
              allowance will be.
            </S>
            <S>
              If you’ve recently purchased{' '}
              <span className="text-primary">$Enjoy</span>, your Weekly tip
              allowance will become available on the following Sunday at 11pm
              EST
            </S>
          </div>
          <Button onClick={login}>$Enjoy Distribution Rewards</Button>
        </div>
      ) : isQualified && holder ? (
        <div className="flex flex-col h-full gap-6">
          <div className="flex justify-between items-center">
            <div>
              <XXXS>ENJOY.TECH</XXXS>
              <XXXS>
                <span className="uppercase">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </XXXS>
            </div>
            <img src="/logo.png" alt="Enjoyoor" className="w-20 h-20" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <XS>
                <span className="text-primary">OE Rank</span>
              </XS>
              <LG>#{holder?.rank || 0}</LG>
            </div>
            <div>
              <XS>
                <span className="text-primary">Available Tipping Balance</span>
              </XS>
              <div className="flex items-baseline gap-1">
                <LG>
                  {tips?.tips_given
                    ? toHumanReadable(holder.allowance - tips?.tips_given)
                    : toHumanReadable(holder.allowance)}
                </LG>
                <XS>/{toHumanReadable(holder.allowance)}</XS>
                <XS>$Enjoy</XS>
              </div>
              {holder?.boosted && (
                <div className="flex pt-1 gap-1">
                  <span className="bg-[#E6F9FF] shadow-inner2 rounded-2xl py-0.5 px-2">
                    <XXXS>
                      <span className="text-primary">3X GIGAMULTIPLIER</span>
                    </XXXS>
                  </span>
                  <span className="bg-[#E6F9FF] shadow-inner2 rounded-2xl py-0.5 px-2">
                    <XXXS>
                      <span className="text-primary">{`/CRYPTOART`}</span>
                    </XXXS>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <XS>
                <span className="text-primary">Creation Streak</span>
              </XS>
              <XS>{creationHeatmapCount} Weeks</XS>
            </div>
            <div className="flex justify-between">
              <XS>
                <span className="text-primary">Collect Streak</span>
              </XS>
              <XS>{collectStreakCount} Weeks</XS>
            </div>
            <div className="flex justify-between">
              <XS>
                <span className="text-primary">Unique Mints</span>
              </XS>
              <XS>{uniqueMintsCount}</XS>
            </div>
            <div className="flex justify-between">
              <XS>
                <span className="text-primary">Unique Collectors</span>
              </XS>
              <XS>{uniqueCollectorsCount}</XS>
            </div>
          </div>
          <XXXS>*Scores are calculated on Sunday 11pm EST</XXXS>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <XS>
                <span className="text-primary">Balance</span>
                <div className="flex gap-1 items-baseline">
                  <LG>{toHumanReadable(holder?.balance || 0)}</LG>
                  <XS>$Enjoy</XS>
                </div>
              </XS>
            </div>
            <S>
              Sorry, you’ll need a minimum of{' '}
              <span className="text-primary">500k $Enjoy</span>.
            </S>
            <S>
              If you’ve recently purchased{' '}
              <span className="text-primary">$Enjoy</span>, your Weekly tip
              allowance will become available on the following Sunday at 11pm
              EST
            </S>
          </div>
          <Button onClick={logout}>Disconnect</Button>
        </div>
      )}
    </div>
  );
}
