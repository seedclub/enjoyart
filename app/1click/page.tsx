import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Link from 'next/link';

const NEXT_PUBLIC_URL = 'https://www.enjoy.tech';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Buy now with 1-Click',
      target: `${NEXT_PUBLIC_URL}/api/earn`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/memes/saylor.jpg`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
});

export const metadata: Metadata = {
  title: 'Just enjoy',
  description: 'Click to earn $enjoy',
  openGraph: {
    title: 'Just enjoy',
    description: 'Click to earn $enjoy',
    images: [`${NEXT_PUBLIC_URL}/memes/saylor.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function EnjoyBuys() {
  return (
    <div className="flex flex-col 2xl:flex-row">
      <Link target="_blank" href="https://univ2.zora.energy/#/">
        Buy some enjoy here
      </Link>
    </div>
  );
}
