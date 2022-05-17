import { Text, Stack, Button, Wrap, Container } from '@chakra-ui/react'
import { useState } from 'react'
import './App.css'

type Problem = {
  name: string
}

const App = () => {
  const [problems] = useState<Problem[]>([
    { name: 'Pick' },
    { name: 'Readonly' },
    { name: 'Tuple to Object' },
    { name: 'First of Array' },
    { name: 'Length of Tuple' },
    { name: 'Exclude' },
    { name: 'Pick' },
    { name: 'Readonly' },
    { name: 'Tuple to Object' },
    { name: 'First of Array' },
    { name: 'Length of Tuple' },
    { name: 'Exclude' },
  ])

  return (
    <Container maxW="container.xl">
      <Text fontSize="2xl" fontWeight={'bold'}>
        問題一覧
      </Text>
      <Stack spacing={8} mt={8}>
        <Stack p={1}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Easy
          </Text>
          <Wrap>
            {problems.map((problem, index) => (
              <Button key={index}>{problem.name}</Button>
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Medium
          </Text>
          <Wrap p={1}>
            {problems.map((problem, index) => (
              <Button key={index}>{problem.name}</Button>
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Hard
          </Text>
          <Wrap p={1}>
            {problems.map((problem, index) => (
              <Button key={index}>{problem.name}</Button>
            ))}
          </Wrap>
        </Stack>
      </Stack>
    </Container>
  )
}

export default App
