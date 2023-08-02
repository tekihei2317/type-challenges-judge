import { Problem } from './core/type-challenges-judge'
import { getAllProblems } from './query/querier'
import { parseProblem } from './utils/database'

export async function fetchProblems(db: D1Database): Promise<Problem[]> {
  const { results } = await getAllProblems(db)

  return results.map((problem) => parseProblem(problem))
}
