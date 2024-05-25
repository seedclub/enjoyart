import rockset from '@rockset/client';

const rocksetClient = rockset(
  process.env.NEXT_PUBLIC_ROCKSET_APIKEY!,
  'https://api.usw2a1.rockset.com'
);

export function getUsersRs() {
  return rocksetClient.queryLambdas
    .executeQueryLambdaByTag('frontend', 'leaderboard', 'latest')
    .then(({ results }) => {
      return results;
    });
}

export function getUserRs(wallet: string) {
  return rocksetClient.queryLambdas
    .executeQueryLambdaByTag('frontend', 'user_from_leaderboard', 'latest', {
      parameters: [
        { name: 'wallet', type: 'string', value: wallet.toLowerCase() },
      ],
    })
    .then(({ results }) => {
      return results?.[0];
    });
}

export function getTipsRs(wallet: string) {
  return rocksetClient.queryLambdas
    .executeQueryLambdaByTag('frontend', 'current_tips_by_x', 'latest', {
      parameters: [
        { name: 'wallet', type: 'string', value: wallet.toLowerCase() },
      ],
    })
    .then(({ results }) => {
      return results?.[0];
    });
}

export function getUserTotals(wallet: string) {
  return rocksetClient.queryLambdas
    .executeQueryLambdaByTag('frontend', 'all_tip_stats_x', 'latest', {
      parameters: [
        { name: 'wallet', type: 'string', value: wallet.toLowerCase() },
      ],
    })
    .then(({ results }) => {
      return results?.[0];
    });
}
