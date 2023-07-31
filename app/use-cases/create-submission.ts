import { assertNonNullable } from '../utils/assertion'
import { generateAutoId } from '../utils/record-id'
import { createSubmission as createSubmissionQuery } from './query/querier'

/**
 * Submit user's solution
 */
export async function createSubmission(
  db: D1Database,
  submission: { userId: string; problemId: string; code: string }
) {
  const createdSubmission = await createSubmissionQuery(db, {
    id: generateAutoId(),
    problemid: submission.problemId,
    userid: submission.userId,
    code: submission.code,
    codelength: submission.code.length,
    status: 'Judging',
  })
  assertNonNullable(createdSubmission)

  return createdSubmission
}
