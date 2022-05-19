import { doc, setDoc } from 'firebase/firestore'
import { User } from '../model'
import { db } from '../utils/firebase'

/**
 * create or update user document
 */
export const writeUser = (uid: string, user: User) => {
  const userRef = doc(db, 'user', uid)

  setDoc(userRef, user)
}
