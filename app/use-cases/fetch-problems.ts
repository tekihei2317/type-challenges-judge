import { Problem, ProblemDifficulty } from './../model'

type ProblemModel = {
  id: string
  title: string
  content: string
  difficulty: ProblemDifficulty
  tests: string
  playgroundUrl: string
}

export async function fetchProblems(db: D1Database): Promise<Problem[]> {
  const { results } = await db
    .prepare('select * from Problem')
    .all<ProblemModel>()

  return results.map((problem) => ({
    ...problem,
    playground_url: problem.playgroundUrl,
  }))
}
