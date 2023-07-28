import { collection, doc } from 'firebase/firestore'
import { db } from './firebase'

export function submissionsRef() {
  return collection(db, 'submissions')
}

export function submissionRef(submissionId: string) {
  return doc(db, 'submissions', submissionId)
}

export function userSubmissionRef(userId: string, submissionId: string) {
  return doc(db, 'users', userId, 'submissions', submissionId)
}

export function userProblemResultsRef(userId: string) {
  return collection(db, 'users', userId, 'problem_results')
}

export function problemSubmissionRef(problemId: string, submissionId: string) {
  return doc(db, 'problems', problemId, 'submissions', submissionId)
}
