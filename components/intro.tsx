'use client';
import React, { useEffect, useState } from 'react';
import S from './text/s';
import XS from './text/xs';
import LG from './text/lg';
import ExternalLink from './external-link';

export default function Intro() {
  const [holders, setHolders] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [price, setPrice] = useState('');
  const [fdv, setFdv] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://explorer.zora.energy/api/v2/tokens/0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39/counters'
      );
      const data = await response.json();
      setHolders(parseInt(data.token_holders_count));
      setTransactions(parseInt(data.transfers_count));

      const response2 = await fetch(
        'https://api.geckoterminal.com/api/v2/networks/zora-network/tokens/0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39'
      );
      const {
        data: { attributes },
      } = await response2.json();
      const fdv = attributes.fdv_usd;
      setFdv(parseInt(fdv));
      const price = attributes.price_usd;
      setPrice(price);
    }
    fetchData();
  }, []);

  const convertToHumanReadable = (num: number) => {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num > 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num;
    }
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 tracking-4">
      <S>
        <span className="text-primary">$ENJOY</span>, the first tradable ERC-20
        token on Zora Network, is reshaping onchain media creation and curation
        by enabling the easy rewarding of enjoyable onchain content. Our points
        system recognizes unique contributions to the scene, effectively
        bridging the gap between online creators and enjoyoors and real-world
        value.
      </S>
      <div className="flex gap-10">
        <ExternalLink
          href="https://explorer.zora.energy/token/0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39"
          text="Token Contract"
        />
        <ExternalLink
          href="https://www.geckoterminal.com/zora-network/pools/0x3a3f615b05aad54d8a7af1d1b20854f0513278da"
          text="Gecko Terminal"
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <XS>
            <span className="text-primary">Holders</span>
          </XS>
          <LG>{convertToHumanReadable(holders)}</LG>
        </div>
        <div>
          <XS>
            <span className="text-primary">TXNs</span>
          </XS>
          <LG>{convertToHumanReadable(transactions)}</LG>
        </div>
        <div>
          <XS>
            <span className="text-primary">FDV</span>
          </XS>
          <LG>${convertToHumanReadable(fdv)}</LG>
        </div>
        <div>
          <XS>
            <span className="text-primary">Price</span>
          </XS>
          <LG>${parseFloat(price).toFixed(4)}</LG>
        </div>
      </div>
    </div>
  );
}
