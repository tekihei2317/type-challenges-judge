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
  page: number,
  pageLimit: number,
  totalPage: number
): Promise<ProblemSubmissionDocument[]> {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')
  const submissionsQuery = query(
    submissionsRef,
    orderBy('order', 'desc'),
    startAt((totalPage - page + 1) * pageLimit),
    limit(pageLimit)
  )
  const querySnapshot = await getDocs(submissionsQuery)

  return querySnapshot.docs.map((doc) => {
    const submissionDocument = doc.data() as ProblemSubmissionDocument
    return { ...submissionDocument, id: doc.id }
  })
}
