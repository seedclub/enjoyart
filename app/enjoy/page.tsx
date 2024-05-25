import Image from 'next/image';

import Leaderboard from '@/components/leaderboard';
import { useEffect, useState } from 'react';

export default function EnjoyLeaders() {
  return (
    <div className="flex flex-col 2xl:flex-row">
      <img
        src="/mobilefriday.png"
        alt="Enjoy"
        className="w-full h-auto block 2xl:hidden max-w-sm mx-auto md:m-0"
      />
      <div className="flex flex-col gap-24 w-full max-w-3xl p-6">
        <p className="txt-xxl">
          Cras non dolor bibendum, aliquet erat ut, laoreet libero. Sed feugiat,
          sem ullamcorper tristique lacinia, justo tellus mollis massa, vel
          sollicitudin quam elit vitae felis.
        </p>

        <Leaderboard />

        <div className="txt-xxl">
          <p>
            !!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            fringilla fringilla purus, a aliquet magna malesuada et.
          </p>
        </div>
      </div>
      <div className="hidden 2xl:block fixed top-0 right-0 pointer-events-none">
        <Image src="/friday.png" width={826} height={982} alt="friday" />
      </div>
    </div>
  );
}
