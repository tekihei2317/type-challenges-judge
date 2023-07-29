import admin from 'firebase-admin'

const db = admin.firestore()

export function userSubmissionRef(userId: string, submissionId: string) {
  return db
    .collection('users')
    .doc(userId)
    .collection('submissions')
    .doc(submissionId)
}

export function problemSubmissionRef(problemId: string, submissionId: string) {
  return db
    .collection('problems')
    .doc(problemId)
    .collection('submissions')
    .doc(submissionId)
}

export function userProblemResult(userId: string, problemId: string) {
  return db
    .collection('users')
    .doc(userId)
    .collection('problem_results')
    .doc(problemId)
}
