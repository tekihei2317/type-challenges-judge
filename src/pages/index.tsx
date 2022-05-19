import { Box, Button, Container, Text } from '@chakra-ui/react'
import {
  getAdditionalUserInfo,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { User } from '../model'
import { writeUser } from '../use-cases/write-user'
import { auth } from '../utils/firebase'

const provider = new GithubAuthProvider()
provider.addScope('read:user')

export const IndexPage = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userInfo = getAdditionalUserInfo(result)

        if (userInfo === null) {
          // TODO:
          return
        }

        const user: User = {
          screenName: userInfo.username as string,
        }
        writeUser(result.user.uid, user)
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
      </Box>
    </Container>
  )
}
