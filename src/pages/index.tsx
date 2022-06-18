import { useState, useEffect, useMemo } from 'react'
import { Container } from '@chakra-ui/react'
import {
  Problem,
  ProblemDifficulty,
  ProblemResultDocument,
  ProblemResultStatus,
} from '../model'
import { fetchProblems } from '../use-cases/fetch-problems'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'
import { useAuth } from '../hooks/useAuth'
import { ProblemList } from '../components/ProblemsList'

const difficultyFilter =
  (difficulty: ProblemDifficulty) => (problem: Problem) =>
    problem.difficulty === difficulty

export type ProblemStatusMap = {
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
      <ProblemList
        warmupProblems={warmupProblems}
        easyProblems={easyProblems}
        mediumProblems={mediumProblems}
        hardProblems={hardProblems}
        extremeProblems={extremeProblems}
        statusMap={problemStatusMap}
      />
    </Container>
  )
}
