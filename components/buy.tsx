'use client';
import React from 'react';
import '@decent.xyz/the-box/index.css';
import { BoxThemeProvider, SwapModal } from '@decent.xyz/the-box';
import { config } from '@/utils/config';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { zora, base, optimism, mainnet, blast } from 'viem/chains';
import { usePrivy } from '@privy-io/react-auth';

const queryClient = new QueryClient();

export default function Buy() {
  const { user } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;
  const myTheme = {
    mainBgColor: '#FFFFFF',
    mainTextColor: '#000000',
    boxSubtleColor1: '#00C7FF',
    boxSubtleColor2: '#00C7FF',
    gearCircleColor: '#00C7FF',
    loadShineColor1: 'FFF',
    loadShineColor2: 'FFF',
    chainDropdownBorder: '#00C7FF',
    chainDropdownHoverColor: '#00C7FF',
    buyBtnBgColor: '#00C7FF',
    buyBtnTextColor: '#FFF',
    boxLoadingBadgeColor: '#FFF',
    boxDialogBgColor: '#FFF',
  };
  const apiKey = process.env.NEXT_PUBLIC_DECENT_API_KEY as string;
  const chainId = zora.id;

  const enjoyToken = {
    chainId,
    tokenInfo: {
      address: '0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39',
      chainId,
      decimals: 18,
      symbol: 'ENJOY',
      name: 'Enjoy Token',
      isNative: false,
      logo: 'https://www.enjoy.tech/logo.png',
    },
  };

  const ethToken = {
    chainId,
    tokenInfo: {
      address: '0x0000000000000000000000000000000000000000',
      chainId,
      decimals: 18,
      symbol: 'ETH',
      isNative: true,
      name: 'Ethereum',
      logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    },
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BoxThemeProvider theme={myTheme}>
          <SwapModal
            chainIds={[zora.id, base.id, optimism.id, mainnet.id]}
            wagmiConfig={config}
            selectedSrcToken={ethToken}
            selectedDstToken={enjoyToken}
            className="mx-auto"
            address={address}
            apiKey={apiKey}
          />
        </BoxThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
