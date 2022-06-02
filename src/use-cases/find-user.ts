import { doc, getDoc } from 'firebase/firestore'
import { collectionName, User, UserDocument } from '../model'
import { db } from '../utils/firebase'

export async function findUser(userId: string): Promise<User> {
  const docRef = doc(db, collectionName.users, userId)
  const userDocument = (await getDoc(docRef)).data() as UserDocument

  return { ...userDocument, userId }
}
