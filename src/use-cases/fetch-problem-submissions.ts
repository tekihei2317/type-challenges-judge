import {
  collection,
  getDocs,
  orderBy,
  startAt,
  query,
  limit,
} from 'firebase/firestore'
import { ProblemSubmissionDocument } from '../model'
import { db } from '../utils/firebase'

export async function fetchProblemSubmissions(
  problemId: string,
  page = 1,
  pageLimit = 20
): Promise<ProblemSubmissionDocument[]> {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')
  const submissionsQuery = query(
    submissionsRef,
    orderBy('order'),
    startAt((page - 1) * pageLimit),
    limit(20)
  )
  const querySnapshot = await getDocs(submissionsQuery)

  return querySnapshot.docs.map((doc) => {
    const submissionDocument = doc.data() as ProblemSubmissionDocument
    return submissionDocument
  })
}
