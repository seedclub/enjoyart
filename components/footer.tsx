import Link from 'next/link';
import ExternalLink from './external-link';

type FooterLinkProps = {
  href: string;
  text: string;
};

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link
    target="_blank"
    href={href}
    className="text-primary text-lg hover:underline"
  >
    <p>{text}</p>
  </Link>
);

export default function Footer() {
  return (
    <div className="p-3 lg:p-6 flex justify-between tracking-32">
      <div className="flex flex-col lg:py-4">
        <div className="grid grid-columns-1 lg:grid-cols-2 gap-3 md:gap-6 relative top-5 pb-2">
          <ExternalLink
            href="https://warpcast.com/~/channel/enjoy"
            text="Warpcast"
          />
          <ExternalLink
            href="https://www.geckoterminal.com/zora-network/pools/0x3a3f615b05aad54d8a7af1d1b20854f0513278da"
            text="Gecko Terminal"
          />
          <ExternalLink href="https://twitter.com/enjoytech_" text="Twitter" />
          <ExternalLink
            href="https://www.coingecko.com/en/coins/enjoy"
            text="Coingecko"
          />
          <ExternalLink
            href="https://univ2.zora.energy/#/swap"
            text="Uniswap v2"
          />
          <ExternalLink
            href="https://explorer.zora.energy/token/0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39"
            text="Token Contract"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-full"></div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center">
            <img
              className="mx-auto"
              src="/zora.png"
              alt="Enjoy Logo"
              width={139}
              height={149}
            />
          </div>
          <div className="text-primary text-lg text-center md:pb-4">
            <p>2024 Enjoy Tech</p>
            <p>For Token Enthusiast Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
