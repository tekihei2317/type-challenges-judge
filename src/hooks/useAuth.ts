import {
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useContext, useMemo } from 'react'
import { FirebaseContext, UserContext } from '../utils/context'
import { User } from '../model'
import { writeUser } from '../use-cases/write-user'

const provider = new GithubAuthProvider()

export const useAuth = () => {
  const { auth: firebaseAuth } = useContext(FirebaseContext)
  const { user, setUser } = useContext(UserContext)

  if (firebaseAuth === undefined) {
    throw new Error('auth is not provided.')
  }
  if (setUser === undefined) {
    throw new Error('setUser is not provided.')
  }

  const handleLogin = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const userInfo = getAdditionalUserInfo(result)
        if (userInfo === null) return

        const user: User = {
          screenName: userInfo.username as string,
        }
        writeUser(result.user.uid, user)

        setUser(user)
      })
      .catch(() => {
        // TODO:
      })
  }
  const handleLogout = () => signOut(firebaseAuth)
  const isLoggedIn = useMemo(() => user !== undefined, [user])

  return { user, setUser, handleLogin, handleLogout, isLoggedIn }
}
