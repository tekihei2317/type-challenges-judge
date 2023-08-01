import { Problem, ProblemDifficulty } from './core/type-challenges-judge'
import { getAllProblems } from './query/querier'

export async function fetchProblems(db: D1Database): Promise<Problem[]> {
  const { results } = await getAllProblems(db)

  return results.map((problem) => ({
    ...problem,
    difficulty: problem.difficulty as ProblemDifficulty,
    // TODO:
    playground_url: problem.playgroundurl,
  }))
}
