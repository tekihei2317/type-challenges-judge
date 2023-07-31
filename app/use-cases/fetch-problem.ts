import { Problem, ProblemDifficulty } from '../model'
import { getProblem } from './query/querier'

export async function fetchProblem(
  db: D1Database,
  problemId: string
): Promise<Problem> {
  const problem = await getProblem(db, { id: problemId })
  // TODO: 画面側でnullのハンドリングする
  if (problem === null) throw new Error('TODO:')

  return {
    ...problem,
    difficulty: problem.difficulty as ProblemDifficulty,
    // TODO: カラムがキャメルケースだと、sql-gen-d1-tsの生成する型が小文字のみになるが、実際にはキャメルケースで返ってくる
    playground_url: (problem as any).playgroundUrl,
  }
}
