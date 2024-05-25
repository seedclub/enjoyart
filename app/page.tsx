import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Leaderboard from '@/components/leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Farm from '@/components/farm';
import Credit from '@/components/credit';
import Criteria from '@/components/criteria';
import How from '@/components/how';
import Intro from '@/components/intro';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Buy from '@/components/buy';
import Pool from '@/components/pool';

type BoxCardProps = {
  children: React.ReactNode;
};

type ContentProps = {
  children: React.ReactNode;
};

const BoxCard = ({ children }: BoxCardProps) => (
  <div className="w-full shadow-light rounded-2xl h-full p-6 mb-6">
    {children}
  </div>
);

const Content = ({ children }: ContentProps) => (
  <div className="h-[530px] overflow-hidden overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-white pt-6">
    {children}
  </div>
);

export default async function Home() {
  return (
    <ResizablePanelGroup direction="vertical" className="">
      <ResizablePanel defaultSize={70}>
        <div className="overflow-y-scroll h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
          <Header />
          <div className="flex flex-col gap-3 xl:gap-6">
            <div className="xl:flex flex-col md:flex-row xl:justify-evenly gap-12 xl:gap-6 p-3 xl:p-6 h-full xl:h-[690px]">
              <BoxCard>
                <Intro />
              </BoxCard>
              <BoxCard>
                <Tabs defaultValue="buy">
                  <TabsList>
                    <TabsTrigger value="buy">Swap</TabsTrigger>
                    <TabsTrigger value="pool">Pool</TabsTrigger>
                    <TabsTrigger value="stake">Stake</TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy">
                    <Content>
                      <Buy />
                    </Content>
                  </TabsContent>
                  <TabsContent value="pool">
                    <Content>
                      <Pool />
                    </Content>
                  </TabsContent>
                  <TabsContent value="stake">
                    <Content>
                      <Farm />
                    </Content>
                  </TabsContent>
                </Tabs>
              </BoxCard>
              <BoxCard>
                <Tabs defaultValue="buy">
                  <TabsList>
                    <TabsTrigger value="buy">
                      Weekly Tipping Balance
                    </TabsTrigger>
                    <TabsTrigger value="criteria">!!! Airdrop 2</TabsTrigger>
                    <TabsTrigger value="stake">About</TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy">
                    <Content>
                      <Credit />
                    </Content>
                  </TabsContent>
                  <TabsContent value="criteria">
                    <Content>
                      <Criteria />
                    </Content>
                  </TabsContent>
                  <TabsContent value="stake">
                    <Content>
                      <How />
                    </Content>
                  </TabsContent>
                </Tabs>
              </BoxCard>
            </div>
            <Footer />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="hidden lg:block" defaultSize={30}>
        <Leaderboard />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
