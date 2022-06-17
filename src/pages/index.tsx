import { useState, useEffect, useMemo } from 'react'
import { Container, Stack, Text, Wrap, Box } from '@chakra-ui/react'
import {
  Problem,
  ProblemDifficulty,
  ProblemResultDocument,
  ProblemResultStatus,
} from '../model'
import { fetchProblems } from '../use-cases/fetch-problems'
import { Link } from 'react-router-dom'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'
import { useAuth } from '../hooks/useAuth'

const difficultyFilter =
  (difficulty: ProblemDifficulty) => (problem: Problem) =>
    problem.difficulty === difficulty

type ProblemButtonProps = {
  problem: Problem
  status: ProblemResultStatus | undefined
}
const ProblemButton = ({ problem, status }: ProblemButtonProps) => {
  return (
    <Link to={`/problems/${problem.id}`}>
      <Box
        w={40}
        textAlign={'left'}
        backgroundColor={'gray.100'}
        px={4}
        py={2.5}
        fontWeight={600}
        borderRadius={4}
        whiteSpace={'nowrap'}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        background={
          status === 'Accepted'
            ? 'green.200'
            : status === 'Wrong Answer'
            ? 'yellow.100'
            : undefined
        }
      >
        {problem.title}
      </Box>
    </Link>
  )
}

type ProblemStatusMap = {
  [problemId: string]: ProblemResultStatus
}

export const IndexPage = () => {
  const { user } = useAuth()
  const [problems, setProblems] = useState<Problem[]>([])
  const [problemResults, setProblemResults] = useState<ProblemResultDocument[]>(
    []
  )
  const problemStatusMap = useMemo<ProblemStatusMap>(
    () =>
      problemResults.reduce((statusMap, result) => {
        if (result.problem_id !== undefined) {
          statusMap[result.problem_id] = result.status
        }
        return statusMap
      }, {} as ProblemStatusMap),
    [problemResults]
  )

  useEffect(() => {
    const loadData = () => {
      fetchProblems().then((data) => setProblems(data))
      if (user !== undefined) {
        fetchProblemResults(user.userId).then((data) => setProblemResults(data))
      }
    }

    loadData()
  }, [user])

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
            {warmupProblems.map((problem) => (
              <ProblemButton
                problem={problem}
                status={problemStatusMap[problem.id]}
                key={problem.id}
              />
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Easy
          </Text>
          <Wrap p={1}>
            {easyProblems.map((problem) => (
              <ProblemButton
                problem={problem}
                status={problemStatusMap[problem.id]}
                key={problem.id}
              />
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Medium
          </Text>
          <Wrap p={1}>
            {mediumProblems.map((problem) => (
              <ProblemButton
                problem={problem}
                status={problemStatusMap[problem.id]}
                key={problem.id}
              />
            ))}
          </Wrap>
        </Stack>
        <Stack>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Hard
          </Text>
          <Wrap p={1}>
            {hardProblems.map((problem) => (
              <ProblemButton
                problem={problem}
                status={problemStatusMap[problem.id]}
                key={problem.id}
              />
            ))}
          </Wrap>
        </Stack>
        <Stack p={1}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Extreme
          </Text>
          <Wrap p={1}>
            {extremeProblems.map((problem) => (
              <ProblemButton
                problem={problem}
                status={problemStatusMap[problem.id]}
                key={problem.id}
              />
            ))}
          </Wrap>
        </Stack>
      </Stack>
    </Container>
  )
}
