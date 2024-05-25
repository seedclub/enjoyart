export const numberWithCommas = (x: string) => {
  return parseFloat(x)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const getScoreNormalized = (score: number) => {
  const max = 3800;
  const min = 0;
  const nomarlizedMax = 888;
  const normalizedMin = 333;

  const normalizedScore =
    ((score - min) / (max - min)) * (nomarlizedMax - normalizedMin) +
    normalizedMin;

  return parseInt(normalizedScore.toFixed(0));
};

export const getTotalScore = (user: any) => {
  if (!user) return 0;
  const creationHeatmapCount = user.weeks_with_collectors_in_last_52 || 0;
  const collectStreakCount = user.collect_streak_unique_mints || 0;
  const daysSinceFirstMintCount = user.days_since_first_mint || 0;
  const uniqueMintsCount = user.unique_mints || 0;
  const uniqueCollectorsCount = user.unique_collectors || 0;
  const enjoyBags = user.enjoy_bags || 0;

  const creationHeatmapScore = (creationHeatmapCount / 52) * 20;
  const collectStreakScore = (collectStreakCount / 52) * 20;
  const daysSinceFirstMintScore = (daysSinceFirstMintCount / 365) * 20;
  const uniqueMintsScore = (uniqueMintsCount / 500) * 20;
  const uniqueCollectorsScore = (uniqueCollectorsCount / 500) * 20;
  const enjoyBagsScore = (enjoyBags / 111111111) * 20;

  const totalScore =
    creationHeatmapScore +
    collectStreakScore +
    daysSinceFirstMintScore +
    uniqueMintsScore +
    uniqueCollectorsScore +
    enjoyBagsScore;

  return totalScore;
};

export const getAllowance = (index: number) => {
  return parseInt((29150243 / Math.pow(index, 0.75)).toFixed(0));
};

export const toHumanReadable = (num: number) => {
  if (!num) return 0;
  // just add commas
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
