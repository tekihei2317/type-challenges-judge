import { useState, useEffect, useMemo } from 'react'
import { Container } from '@chakra-ui/react'
import {
  Problem,
  ProblemDifficulty,
  ProblemResultDocument,
  ProblemResultStatus,
} from '../model'
import { fetchProblems } from '../../server/fetch-problems'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'
import { useAuth } from '../hooks/useAuth'
import { ProblemList } from '../components/ProblemsList'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

const difficultyFilter =
  (difficulty: ProblemDifficulty) => (problem: Problem) =>
    problem.difficulty === difficulty

type ProblemStatusMap = {
  [problemId: string]: ProblemResultStatus
}

export async function loader({ context }: LoaderArgs) {
  const problems = await fetchProblems(context.env.DB)

  return json({ problems })
}

export default function IndexPage() {
  const { user } = useAuth()
  const { problems } = useLoaderData<typeof loader>()
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
      if (user !== undefined) {
        // TODO:
        // fetchProblemResults(user.userId).then((data) => setProblemResults(data))
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
    <Container maxW={'container.xl'} pt={8}>
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
