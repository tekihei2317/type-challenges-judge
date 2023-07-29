import { doc, getDoc } from 'firebase/firestore'
import { collectionName, Problem } from '../model'
import { db } from '../utils/firebase'

export async function fetchProblem(problemId: string): Promise<Problem> {
  const problemRef = await getDoc(doc(db, collectionName.problems, problemId))

  return problemRef.data() as Problem
}
