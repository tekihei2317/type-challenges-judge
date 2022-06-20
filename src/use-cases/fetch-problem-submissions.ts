import {
  collection,
  getDocs,
  orderBy,
  startAt,
  query,
  limit,
  where,
} from 'firebase/firestore'
import { ProblemSubmissionDocument } from '../model'
import { db } from '../utils/firebase'

export async function fetchProblemSubmissions(
  problemId: string,
  page: number,
  pageLimit: number,
  totalPage: number,
  screenName?: string
): Promise<ProblemSubmissionDocument[]> {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')

  const submissionsQuery =
    screenName === undefined
      ? query(
          submissionsRef,
          orderBy('order', 'desc'),
          startAt((totalPage - page + 1) * pageLimit),
          limit(pageLimit)
        )
      : query(
          submissionsRef,
          where('user.screenName', '==', screenName),
          orderBy('order', 'desc')
        )

  const querySnapshot = await getDocs(submissionsQuery)

  return querySnapshot.docs.map((doc) => {
    const submissionDocument = doc.data() as ProblemSubmissionDocument
    return { ...submissionDocument, id: doc.id }
  })
}
