import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../utils/firebase'

export async function countProblemSubmissions(problemId: string) {
  const submissionsRef = collection(db, 'problems', problemId, 'submissions')
  const q = query(submissionsRef, orderBy('order', 'desc'), limit(1))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.docs.length === 0) {
    return 0
  }

  // 0-indexedなので+1する
  return querySnapshot.docs[0].data().order + 1
}
