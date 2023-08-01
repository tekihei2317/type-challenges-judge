import React, { useEffect, useState } from 'react'
import { User } from '../model'
import { FirebaseContext, UserContext } from '../utils/context'
import { ChakraProvider } from '@chakra-ui/react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { findUser } from '../use-cases/find-user'

type AppProvierProps = {
  user: User | undefined
  children: React.ReactNode
}

export const AppProvider = ({ children, user }: AppProvierProps) => {
  return (
    <ChakraProvider>
      <FirebaseContext.Provider value={{ auth }}>
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
      </FirebaseContext.Provider>
    </ChakraProvider>
  )
}
