import { getDoc } from 'firebase/firestore'
import { ProblemSubmissionDocument, User } from '../model'
import { problemSubmissionRef } from '../utils/firestore-reference'

export async function findSubmissionOwner(
  problemId: string,
  submissionId: string
): Promise<User | undefined> {
  const submissionDocument = await getDoc(
    problemSubmissionRef(problemId, submissionId)
  )

  if (submissionDocument.exists()) {
    const data = submissionDocument.data() as ProblemSubmissionDocument
    return data.user
  }
}
