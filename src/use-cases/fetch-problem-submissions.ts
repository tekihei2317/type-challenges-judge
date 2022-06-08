import { collection, getDocs } from 'firebase/firestore'
import { ProblemSubmissionDocument } from '../model'
import { db } from '../utils/firebase'

export async function fetchProblemSubmissions(
  problemId: string
): Promise<ProblemSubmissionDocument[]> {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')
  const querySnapshot = await getDocs(submissionsRef)

  return querySnapshot.docs.map((doc) => {
    const submissionDocument = doc.data() as ProblemSubmissionDocument
    return submissionDocument
  })
}
