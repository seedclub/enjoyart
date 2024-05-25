'use client';
import React, { useState } from 'react';
import { chain } from '@/constants/chain';
import { parse } from 'uuid';
import { bytesToHex, createPublicClient, formatEther, http } from 'viem';
import claimCampaignAbi from '@/utils/claim-abi.json';
import toast from 'react-hot-toast';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

export default function Search() {
  const [address, setAddress] = useState('');
  const [claim, setClaim] = useState<any>(null);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);
  const uuid = 'f16b6742-4383-49a1-9eaa-8ec5ff89d94e';
  const ensClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  const publicClient = createPublicClient({
    chain,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL),
  });

  const handleShowEligible = async () => {
    const bytesArray = parse(uuid);
    const hexId = bytesToHex(bytesArray);
    let eligibilityAddress = address as `0x${string}`;
    try {
      if (address.includes('.eth')) {
        const ensAddress = await ensClient.getEnsAddress({
          name: normalize(address),
        });
        if (ensAddress) eligibilityAddress = ensAddress;
      }

      try {
        const claimed = await publicClient.readContract({
          abi: claimCampaignAbi.abi,
          address:
            '0xbc452fdc8f851d7c5b72e1fe74dfb63bb793d511' as `0x${string}`,
          functionName: 'claimed',
          args: [hexId, eligibilityAddress],
        });

        if (claimed) setHasClaimed(claimed as boolean);
      } catch (error) {
        console.log(error);
      }

      const response = await fetch(
        'https://hibxjljwpk.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage/proof',
        {
          method: 'POST',
          body: JSON.stringify({
            address: eligibilityAddress,
            uuid,
          }),
        }
      );

      const data = await response.json();
      setClaim(data);
    } catch (error) {
      console.log(error);
      toast.error('Check your ENS, enjoy');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!claim && (
        <div className="flex rounded-full shadow-light">
          <div className="text-accent py-2.5 pl-4 pr-2.5 text-xl">???</div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2.5 text-xl"
            placeholder="check for eligibility by searching an 0x address or ens"
          />
          <button
            disabled={address.length === 0}
            onClick={handleShowEligible}
            className="py-2.5 pl-4 pr-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
            >
              <path
                d="M5.90625 1.271V13.271M5.90625 1.271L1.21875 6.146M5.90625 1.271L10.7812 6.146"
                stroke="#AAAAAA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {claim && (
        <div className="flex flex-col rounded-3xl shadow-light">
          <div className="flex">
            {' '}
            <div className="text-accent py-2.5 pl-4 pr-2.5 text-xl">???</div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 text-xl"
              placeholder="check for eligibility by searching an address or ens"
            />
            <button onClick={() => setClaim(null)} className="py-2.5 pl-4 pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.9573 2.45698C13.3478 2.06646 13.3478 1.4333 12.9573 1.04277C12.5668 0.652247 11.9336 0.652247 11.5431 1.04277L7.00001 5.58582L2.45695 1.04277C2.06643 0.652247 1.43326 0.652247 1.04274 1.04277C0.652216 1.4333 0.652216 2.06646 1.04274 2.45698L5.58579 7.00004L1.04274 11.5431C0.652216 11.9336 0.652216 12.5668 1.04274 12.9573C1.43326 13.3478 2.06643 13.3478 2.45695 12.9573L7.00001 8.41425L11.5431 12.9573C11.9336 13.3478 12.5668 13.3478 12.9573 12.9573C13.3478 12.5668 13.3478 11.9336 12.9573 11.5431L8.41422 7.00004L12.9573 2.45698Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2.5 p-3 txt-sm">
            <div
              style={{
                boxShadow:
                  '2px 2px 4px 0px rgba(0, 199, 255, 0.25) inset, 0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset',
              }}
              className="flex justify-between p-2 rounded-full"
            >
              <div>
                {claim && claim.canClaim && !hasClaimed && (
                  <p className="text-[#00B633]">Unclaimed</p>
                )}

                {claim && claim.canClaim && hasClaimed && (
                  <p className="text-[#AAA]">Claimed</p>
                )}

                {!(claim && claim.canClaim) && (
                  <p className="text-[#AAA]">
                    Sorry, {'you’re'} not eligible for this airdrop
                  </p>
                )}
              </div>
              {claim?.amount ? (
                <p className="text-accent">
                  {formatEther(claim?.amount)} $ENJOY
                </p>
              ) : (
                <p className="text-accent">0</p>
              )}
            </div>
            <div className="flex justify-end"></div>
          </div>
        </div>
      )}
    </div>
  );
}
