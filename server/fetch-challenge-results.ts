import { ChallengeResult } from './core/type-challenges-judge'
import { findUsersChallengeResults } from './query/querier'
import { parseChallengeResult } from './utils/database'

export async function fetchChallengeResults(
  db: D1Database,
  userId?: string
): Promise<ChallengeResult[]> {
  if (userId == undefined) return []

  const { results } = await findUsersChallengeResults(db, { userId })
  return results.map((result) => parseChallengeResult(result))
}
