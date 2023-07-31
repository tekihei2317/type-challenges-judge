import { Submission } from '../model'
import { assertNonNullable } from '../utils/assertion'
import { findProblem, findSubmission, findUser } from './query/querier'

export async function fetchSubmission(
  db: D1Database,
  submissionId: string
): Promise<Submission | undefined> {
  const submission = await findSubmission(db, { id: submissionId })
  if (submission === null) return undefined

  const [problem, user] = await Promise.all([
    findProblem(db, { id: (submission as any).problemId }),
    findUser(db, { userid: (submission as any).userId }),
  ])
  assertNonNullable(problem)
  assertNonNullable(user)

  // TODO:
  return { ...submission, user, problem } as unknown as Submission
}
