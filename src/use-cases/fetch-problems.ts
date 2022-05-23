import { collectionName, Problem } from './../model'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/firebase'

export async function fetchProblems(): Promise<Problem[]> {
  const querySnapshot = await getDocs(collection(db, collectionName.problems))

  return querySnapshot.docs.map((problemSnap) => problemSnap.data() as Problem)
}
