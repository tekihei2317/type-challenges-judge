import { addDoc, collection } from 'firebase/firestore'
import { UnvalidatedSubmission, collectionName as CN } from '../model'
import { db } from '../utils/firebase'

/**
 * Submit user's solution
 */
export async function createSubmission(
  userId: string,
  submission: UnvalidatedSubmission
) {
  console.log({ userId, submission })
  const submissionsRef = collection(db, CN.users, userId, CN.submissinos)
  await addDoc(submissionsRef, submission)

  // TODO:
  // const submissionRef = await addDoc(submissionsRef, submission)
  // const submissionDocument: UserSubmsisionDocument = (
  //   await getDoc(submissionRef)
  // ).data()
  // return submissionDocument
}
