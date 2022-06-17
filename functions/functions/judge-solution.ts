import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {
  Problem,
  ProblemDocument,
  ProblemResultDocument,
  UserSubmissionDocument,
} from '../../src/model'
import { updateSubmission } from './database/update-submission'
import { calculateStatus, compileSolution } from '../utils/judge'
import { updateProblemResult } from './database/update-problem-result'

/**
 * 問題を取得する
 */
async function findProblem(problemId: string): Promise<ProblemDocument> {
  const problem = (
    await admin.firestore().collection('problems').doc(problemId).get()
  ).data() as Problem

  return problem
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

    const problem = await findProblem(submission.problemId)
    const diagnostics = await compileSolution(submission.code, problem.tests)
    const userProblemResult: ProblemResultDocument = {
      problem_id: problem.id,
      status: calculateStatus(diagnostics),
      problem_difficulty: problem.difficulty,
    }

    await Promise.all([
      updateSubmission(userId, submission.problemId, submissionId, diagnostics),
      updateProblemResult(userId, userProblemResult),
    ])
  })
