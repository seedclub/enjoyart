'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { chain } from '@/constants/chain';

function Privy({ children }: { children: React.ReactNode }) {
  const defaultChain = chain;
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        defaultChain,
        loginMethods: ['wallet'],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default Privy;
