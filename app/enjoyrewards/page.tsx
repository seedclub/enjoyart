import Image from 'next/image';
import Farm from '@/components/farm';

export default function EnjoyRewards() {
  return (
    <div className="flex flex-col 2xl:flex-row">
      <img
        src="/mobilefriday.png"
        alt="Enjoy"
        className="w-full h-auto block 2xl:hidden max-w-sm mx-auto md:m-0"
      />
      <div className="flex flex-col gap-24 w-full max-w-3xl p-6">
        <p className="txt-xxl">
          Earn rewards by contributing liquidity to the{' '}
          <span className="text-accent">Enjoy pool</span>. Rewards are streamed
          as long as {`you’re`} staking LP tokens.{' '}
          <span className="text-accent">10% of the total supply</span> will be
          directed to LP providers through this rewards program which will run
          for 6 months. The rewards program will start on March 6th, 2024.
        </p>

        <Farm />

        <div className="txt-xxl">
          <p>
            !!! Please only enjoy participating if you know what you’re doing.
            Adding liquidity to a pool comes with the risk of impermanent loss.
          </p>
        </div>
      </div>
      <div className="hidden 2xl:block fixed top-0 right-0 pointer-events-none">
        <Image src="/friday.png" width={826} height={982} alt="friday" />
      </div>
    </div>
  );
}
