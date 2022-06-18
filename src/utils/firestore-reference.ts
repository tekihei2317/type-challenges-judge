import { collection } from 'firebase/firestore'
import { db } from './firebase'

export function userProblemResultsRef(userId: string) {
  return collection(db, 'users', userId, 'problem_results')
}
