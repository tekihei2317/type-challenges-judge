import { getDocs } from 'firebase/firestore'
import { ProblemResultDocument } from '../model'
import { userProblemResultsRef } from '../utils/firestore-reference'

export async function fetchProblemResults(
  userId: string
): Promise<ProblemResultDocument[]> {
  const querySnapshot = await getDocs(userProblemResultsRef(userId))

  return querySnapshot.docs.map((documentSnap) => {
    const data = documentSnap.data() as ProblemResultDocument
    return { problem_id: documentSnap.id, ...data }
  })
}
