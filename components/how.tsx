'use client';
import React from 'react';
import XS from './text/xs';
import LG from './text/lg';
import XXS from './text/xxs';
import ExternalLink from './external-link';

export default function How() {
  return (
    <div className="flex flex-col h-full justify-between md:pr-4 md:pl-2">
      <div className="flex flex-col gap-6 h-full text-xl tracking-112 text-grey500">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <XS>
              <div className="text-primary">Min. Required Balance</div>
            </XS>
            <LG>500k $Enjoy</LG>
          </div>
          <div>
            <div className="text-primary tracking-32">
              Tipping Allowance Refresh
            </div>
            <div className="text-3xl">Sundays at 11pm EST</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">General</div>
          </XS>
          <XXS>
            Your account must be holding at least 500,000 $Enjoy to get a weekly
            tipping allocation. If you’ve recently purchased $Enjoy, your weekly
            tip allowance will become available on the following Sunday at 11pm
            EST. The more active you are onchain, the higher your allowance will
            be.
          </XXS>
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">How To Tip</div>
          </XS>
          <ul className="text-sm tracking-28">
            <li>
              ❗️ To tip a creator, comment on any Zora mint with "amount +
              $Enjoy"{' '}
            </li>
            <li>❗ Tip comments are not case sensitive</li>
            <li>❗ Tips beyond your weekly limit won't count</li>
            <li>❗ Unused Tips do not roll over</li>
            <li>❗ Tip balances are recalculated weekly</li>
          </ul>
        </div>
        <div className="flex pl-2">
          <XXS>eg.</XXS>
          <img src="/mint.png" className="w-80" />
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">Where to Tip</div>
          </XS>
          <div className="flex gap-2">
            <ExternalLink href="https://zora.co" text="Zora" />
            <ExternalLink href="https://surr.app/" text="Surreal" />
            <ExternalLink
              href="https://www.interface.social/"
              text="Interface"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">Supported Networks</div>
          </XS>
          <div className="flex flex-wrap gap-2">
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Base</XXS>
            </div>
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Zora</XXS>
            </div>
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Optimism</XXS>
            </div>
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Mainnet</XXS>
            </div>
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Arbitrum One</XXS>
            </div>
            <div className="border border-primary rounded-full py-1 px-2">
              <XXS>Blast</XXS>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">Tipping Distribution Rewards</div>
          </XS>
          <XXS>
            5% of tips go to the first tipper, 5% go to you, and 90% go the
            creator of the mint.
          </XXS>
          <div className="rounded-3xl overflow-hidden border border-primary mt-5 mb-4 text-sm">
            <div className="bg-primary text-white flex justify-between px-6 py-2">
              <div className="text-left  w-full tracking-28">
                $Enjoy Distribution Rewards
              </div>
              <div className="w-full tracking-28 text-right">
                Tip Allocation
              </div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left w-full tracking-28 text-grey500">
                Creator
              </div>
              <div className="text-right w-full tracking-28 text-grey500">
                90%
              </div>
            </div>
            <div className="flex justify-between px-6 py-1">
              <div className="text-left  w-full tracking-28 text-grey500">
                First $Enjoy Tipper
              </div>
              <div className="text-right w-full tracking-28 text-grey500">
                5%
              </div>
            </div>
            <div className="bg-[#F2F2F2] flex justify-between px-6 py-1">
              <div className="text-left  w-full tracking-28 text-grey500">
                $Enjoy Tipper
              </div>
              <div className="text-right w-full tracking-28 text-grey500">
                5%
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <XS>
            <div className="text-primary">
              Tip Allowance Calculation Criteria
            </div>
          </XS>

          <div className="flex flex-col gap-3 tracking-28 text-grey500 text-sm">
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>Collect Streak</div>
                <div className="text-primary">
                  Consecutive weeks an address has collected 2 or more unique
                  pieces on Zora
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>Creation Streak</div>
                <div className="text-primary">
                  Weeks in the past year an address has had {`>`} 2 unique
                  collectors on Zora
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>Time Since First Mint</div>
                <div className="text-primary">
                  Number of days since the account first minted a piece on Zora
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>Unique Collectors</div>
                <div className="text-primary">
                  Total number of unique addresses that have collected their
                  work on Zora
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>Unique Mints</div>
                <div className="text-primary">
                  Total number of unique pieces the address has collected on
                  Zora
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>+++</div>
              <div>
                <div>$Enjoy Bags</div>
                <div className="text-primary">
                  Amount of $Enjoy the address is holding
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs tracking-28">
          ***We reserve the right to update allocation calculations and remove
          addresses caught farming
        </div>
      </div>
    </div>
  );
}
