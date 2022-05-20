import React, { useState } from 'react'
import { User } from '../model'
import { FirebaseContext, UserContext } from '../utils/context'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { findUser } from '../use-cases/find-user'

type AppProvierProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProvierProps) => {
  const [user, setUser] = useState<User>()

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // sign in
      const user = await findUser(firebaseUser.uid)
      setUser(user)
    } else {
      // sign out
      setUser(undefined)
    }
  })

  return (
    <ChakraProvider>
      <FirebaseContext.Provider value={{ auth }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>{children}</BrowserRouter>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ChakraProvider>
  )
}
