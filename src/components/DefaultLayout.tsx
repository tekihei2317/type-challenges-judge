import {
  Box,
  Flex,
  Text,
  Container,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { User } from '../model'

type LoginMenuProps = {
  handleLogin: () => void
}
const LoginMenu = ({ handleLogin }: LoginMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Button} onClick={handleLogin}>
        GitHubでログイン
      </MenuButton>
    </Menu>
  )
}

type ProfileMenuProps = {
  user: User | undefined
  handleLogout: () => void
}
const ProfileMenu = ({ user, handleLogout }: ProfileMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Button}>{user?.screenName}</MenuButton>
      <MenuList>
        <MenuItem>プロフィール</MenuItem>
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  )
}

type DefaultLayoutProps = {
  children: React.ReactNode
}
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { user, isLoggedIn, handleLogin, handleLogout } = useAuth()

  return (
    <Box>
      <Box py={'2'} borderBottom={'1px'} borderColor={'gray.300'} mb={'4'}>
        <Container maxW={'container.xl'}>
          <Flex justify={'space-between'}>
            <Text fontSize="2xl" fontWeight={'bold'}>
              Type Challenges Judge
            </Text>
            {isLoggedIn ? (
              <LoginMenu handleLogin={handleLogin} />
            ) : (
              <ProfileMenu user={user} handleLogout={handleLogout} />
            )}
          </Flex>
        </Container>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
