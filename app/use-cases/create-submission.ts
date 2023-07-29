import { addDoc, setDoc } from 'firebase/firestore'
import { UnvalidatedSubmission, RootSubmissionDocument } from '../model'
import { submissionsRef, userSubmissionRef } from '../utils/firestore-reference'
import { fetchSubmission } from './fetch-submission'

/**
 * Submit user's solution
 */
export async function createSubmission(
  userId: string,
  submission: UnvalidatedSubmission
) {
  const rootSubmission: RootSubmissionDocument = {
    userId,
    problemId: submission.problemId,
  }
  const submissionRef = await addDoc(submissionsRef(), rootSubmission)

  const ref = userSubmissionRef(userId, submissionRef.id)
  setDoc(ref, submission)

  return fetchSubmission(userId, ref.id)
}
