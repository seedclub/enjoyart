import React from 'react';
import S from './text/s';
import ExternalLink from './external-link';

export default function Pool() {
  return (
    <div className="flex flex-col justify-evenly gap-24">
      <div className="flex flex-col gap-6">
        <S>
          To participate in the{' '}
          <span className="text-primary">
            Enjoyoor’s Liquidity Rewards Program
          </span>
          , first provide liquidity at 
          <span className="text-primary">univ2.zora.energy</span> then stake
          your LP tokens in the stake tab.
        </S>
        <S>
          10% of the total supply will be distributed to LP providers through
          this rewards program.
        </S>
      </div>
      <ExternalLink
        href="https://univ2.zora.energy/#/swap"
        text="univ2.zora.energy"
      />
    </div>
  );
}
