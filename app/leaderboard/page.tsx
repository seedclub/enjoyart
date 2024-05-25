import Header from '@/components/header';
import Leaderboard from '@/components/leaderboard';

export async function generateMetadata() {
  return {
    title: 'Enjoyanomics',
    description: 'Just enjoy',
  };
}

export default async function EnjoyPage() {
  return (
    <div className="">
      <Header />
      <Leaderboard />
    </div>
  );
}
