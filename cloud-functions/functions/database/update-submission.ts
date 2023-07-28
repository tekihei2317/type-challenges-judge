import * as functions from 'firebase-functions'
import {
  ProblemSubmissionDocument,
  UserSubmissionDocument,
} from '../../../app/model'
import {
  problemSubmissionRef,
  userSubmissionRef,
} from '../../utils/firestore-reference'
import { calculateStatus } from '../../utils/judge'

type JudgeStatus = 'Accepted' | 'Wrong Answer'
type Diagnostic = string

/**
 * ユーザー側の提出（詳細ページ用）を更新する
 */
async function updateUserSubmission(
  userId: string,
  submissionId: string,
  judgeStatus: JudgeStatus,
  diagnostics: Diagnostic[]
): Promise<void> {
  const userSubmission: Pick<UserSubmissionDocument, 'status' | 'diagnostics'> =
    {
      status: judgeStatus,
      diagnostics: diagnostics,
    }

  userSubmissionRef(userId, submissionId).set(userSubmission, { merge: true })
}

/**
 * 問題側の提出(一覧ページ用)を更新する
 */
async function updateProblemSubmission(
  problemId: string,
  submissionId: string,
  judgeStatus: JudgeStatus
): Promise<void> {
  const problemSubmission: Pick<ProblemSubmissionDocument, 'status'> = {
    status: judgeStatus,
  }

  problemSubmissionRef(problemId, submissionId).set(problemSubmission, {
    merge: true,
  })
}

/**
 * 提出のステータスを更新する(ユーザー側、問題側)
 */
export async function updateSubmission(
  userId: string,
  problemId: string,
  submissionId: string,
  diagnostics: Diagnostic[]
): Promise<[void, void]> {
  const judgeStatus: JudgeStatus = calculateStatus(diagnostics)

  functions.logger.log({ diagnostics, judgeStatus })

  return await Promise.all([
    updateUserSubmission(userId, submissionId, judgeStatus, diagnostics),
    updateProblemSubmission(problemId, submissionId, judgeStatus),
  ])
}
