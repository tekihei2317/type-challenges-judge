import {
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useContext, useMemo } from 'react'
import { FirebaseContext, UserContext } from '../utils/context'

const provider = new GithubAuthProvider()

async function login(body: { idToken: string; screenName: string }) {
  return await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

async function logout() {
  return await fetch('/api/logout', {
    method: 'POST',
  })
}

export const useAuth = () => {
  const { auth: firebaseAuth } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)

  if (firebaseAuth === undefined) {
    throw new Error('auth is not provided.')
  }

  const handleLogin = () => {
    return signInWithPopup(firebaseAuth, provider).then(async (result) => {
      const userInfo = getAdditionalUserInfo(result)
      if (userInfo === null) return

      await login({
        idToken: await result.user.getIdToken(true),
        // FIXME: エミュレータでは名前が取得できなかったため、適当な値を入れている
        screenName: userInfo.username ?? 'test_user',
      })
    })
  }
  const handleLogout = async () => {
    signOut(firebaseAuth)
    await logout()
  }
  const isLoggedIn = useMemo(() => user !== undefined, [user])

  return { user, handleLogin, handleLogout, isLoggedIn }
}
