import { Box, Button, Container, Text } from '@chakra-ui/react'
import {
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useContext } from 'react'
import { FirebaseContext, UserContext } from '../contexts'
import { User } from '../model'
import { writeUser } from '../use-cases/write-user'

const provider = new GithubAuthProvider()

export const IndexPage = () => {
  const { auth } = useContext(FirebaseContext)
  const { user, setUser } = useContext(UserContext)

  if (auth === undefined) {
    throw new Error('auth is not provided.')
  }
  if (setUser === undefined) {
    throw new Error('setUser is not provided.')
  }

  const handleLogin = () => {
    signInWithPopup(auth, provider)
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

  return (
    <Container maxW={'container.xl'}>
      <Text fontSize="2xl" fontWeight={'bold'}>
        Type Challenges Judge
      </Text>
      <Box>
        <Button onClick={handleLogin}>GitHubでログイン</Button>
        <Button onClick={() => signOut(auth)}>ログアウト</Button>
        <>{user?.screenName}</>
      </Box>
    </Container>
  )
}
