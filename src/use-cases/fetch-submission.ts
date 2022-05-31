import { doc, getDoc } from 'firebase/firestore'
import { collectionName as CN, UserSubmissionDocument } from '../model'
import { db } from '../utils/firebase'

export async function fetchSubmission(
  userId: string,
  submissionId: string
): Promise<UserSubmissionDocument | undefined> {
  const docRef = doc(db, CN.users, userId, CN.submissions, submissionId)
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    const documentData = snapshot.data() as UserSubmissionDocument
    return { id: submissionId, ...documentData }
  }
}
