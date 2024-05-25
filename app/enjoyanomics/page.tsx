import Footer from '@/components/footer';
import Header from '@/components/header';
import LG from '@/components/text/lg';
import S from '@/components/text/s';
import Image from 'next/image';

export async function generateMetadata() {
  return {
    title: 'Enjoyanomics',
    description: 'Just enjoy',
  };
}

export default async function EnjoyPage() {
  return (
    <>
      <Header />
      <div className="w-full max-w-[936px] mx-auto flex flex-col gap-16 p-6 ">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full shadow-light rounded-2xl h-full p-6 flex flex-col justify-between">
            <S>
              <span className="text-primary">$ENJOY</span> is an ERC-20 token on
              Zora Network with a total supply of a 111,111,111,111 tokens.
              Launched in 2024 with an airdrop to onchain creators and
              collectors. <span className="text-primary">!!! Airdrop 1</span> is
              a distribution of{' '}
              <span className="text-primary">15% of the total supply</span>,{' '}
              directly into the hands of token enjoyoors. A perpetual inflation
              rate of 1.111% will start after 3 years to support ecosystem
              development.
            </S>
          </div>
          <div className="shadow-light rounded-2xl h-full p-6">
            <Image alt="logo" src="/piechart.png" height={374} width={374} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <LG>!!! Airdrop</LG>
            <S>
              25% of Supply is in circulation after !!! Airdrop 1 through the
              initial LP, rewards, & the airdrop
            </S>
          </div>
          <div className="rounded-3xl overflow-hidden border border-primary">
            <div className="bg-primary text-white flex justify-between px-6 py-2">
              <div className="text-left  w-48 tracking-28">Description</div>
              <div className="text-left w-48 tracking-28">Status</div>
              <div className="text-right w-48 tracking-28">Supply</div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left w-48 tracking-28 text-grey500">
                Airdrop 1
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Circulating
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                15%
              </div>
            </div>
            <div className="flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Airdrop 2
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Coming soon
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                20%
              </div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Airdrop 3
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Coming soon
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                25%
              </div>
            </div>
            <p className="px-6 py-1 text-right text-xs text-grey500">
              *25% of Supply is in circulation after Airdrop 1 through the
              initial LP, rewards, & the airdrop
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <LG>Liquidity & Rewards</LG>
          </div>
          <div className="rounded-3xl overflow-hidden border border-primary">
            <div className="bg-primary text-white flex justify-between px-6 py-2">
              <div className="text-left w-48 tracking-28">Description</div>
              <div className="text-left w-48 tracking-28">Status</div>
              <div className="text-right w-48 tracking-28">Supply</div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Initial Pool
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Circulating
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                15%
              </div>
            </div>
            <div className="flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Reward Pool
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Active
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                9.5%
              </div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Distributed Rewards
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Circulating
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                0.05%
              </div>
            </div>
            <p className="px-6 py-1 text-right text-xs text-grey500">
              *25% of Supply is in circulation after Airdrop 1 through the
              initial LP, rewards, & the airdrop
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <LG>!!! Ecosystem</LG>
            <S>
              25% of Supply is in circulation after !!! Airdrop 1 through the
              initial LP, rewards, & the airdrop
            </S>
          </div>
          <div className="rounded-3xl overflow-hidden border border-primary">
            <div className="bg-primary text-white flex justify-between px-6 py-2">
              <div className="text-left w-48 tracking-28">Description</div>
              <div className="text-left w-48 tracking-28">Status</div>
              <div className="text-right w-48 tracking-28">Supply</div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Initial Pool
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Circulating
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                15%
              </div>
            </div>
            <div className="flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Reward Pool
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Active
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                9.5%
              </div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-48 tracking-28 text-grey500">
                Distributed Rewards
              </div>
              <div className="text-left w-48 tracking-28 text-grey500">
                Circulating
              </div>
              <div className="text-right w-48 tracking-28 text-grey500">
                0.05%
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
