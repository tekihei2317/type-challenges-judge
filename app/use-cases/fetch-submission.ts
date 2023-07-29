import { doc, getDoc } from 'firebase/firestore'
import {
  collectionName as CN,
  Submission,
  UserSubmissionDocument,
} from '../model'
import { db } from '../utils/firebase'
import { fetchProblem } from './fetch-problem'
import { findUser } from './find-user'

export async function fetchSubmission(
  userId: string,
  submissionId: string
): Promise<Submission | undefined> {
  const docRef = doc(db, CN.users, userId, CN.submissions, submissionId)
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    const documentData = snapshot.data() as UserSubmissionDocument

    const user = await findUser(userId)
    const problem = await fetchProblem(documentData.problemId)

    return { id: submissionId, user, problem, ...documentData }
  }
}
