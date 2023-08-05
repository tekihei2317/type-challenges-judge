import invariant from 'tiny-invariant'
import { assertNonNullable } from './utils/assertion'
import { generateAutoId } from './utils/database'
import {
  createSubmission as createSubmissionQuery,
  findProblem,
} from './query/querier'
import { JudgeQueueMessage } from '../judge-worker/src/judge-worker'

export async function createSubmission(
  db: D1Database,
  judgeWorker: Fetcher,
  request: Request,
  submission: { userId: string; problemId: string; code: string }
): Promise<{ id: string; problemId: string }> {
  const problem = await findProblem(db, { id: submission.problemId })
  invariant(problem, 'invalid problem')

  // 提出を登録する
  const createdSubmission = await createSubmissionQuery(db, {
    id: generateAutoId(),
    problemId: submission.problemId,
    userId: submission.userId,
    code: submission.code,
    codeLength: submission.code.length,
    status: 'Judging',
  })
  assertNonNullable(createdSubmission)

  // 判定処理をワーカーで行う（TODO: リトライ）
  const message: JudgeQueueMessage = {
    submissionId: createdSubmission.id,
    problemId: submission.problemId,
    userId: submission.userId,
    code: submission.code,
    tests: problem.tests,
  }
  await judgeWorker.fetch(request, {
    method: 'POST',
    body: JSON.stringify(message),
  })

  return createdSubmission
}
