import {
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useContext, useMemo } from 'react'
import { FirebaseContext, UserContext } from '../utils/context'
import { User } from '../model'

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
    signInWithPopup(firebaseAuth, provider).then(async (result) => {
      const userInfo = getAdditionalUserInfo(result)
      if (userInfo === null) return

      const user: User = {
        userId: result.user.uid,
        // FIXME: エミュレータでは名前が取得できなかったため、適当な値を入れている
        screenName: userInfo.username ?? 'test_user',
      }

      await fetch('/api/write-user', {
        method: 'POST',
        body: JSON.stringify(user),
      })

      setUser(user)
    })
  }
  const handleLogout = () => signOut(firebaseAuth)
  const isLoggedIn = useMemo(() => user !== undefined, [user])

  return { user, setUser, handleLogin, handleLogout, isLoggedIn }
}
