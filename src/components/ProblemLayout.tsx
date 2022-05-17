import { Container, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const ProblemLayout = () => {
  return (
    <Container maxW={'container.xl'}>
      <Text fontSize="2xl" fontWeight={'bold'}>
        問題
      </Text>
      <Outlet />
    </Container>
  )
}
