import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

import {
  ProblemSubmissionDocument,
  User,
  UserSubmissionDocument,
} from '../../src/model'

/**
 * ユーザーコレクションの中にある提出を、問題コレクションの中に置く用の提出に変換する
 */
function toProblemSubmission(
  submission: UserSubmissionDocument,
  user: User,
  order: number
): ProblemSubmissionDocument {
  return {
    code: submission.code,
    codeLength: submission.codeLength,
    status: submission.status,
    createdAt: submission.createdAt,
    user,
    order,
  }
}

/**
 * 提出の親リファレンスをたどってユーザーを取得する
 */
async function getUserFromSubmissionRef(
  ref: admin.firestore.DocumentReference<admin.firestore.DocumentData>
): Promise<User> {
  const userRef = ref.parent.parent

  if (userRef === null) {
    // TODO: assertにする
    throw new Error('ユーザーIDが存在しません')
  }

  return (await userRef.get()).data() as User
}

/**
 * ドキュメントの登録順を計算する(ページネーション用)
 */
async function calculateNewSubmissionOrder(problemId: string): Promise<number> {
  const query = admin
    .firestore()
    .collection('problems')
    .doc(problemId)
    .collection('submissions')
    .orderBy('order')
    .limit(1)
  const querySnapshot = await query.get()

  if (querySnapshot.empty) {
    return 0
  }

  const latestSubmission =
    querySnapshot.docs[0].data() as ProblemSubmissionDocument

  return latestSubmission.order + 1
}

/**
 * 回答が提出されたときに、提出を問題ドキュメントに追加する
 */
const handleSubmission = functions.firestore
  .document('/users/{userId}/submissions/{submissionId}')
  .onCreate(async (snapshot, context) => {
    const _submission = snapshot.data() as UserSubmissionDocument
    const submission: UserSubmissionDocument = {
      ..._submission,
      id: context.params.submissionId,
    }

    const [user, order] = await Promise.all([
      getUserFromSubmissionRef(snapshot.ref),
      calculateNewSubmissionOrder(submission.problemId),
    ])

    const problemSubmission = toProblemSubmission(submission, user, order)

    admin
      .firestore()
      .collection('problems')
      .doc(submission.problemId)
      .collection('submissions')
      .doc(snapshot.id)
      .set(problemSubmission)
  })

module.exports = handleSubmission
