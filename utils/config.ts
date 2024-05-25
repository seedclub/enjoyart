import { http, createConfig } from 'wagmi';
import { zora, base, optimism, mainnet } from 'wagmi/chains';

export const config = createConfig({
  chains: [zora, base, optimism, mainnet],
  transports: {
    [zora.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [mainnet.id]: http(),
  },
});
