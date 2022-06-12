import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { Problem, UserSubmissionDocument } from '../../src/model'
import { updateSubmission } from './database/update-submission'
import { compileSolution } from '../utils/judge'

/**
 * 問題のテストケースを取得する
 */
async function findTestCase(problemId: string): Promise<string> {
  const problem = (
    await admin.firestore().collection('problems').doc(problemId).get()
  ).data() as Problem

  return problem.tests
}

/**
 * 提出が作成されたときに、回答の判定処理を実行する
 */
module.exports = functions
  .region('asia-northeast1')
  .runWith({ memory: '1GB' })
  .firestore.document('/users/{userId}/submissions/{submissionId}')
  .onCreate(async (snapshot, context) => {
    const submission: UserSubmissionDocument =
      snapshot.data() as UserSubmissionDocument
    const submissionId: string = context.params.submissionId
    const userId: string = context.params.userId

    const testCase = await findTestCase(submission.problemId)
    const diagnostics = await compileSolution(submission.code, testCase)

    await updateSubmission(
      userId,
      submission.problemId,
      submissionId,
      diagnostics
    )
  })
