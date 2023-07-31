import { generateAutoId } from '../utils/record-id'
import { createSubmission as createSubmissionQuery } from './query/querier'

export function assertNonNullable<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}

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
