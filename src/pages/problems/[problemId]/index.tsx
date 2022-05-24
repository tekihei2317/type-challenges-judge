import { Container, Text } from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../components/ProblemLayout'

export const ProblemPage = () => {
  const { problem } = useOutletContext<ProblemLayoutContext>()

  return (
    <Container maxW={'container.xl'}>
      <Text>{problem?.content}</Text>
    </Container>
  )
}
