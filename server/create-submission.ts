import { assertNonNullable } from './utils/assertion'
import { generateAutoId } from './utils/database'
import { createSubmission as createSubmissionQuery } from './query/querier'

export async function createSubmission(
  db: D1Database,
  submission: { userId: string; problemId: string; code: string }
): Promise<{ id: string; problemId: string }> {
  const createdSubmission = await createSubmissionQuery(db, {
    id: generateAutoId(),
    problemId: submission.problemId,
    userId: submission.userId,
    code: submission.code,
    codeLength: submission.code.length,
    status: 'Judging',
  })
  assertNonNullable(createdSubmission)

  return createdSubmission
}
