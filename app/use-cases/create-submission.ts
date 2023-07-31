import { SubmissionStatus } from '../model'
import { generateAutoId } from '../utils/record-id'

type SubmissionModel = {
  id: string
  problemId: string
  userId: string
  code: string
  codeLength: string
  status: SubmissionStatus
  createdAt: string
}

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
  const createdSubmission = await db
    .prepare(
      'insert into submission (id, problemId, userId, code, codeLength, status) values (?, ?, ?, ?, ?, ?) returning *'
    )
    .bind(
      generateAutoId(),
      submission.problemId,
      submission.userId,
      submission.code,
      submission.code.length,
      'Judging'
    )
    .first<SubmissionModel>()
  assertNonNullable(createdSubmission)

  return createdSubmission
}
