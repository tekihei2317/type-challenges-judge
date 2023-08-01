import { Submission } from './core/type-challenges-judge'
import { assertNonNullable } from './utils/assertion'
import { findProblem, findSubmission, findUser } from './query/querier'
import { parseSubmission, parseProblem } from './utils/database'

export async function fetchSubmission(
  db: D1Database,
  submissionId: string
): Promise<Submission | undefined> {
  const submission = await findSubmission(db, { id: submissionId })
  if (submission === null) return undefined

  const [problem, user] = await Promise.all([
    findProblem(db, { id: submission.problemId }),
    findUser(db, { userId: submission.userId }),
  ])
  assertNonNullable(problem)
  assertNonNullable(user)

  return {
    ...parseSubmission(submission),
    codeLength: Number(submission.codeLength),
    user,
    problem: parseProblem(problem),
  }
}
