import { Problem } from './core/type-challenges-judge'
import { getProblem } from './query/querier'
import { parseProblem } from './utils/database'

export async function fetchProblem(
  db: D1Database,
  problemId: string
): Promise<Problem> {
  const problem = await getProblem(db, { id: problemId })
  // TODO: 画面側でnullのハンドリングする
  if (problem === null) throw new Error('TODO:')

  return parseProblem(problem)
}
