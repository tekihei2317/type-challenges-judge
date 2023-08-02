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
import { useAuth } from './hooks/use-auth'
import { User } from './model'
import { Link, useLocation, useRevalidator } from '@remix-run/react'
import { useMemo } from 'react'

type LoginMenuProps = {
  handleLogin: () => void
}
const LoginMenu = ({ handleLogin }: LoginMenuProps) => {
  return (
    <Box>
      <Button variant={'outline'} onClick={handleLogin}>
        GitHubでログイン
      </Button>
    </Box>
  )
}

type ProfileMenuProps = {
  user: User | undefined
  handleLogout: () => void
}
const ProfileMenu = ({ user, handleLogout }: ProfileMenuProps) => {
  return (
    <Menu placement={'bottom-end'}>
      <MenuButton as={Button}>{user?.screenName}</MenuButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  )
}

type NavigationLinkProps = {
  name: string
  path: string
}

const NavigationLink = ({ path, name }: NavigationLinkProps) => {
  const location = useLocation()
  const isActive = useMemo(() => location.pathname === path, [location, path])

  return (
    <Link to={path}>
      {isActive ? (
        <Text
          fontWeight={'bold'}
          pb={2}
          borderBottomWidth={3}
          borderBottomColor={'black'}
        >
          {name}
        </Text>
      ) : (
        <Text fontWeight={'bold'} pb={2} color={'gray.500'}>
          {name}
        </Text>
      )}
    </Link>
  )
}

type DefaultLayoutProps = {
  children: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { user, isLoggedIn, handleLogin, handleLogout } = useAuth()
  const revalidator = useRevalidator()

  return (
    <Box>
      <Box pt={'2'} borderBottom={'1px'} borderColor={'gray.300'} mb={'4'}>
        <Container maxW={'container.xl'}>
          <Flex justify={'space-between'}>
            <Link to="/">
              <Text fontSize="2xl" fontWeight={'bold'}>
                Type Challenges Judge
              </Text>
            </Link>

            {isLoggedIn ? (
              <ProfileMenu
                user={user}
                handleLogout={async () => {
                  await handleLogout()
                  // セッションのデータを再取得する
                  revalidator.revalidate()
                }}
              />
            ) : (
              <LoginMenu
                handleLogin={async () => {
                  await handleLogin()
                  // セッションのデータを再取得する
                  revalidator.revalidate()
                }}
              />
            )}
          </Flex>
          <Flex gap={4} mt={4}>
            <NavigationLink name={'Problems'} path={'/'} />
            <NavigationLink name={'Progress'} path={'/progress'} />
          </Flex>
        </Container>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
