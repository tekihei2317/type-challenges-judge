import { doc, getDoc } from 'firebase/firestore'
import { collectionName, User } from '../model'
import { db } from '../utils/firebase'

export async function findUser(userId: string) {
  const docRef = doc(db, collectionName.users, userId)
  const user = (await getDoc(docRef)).data() as User

  return user
}
