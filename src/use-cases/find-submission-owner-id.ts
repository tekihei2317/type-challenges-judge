import { getDoc } from 'firebase/firestore'
import { submissionRef } from '../utils/firestore-reference'

export async function findSubmissionOwnerId(
  submissionId: string
): Promise<string | undefined> {
  const submissionDocument = await getDoc(submissionRef(submissionId))

  if (submissionDocument.exists()) {
    return submissionDocument.data().userId
  }
}
