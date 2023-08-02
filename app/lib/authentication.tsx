import {
  Auth,
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useMemo } from 'react'
import { User } from '../model'
import { auth } from './firebase'

type FirebaseContextValue = {
  auth?: Auth
}
type UserContextValue = {
  user?: User
}

const FirebaseContext = createContext<FirebaseContextValue>({})
const UserContext = createContext<UserContextValue>({})

type AppProvierProps = {
  user: User | undefined
  children: React.ReactNode
}

export const AuthProvider = ({ children, user }: AppProvierProps) => {
  return (
    <FirebaseContext.Provider value={{ auth }}>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </FirebaseContext.Provider>
  )
}

type UseAuthReturn = {
  user: User | undefined
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
  isLoggedIn: boolean
}

type CreateUseAuthHookInput = {
  login: (input: { idToken: string; screenName: string }) => Promise<void>
  logout: () => Promise<void>
}

const provider = new GithubAuthProvider()

export function createUseAuthHook({ login, logout }: CreateUseAuthHookInput) {
  return function useAuth(): UseAuthReturn {
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
}
