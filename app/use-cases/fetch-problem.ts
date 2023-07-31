import { Problem, ProblemDifficulty } from '../model'

type ProblemModel = {
  id: string
  title: string
  content: string
  difficulty: ProblemDifficulty
  tests: string
  playgroundUrl: string
}

export async function fetchProblem(
  db: D1Database,
  problemId: string
): Promise<Problem> {
  const problem = await db
    .prepare('select * from Problem where id = ?')
    .bind(problemId)
    .first<ProblemModel>()

  // TODO: 画面側でnullのハンドリングする
  if (problem === null) throw new Error('TODO:')

  return { ...problem, playground_url: problem.playgroundUrl }
}
