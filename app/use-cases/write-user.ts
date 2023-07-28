import { doc, setDoc } from 'firebase/firestore'
import { collectionName, User } from '../model'
import { db } from '../utils/firebase'

/**
 * create or update user document
 */
export const writeUser = (uid: string, user: User) => {
  const userRef = doc(db, collectionName.users, uid)

  setDoc(userRef, user)
}
