import { Problem, ProblemDifficulty } from './../model'
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
