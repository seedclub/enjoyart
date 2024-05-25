'use client';
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from './button';
import { usePathname } from 'next/navigation';
import S from './text/s';
import Disconnect from './dsiconnect';

export default function Header() {
  const { login, user, logout } = usePrivy();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const [hoverCopy, setHoverCopy] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText('0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39');
    toast.success('Address copied to clipboard');
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-3 lg:p-6 gap-4 w-full">
        <div className="flex">
          <Link href="/">
            <Image
              alt="logo"
              className="rounded-full hidden md:flex mx-auto"
              src="/logo.png"
              height={50}
              width={50}
            />
            <Image
              alt="logo"
              className="rounded-full md:hidden mx-auto"
              src="/logo.png"
              height={74}
              width={74}
            />
          </Link>
          <div className="flex">
            <Link
              href="/"
              className="hidden md:flex text-grey500 text-xl justify-center items-center p-3 tracking-4 rounded-2xl hover:bg-[#F6F6F6] transition-all duration-300 ease-in-out"
            >
              <span className={pathname === '/' ? 'text-black' : ''}>
                Trade & Tipping Dashboard
              </span>
            </Link>
            <Link
              href="/enjoyanomics"
              className="hidden md:flex text-grey500 text-xl justify-center items-center p-3 tracking-4 rounded-2xl hover:bg-[#F6F6F6] transition-all duration-300 ease-in"
            >
              <span
                className={pathname === '/enjoyanomics' ? 'text-black' : ''}
              >
                Enjoyanomics
              </span>
            </Link>
          </div>
        </div>
        <div className={`flex gap-0 w-full lg:w-fit`}>
          <div
            onClick={copyAddress}
            onMouseEnter={() => setHoverCopy(true)}
            onMouseLeave={() => setHoverCopy(false)}
            className="hidden md:flex gap-2 px-3 hover:bg-[#F6F6F6] rounded-2xl transition-all duration-300 ease-in-out items-center py-0.5 max-h-14 cursor-pointer"
          >
            <span className="hidden md:flex text-accent text-xl justify-center items-center px-0 tracking-4">
              $Enjoy
            </span>
            <span className="hidden md:flex text-grey500 text-xl justify-center items-center px-0 tracking-4 cursor-pointer">
              0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              className={`transition-all ease-in-out duration-200 ${
                hoverCopy ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41529 0.748047H3.66529V1.49805V3.39063H5.16529V2.24805H10.9963V8.08367H10.0772V9.58367H11.7463H12.4963V8.83367V1.49805V0.748047H11.7463H4.41529ZM0.75 4.41602H0V5.16602V12.5016V13.2516H0.75H8.08105H8.83105V12.5016V5.16602V4.41602H8.08105H0.75ZM1.5 11.7516V5.91602H7.33105V11.7516H1.5Z"
                fill="#808080"
              />
            </svg>
          </div>
          <div className="lg:w-52 w-full relative">
            {user ? <Disconnect /> : <Button onClick={login}>Connect</Button>}
          </div>
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="flex md:hidden  bg-white justify-center items-center p-2 rounded-full px-4 gap-2 h-14 tracking-96 hover:scale-105 transition-transform duration-100 ease-in-out"
        >
          <S>Menu</S>
        </button>
        <div
          className={`fixed lg:hidden top-0 bottom-0 right-0 left-0 z-50 w-screen ${
            showMenu
              ? 'bg-opacity-20 pt-20'
              : 'bg-opacity-0 pointer-events-none top-20 p-0'
          } bg-black flex flex-col justify-end `}
        >
          <div
            className={`bg-white flex flex-col gap-6  rounded-t-3xl overflow-scroll ${
              showMenu ? 'h-full py-6 px-3' : 'h-0 py-0 px-0 relative top-80'
            } transition-all duration-300 ease-in`}
          >
            <div className="flex justify-between p-3 pl-0 items-center">
              <div className="flex gap-2 items-center">
                <Image src="/logo.png" alt="logo" width={50} height={50} />
                <div className="text-2xl">enjoy.tech</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                onClick={() => setShowMenu(false)}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7072 2.08748C13.0977 1.69695 13.0977 1.06379 12.7072 0.673264C12.3167 0.28274 11.6835 0.28274 11.293 0.673264L6.74992 5.21632L2.20686 0.673264C1.81634 0.28274 1.18317 0.28274 0.792649 0.673264C0.402125 1.06379 0.402125 1.69695 0.792649 2.08748L5.3357 6.63053L0.792649 11.1736C0.402125 11.5641 0.402125 12.1973 0.792649 12.5878C1.18317 12.9783 1.81634 12.9783 2.20686 12.5878L6.74992 8.04474L11.293 12.5878C11.6835 12.9783 12.3167 12.9783 12.7072 12.5878C13.0977 12.1973 13.0977 11.5641 12.7072 11.1736L8.16413 6.63053L12.7072 2.08748Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-2xl text-primary">$Enjoy</div>
              <div className="rounded-xl bg-[#F6F6F6] p-3 flex justify-between items-center">
                <div>0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  onClick={copyAddress}
                  className="cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.16895 0.748047H4.41895V1.49805V3.39063H5.91895V2.24805H11.75V8.08367H10.8308V9.58367H12.5H13.25V8.83367V1.49805V0.748047H12.5H5.16895ZM1.50366 4.41602H0.753662V5.16602V12.5016V13.2516H1.50366H8.83471H9.58471V12.5016V5.16602V4.41602H8.83471H1.50366ZM2.25366 11.7516V5.91602H8.08471V11.7516H2.25366Z"
                    fill="#03C7FF"
                  />
                </svg>
              </div>
            </div>
            <div className="rounded-3xl flex flex-col gap-0.5 overflow-hidden bg-white">
              <Link href="/">
                <div className="bg-[#F6F6F6] p-6 text-xl	text-primary">
                  Enjoyoors Terminal
                </div>
              </Link>
              <Link href="/leaderboard">
                <div className="bg-[#F6F6F6] p-6 text-xl	text-primary">
                  Enjoyoors Leaderboard
                </div>
              </Link>
              <Link href="/enjoyanomics">
                <div className="bg-[#F6F6F6] p-6 text-xl	text-primary">
                  Enjoyanomics
                </div>
              </Link>
            </div>
            <div
              className={`grid-cols-2 text-left ${
                showMenu ? 'grid' : 'hidden'
              }`}
            >
              <Link
                href="https://univ2.zora.energy/#/swap"
                target="_blank"
                className="p-6"
              >
                <div className="text-primary flex gap-2 items-center">
                  <div className="text-xl">Uniswap v2</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
                      stroke="#03C7FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                href="https://www.geckoterminal.com/zora-network/pools/0x3a3f615b05aad54d8a7af1d1b20854f0513278da"
                target="_blank"
                className="p-6"
              >
                <div className="text-primary flex gap-2 items-center">
                  <div className="text-xl">Gecko Terminal</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
                      stroke="#03C7FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                href="https://warpcast.com/~/channel/enjoy"
                target="_blank"
                className="p-6"
              >
                <div className="text-primary flex gap-2 items-center">
                  <div className="text-xl">Warpcast</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
                      stroke="#03C7FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                href="https://twitter.com/enjoytech_"
                target="_blank"
                className="p-6 text-left"
              >
                <div className="text-primary flex gap-2 items-center w-full text-left">
                  <div className="text-xl">Twitter</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
                      stroke="#03C7FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
