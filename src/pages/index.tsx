import { useState, useEffect, useMemo } from 'react'
import { Container, Stack, Text, Wrap, Button } from '@chakra-ui/react'
import { Problem, ProblemDifficulty } from '../model'
import { fetchProblems } from '../use-cases/fetch-problems'
import { Link } from 'react-router-dom'

const difficultyFilter =
  (difficulty: ProblemDifficulty) => (problem: Problem) =>
    problem.difficulty === difficulty

export const IndexPage = () => {
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    const loadData = async () => {
      const problemsData = await fetchProblems()
      setProblems(problemsData)
    }

    loadData()
  }, [])

  const warmupProblems = useMemo(
    () => problems.filter(difficultyFilter('warm')),
    [problems]
  )
  const easyProblems = useMemo(
    () => problems.filter(difficultyFilter('easy')),
    [problems]
  )
  const mediumProblems = useMemo(
    () => problems.filter(difficultyFilter('medium')),
    [problems]
  )
  const hardProblems = useMemo(
    () => problems.filter(difficultyFilter('hard')),
    [problems]
  )
  const extremeProblems = useMemo(
    () => problems.filter(difficultyFilter('extreme')),
    [problems]
  )

  return (
    <Container maxW={'container.xl'}>
      <Stack spacing={8} mt={8}>
        <Stack p={1}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Warmup
          </Text>
          <Wrap p={1}>
            {warmupProblems.map((problem, index) => (
              <Link to={`/problems/${problem.id}`} key={index}>
                <Button>{problem.title}</Button>
              </Link>
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Easy
          </Text>
          <Wrap p={1}>
            {easyProblems.map((problem, index) => (
              <Link to={`/problems/${problem.id}`} key={index}>
                <Button>{problem.title}</Button>
              </Link>
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Medium
          </Text>
          <Wrap p={1}>
            {mediumProblems.map((problem, index) => (
              <Link to={`/problems/${problem.id}`} key={index}>
                <Button>{problem.title}</Button>
              </Link>
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Hard
          </Text>
          <Wrap p={1}>
            {hardProblems.map((problem, index) => (
              <Link to={`/problems/${problem.id}`} key={index}>
                <Button>{problem.title}</Button>
              </Link>
            ))}
          </Wrap>
        </Stack>
        <Stack p={1}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Extreme
          </Text>
          <Wrap p={1}>
            {extremeProblems.map((problem, index) => (
              <Link to={`/problems/${problem.id}`} key={index}>
                <Button>{problem.title}</Button>
              </Link>
            ))}
          </Wrap>
        </Stack>
      </Stack>
    </Container>
  )
}
