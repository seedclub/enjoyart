'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export default function Disconnect({ children, onClick, disabled }: any) {
  const { user, logout } = usePrivy();
  const address = user?.wallet?.address;
  const formattedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';
  const [showDisconnect, setShowDisconnect] = useState(false);

  if (showDisconnect) {
    return (
      <div className="absolute top-0 right-0 flex flex-col w-52">
        <button
          onClick={() => setShowDisconnect(false)}
          className={`flex text-accent bg-[#E6F9FF] text-xl tracking-4 justify-center items-center py-4 px-9 rounded-t-2xl gap-2 h-12 shadow-inner2 hover:bg-[#B1EEFF] transition-all duration-300 ease-in-out w-full`}
        >
          <div className="flex gap-1 items-center">
            <img
              className="rounded-full h-6 w-6"
              src={`https://zora.co/api/avatar/${address}?size=36`}
              alt="avatar"
            />
            <div>{formattedAddress}</div>
          </div>
        </button>
        <button
          onClick={logout}
          className={`flex text-accent bg-[#E6F9FF] text-xl tracking-4 justify-center items-center py-4 px-9 rounded-b-2xl gap-2 h-12 shadow-inner2 hover:bg-[#B1EEFF] transition-all duration-300 ease-in-out w-full`}
        >
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.80961 0.600098C1.51174 0.600098 0.45961 1.65223 0.45961 2.9501V4.5501C0.45961 4.96431 0.795396 5.3001 1.20961 5.3001C1.62382 5.3001 1.95961 4.96431 1.95961 4.5501V2.9501C1.95961 2.48066 2.34017 2.1001 2.80961 2.1001H4.40961C4.82382 2.1001 5.15961 1.76431 5.15961 1.3501C5.15961 0.935884 4.82382 0.600098 4.40961 0.600098H2.80961ZM16.7596 2.9501C16.7596 1.65223 15.7075 0.600098 14.4096 0.600098H12.8096C12.3954 0.600098 12.0596 0.935884 12.0596 1.3501C12.0596 1.76431 12.3954 2.1001 12.8096 2.1001H14.4096C14.8791 2.1001 15.2596 2.48066 15.2596 2.9501V4.5501C15.2596 4.96431 15.5954 5.3001 16.0096 5.3001C16.4238 5.3001 16.7596 4.96431 16.7596 4.5501V2.9501ZM0.459634 14.5501C0.459634 15.848 1.51177 16.9001 2.80964 16.9001H4.40963C4.82385 16.9001 5.15963 16.5643 5.15963 16.1501C5.15963 15.7359 4.82385 15.4001 4.40963 15.4001H2.80964C2.34019 15.4001 1.95963 15.0195 1.95963 14.5501V12.9501C1.95963 12.5359 1.62385 12.2001 1.20963 12.2001C0.795421 12.2001 0.459634 12.5359 0.459634 12.9501V14.5501ZM14.4096 16.9001C15.7075 16.9001 16.7596 15.848 16.7596 14.5501V12.9501C16.7596 12.5359 16.4238 12.2001 16.0096 12.2001C15.5954 12.2001 15.2596 12.5359 15.2596 12.9501V14.5501C15.2596 15.0195 14.8791 15.4001 14.4096 15.4001H12.8096C12.3954 15.4001 12.0596 15.7359 12.0596 16.1501C12.0596 16.5643 12.3954 16.9001 12.8096 16.9001H14.4096ZM11.7424 5.46977C12.0353 5.76266 12.0353 6.23753 11.7424 6.53043L9.67149 8.60132L11.7424 10.6722C12.0353 10.9651 12.0353 11.44 11.7424 11.7329C11.4495 12.0258 10.9746 12.0258 10.6817 11.7329L8.61083 9.66198L6.53993 11.7329C6.24704 12.0258 5.77216 12.0258 5.47927 11.7329C5.18638 11.44 5.18638 10.9651 5.47927 10.6722L7.55017 8.60132L5.47928 6.53043C5.18639 6.23753 5.18639 5.76266 5.47928 5.46977C5.77217 5.17687 6.24705 5.17687 6.53994 5.46977L8.61083 7.54066L10.6817 5.46977C10.9746 5.17687 11.4495 5.17687 11.7424 5.46977Z"
                fill="#03C7FF"
              />
            </svg>
            <div>Sign Out</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={() => setShowDisconnect(true)}
      className={`flex text-accent bg-[#E6F9FF] text-xl tracking-4 justify-center items-center py-4 px-9 rounded-2xl gap-2 h-12 shadow-inner2 hover:bg-[#B1EEFF] transition-all duration-300 ease-in-out w-full`}
    >
      <div className="flex gap-1 items-center">
        <img
          className="rounded-full h-6 w-6"
          src={`https://zora.co/api/avatar/${address}?size=36`}
          alt="avatar"
        />
        <div>{formattedAddress}</div>
      </div>
    </button>
  );
}
