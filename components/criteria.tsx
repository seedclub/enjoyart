'use client';
import React, { useEffect, useState } from 'react';
import { getUserTotals, getUserRs } from '@/utils/rockset';
import { usePrivy } from '@privy-io/react-auth';
import XL from './text/xl';
import XS from './text/xs';
import LG from './text/lg';
import S from './text/s';
import { toHumanReadable } from '@/utils/helpers';

export default function Criteria() {
  const { user } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;
  const [isLoading, setIsLoading] = useState(false);
  const [holder, setHolder] = useState<any>(null);
  const [tips, setTips] = useState<any>(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const holder = await getUserRs(address);
      const tips = await getUserTotals(address);
      setTips(tips);
      const ensName = holder?.ens;
      if (ensName !== '') {
        setFormattedAddress(ensName);
      } else {
        setFormattedAddress(formatAddress(address));
      }
      setHolder(holder);
      setIsLoading(false);
    }
    if (address) fetchData().catch(console.error);
  }, [address]);

  if (isLoading && !holder && !tips) {
    return <S>Enjoying ...</S>;
  }

  return (
    <div className="flex flex-col justify-between gap-6 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full h-9 w-9"
            src={`https://zora.co/api/avatar/${address}?size=36`}
            alt="avatar"
          />
          <XL>{formattedAddress}</XL>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <XS>
              <span className="text-primary">Unclaimed $Enjoy Rewards*</span>
            </XS>
            <LG>{toHumanReadable(tips?.received)}</LG>
          </div>
          <div>
            <XS>
              <span className="text-primary">Total $Enjoy Distributed</span>
            </XS>
            <LG>{toHumanReadable(tips?.distributed)}</LG>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <XS>
            <span className="text-primary">*Creator Rewards</span>
          </XS>
          <XS>{toHumanReadable(tips?.creator_rewards)}</XS>
        </div>
        <div className="flex justify-between">
          <XS>
            <span className="text-primary">*Curator Rewards</span>
          </XS>
          <XS>{toHumanReadable(tips?.curator_rewards)}</XS>
        </div>
        <div className="flex justify-between">
          <XS>
            <span className="text-primary">*Tipper Rewards</span>
          </XS>
          <XS>{toHumanReadable(tips?.tipper_rewards)}</XS>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* <XS>
          <span className="text-primary">Claim coming soon</span>
        </XS> */}
        <button
          disabled={true}
          className="text-[#D8D8D8] bg-[#F6F6F6]  text-xl tracking-4 justify-center items-center px-9 h-14 rounded-2xl gap-2"
        >
          Claim Coming Soon
        </button>
      </div>
    </div>
  );
}
