import invariant from 'tiny-invariant'
import { assertNonNullable } from './utils/assertion'
import { generateAutoId } from './utils/database'
import {
  createChallengeResult,
  createJudgement,
  createSubmission as createSubmissionQuery,
  findChallengeResult,
  findProblem,
  updateChallengeResultStatus,
} from './query/querier'
import { calculateStatus, compileSolution } from './judge'

export async function createSubmission(
  db: D1Database,
  submission: { userId: string; problemId: string; code: string }
): Promise<{ id: string; problemId: string }> {
  const problem = await findProblem(db, { id: submission.problemId })
  invariant(problem, 'invalid problem')

  const diagnostics = compileSolution(submission.code, problem.tests)
  const status = calculateStatus(diagnostics)

  // 提出と判定結果、挑戦結果を登録する(TODO: トランザクション)
  const createdSubmission = await createSubmissionQuery(db, {
    id: generateAutoId(),
    problemId: submission.problemId,
    userId: submission.userId,
    code: submission.code,
    codeLength: submission.code.length,
    status,
  })
  assertNonNullable(createdSubmission)

  await createJudgement(db, {
    diagnostics: JSON.stringify(diagnostics),
    status: status,
    submissionId: createdSubmission.id,
  })

  const challengeResult = await findChallengeResult(db, {
    problemId: problem.id,
    userId: submission.userId,
  })
  if (challengeResult === null) {
    // 初挑戦の場合は、挑戦結果を登録する
    await createChallengeResult(db, {
      problemId: problem.id,
      userId: submission.userId,
      status,
    })
  } else {
    // そうでない場合は、前回が不正解で今回が正解だった場合は更新する
    if (challengeResult.status === 'Wrong Answer' && status === 'Accepted')
      await updateChallengeResultStatus(db, {
        problemId: problem.id,
        userId: submission.userId,
        status,
      })
  }

  return createdSubmission
}
