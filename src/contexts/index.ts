import { Auth } from 'firebase/auth'
import { createContext } from 'react'
import { User } from '../model'

type FirebaseContextValue = {
  auth?: Auth
}
type UserContextValue = {
  user?: User
  setUser?: (user: User) => void
}

export const FirebaseContext = createContext<FirebaseContextValue>({})
export const UserContext = createContext<UserContextValue>({})
