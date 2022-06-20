import { collection, doc } from 'firebase/firestore'
import { db } from './firebase'

export function userProblemResultsRef(userId: string) {
  return collection(db, 'users', userId, 'problem_results')
}

export function problemSubmissionRef(problemId: string, submissionId: string) {
  return doc(db, 'problems', problemId, 'submissions', submissionId)
}
