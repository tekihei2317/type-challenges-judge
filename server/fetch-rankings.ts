import { calculateRankings } from './query/querier'

type Ranking = {
  userRank: number
  userId: string
  screenName: string
  acceptedCount: number
}

export async function fetchRankings(db: D1Database): Promise<Ranking[]> {
  // TODO: ランキングをキャッシュする
  const { results: rankings } = await calculateRankings(db)

  return rankings.map((ranking) => ({
    ...ranking,
    userRank: Number(ranking.userRank),
  }))
}
