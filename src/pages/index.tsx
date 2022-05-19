import { Box, Button, Container } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { useAuth } from '../hooks/useAuth'

export const IndexPage = () => {
  const { user, handleLogin, handleLogout } = useAuth()

  return (
    <DefaultLayout>
      <Container maxW={'container.xl'}>
        <Box>
          <Button onClick={handleLogin}>GitHubでログイン</Button>
          <Button onClick={handleLogout}>ログアウト</Button>
          <>{user?.screenName}</>
        </Box>
      </Container>
    </DefaultLayout>
  )
}
