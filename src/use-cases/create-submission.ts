import { addDoc, collection } from 'firebase/firestore'
import { UnvalidatedSubmission, collectionName as CN } from '../model'
import { db } from '../utils/firebase'
import { fetchSubmission } from './fetch-submission'

/**
 * Submit user's solution
 */
export async function createSubmission(
  userId: string,
  submission: UnvalidatedSubmission
) {
  const submissionsRef = collection(db, CN.users, userId, CN.submissions)
  const submissionRef = await addDoc(submissionsRef, submission)

  return fetchSubmission(userId, submissionRef.id)
}
