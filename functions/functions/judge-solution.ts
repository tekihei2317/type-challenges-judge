import { UserSubmissionDocument } from '../../src/model'
import * as functions from 'firebase-functions'

type JudgeStatus = 'Accepted' | 'Wrong Answer'
type Diagnostic = string

function compileSolution(solution: string, testCase: string): Diagnostic[] {
  // 回答とテストケースをファイルに保存する
  // 判定処理を実行し、メッセージを返却する
  // ファイルを削除する

  return []
}

/**
 * 問題のテストケースを取得する
 */
function fetchTestCase(problemId: string): string {
  return `
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]
  `
}

async function updateUserSubmission(
  submissionId: string,
  judgeStatus: JudgeStatus,
  diagnostics: Diagnostic[]
): Promise<void> {
  // TODO:
}

async function updateProblemSubmission(
  submissionId: string,
  judgeStatus: JudgeStatus
): Promise<void> {
  // TODO:
}

/**
 * 提出のステータスを更新する(ユーザー側、問題側)
 */
async function updateSubmission(
  submissionId: string,
  diagnostics: Diagnostic[]
): Promise<[void, void]> {
  const judgeStatus: JudgeStatus =
    diagnostics.length > 0 ? 'Wrong Answer' : 'Accepted'

  return await Promise.all([
    updateUserSubmission(submissionId, judgeStatus, diagnostics),
    updateProblemSubmission(submissionId, judgeStatus),
  ])
}

/**
 * 提出が作成されたときに、回答の判定処理を実行する
 */
module.exports = functions.firestore
  .document('/users/{userId}/submissions/{submissionId}')
  .onCreate(async (snapshot, context) => {
    const submission: UserSubmissionDocument =
      snapshot.data() as UserSubmissionDocument
    const submissionId: string = context.params.submissionId

    const testCase = fetchTestCase(submission.problemId)
    const diagnostics = compileSolution(submission.code, testCase)

    await updateSubmission(submissionId, diagnostics)
  })
