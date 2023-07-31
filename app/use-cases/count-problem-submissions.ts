import { assertNonNullable } from '../utils/assertion'
import { countSubmissionsToProblem } from './query/querier'

export async function countProblemSubmissions(
  db: D1Database,
  problemId: string
): Promise<number> {
  const result = await countSubmissionsToProblem(db, { problemId })
  assertNonNullable(result)

  return result.count
}
