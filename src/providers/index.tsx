import React, { useState } from 'react'
import { User } from '../model'
import { FirebaseContext, UserContext } from '../contexts'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { auth } from '../utils/firebase'

type AppProvierProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProvierProps) => {
  const [user] = useState<User>()

  return (
    <ChakraProvider>
      <FirebaseContext.Provider value={{ auth }}>
        <UserContext.Provider value={{ user }}>
          <BrowserRouter>{children}</BrowserRouter>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ChakraProvider>
  )
}
