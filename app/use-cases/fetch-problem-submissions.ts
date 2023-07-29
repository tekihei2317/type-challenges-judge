import {
  collection,
  getDocs,
  orderBy,
  startAt,
  query,
  limit,
  where,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore'
import { ProblemSubmissionDocument } from '../model'
import { db } from '../utils/firebase'

async function calculateMaxOrder(
  submissionsRef: CollectionReference<DocumentData>
) {
  const submissionsQuery = query(
    submissionsRef,
    orderBy('order', 'desc'),
    limit(1)
  )
  const documents = await getDocs(submissionsQuery)

  if (documents.empty) return -1
  else {
    const submission = documents.docs[0].data() as ProblemSubmissionDocument
    return submission.order
  }
}

async function makeSubmissionQuery(
  problemId: string,
  page: number,
  pageLimit: number,
  screenName?: string
) {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')
  if (screenName !== undefined) {
    // 検索するとページングができないため、全件返す
    return query(
      submissionsRef,
      where('user.screenName', '==', screenName),
      orderBy('order', 'desc')
    )
  }

  const maxOrder = await calculateMaxOrder(submissionsRef)

  return query(
    submissionsRef,
    orderBy('order', 'desc'),
    startAt(maxOrder - pageLimit * (page - 1)),
    limit(pageLimit)
  )
}

export async function fetchProblemSubmissions(
  problemId: string,
  page: number,
  pageLimit: number,
  screenName?: string
): Promise<ProblemSubmissionDocument[]> {
  const submissionsQuery = await makeSubmissionQuery(
    problemId,
    page,
    pageLimit,
    screenName
  )
  const querySnapshot = await getDocs(submissionsQuery)

  return querySnapshot.docs.map((doc) => {
    const submissionDocument = doc.data() as ProblemSubmissionDocument
    return { ...submissionDocument, id: doc.id }
  })
}
