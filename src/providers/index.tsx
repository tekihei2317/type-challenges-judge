import React, { useState } from 'react'
import { User } from '../model'
import { FirebaseContext, UserContext } from '../contexts'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

type AppProvierProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProvierProps) => {
  const [user, setUser] = useState<User>()

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // sign in
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
