import React from 'react';
import Link from 'next/link';
import XS from './text/xs';

export default function ExternalLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link target="_blank" href={href}>
      <div className="text-center text-primary flex justify-center p-3 hover:bg-[#F6F6F6] rounded-2xl transition-all duration-300 ease-in-out w-fit">
        <XS>
          <span className="text-primary">{text}</span>
        </XS>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="relative top-[5px] ml-1"
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
  );
}
