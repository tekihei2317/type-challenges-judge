import { calculateRankings, calculateRankingsRow } from './query/querier'

type Ranking = {
  userRank: number
  userId: string
  screenName: string
  acceptedCount: number
}

const rankingsCacheKey = 'rankings'

function formatRankings(rankings: calculateRankingsRow[]): Ranking[] {
  return rankings.map((ranking) => ({
    ...ranking,
    userRank: Number(ranking.userRank),
  }))
}

export async function fetchRankings(
  db: D1Database,
  kv: KVNamespace
): Promise<Ranking[]> {
  const rankingsCache = await kv.get<Ranking[]>(rankingsCacheKey, {
    type: 'json',
  })
  if (rankingsCache !== null) {
    return rankingsCache
  }

  const { results } = await calculateRankings(db)
  const rankings = formatRankings(results)

  // ランキングの計算結果は60秒間キャッシュする
  await kv.put(rankingsCacheKey, JSON.stringify(rankings), {
    expirationTtl: 60,
  })
  return rankings
}
