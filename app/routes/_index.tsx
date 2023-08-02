import { useMemo } from 'react'
import { Container } from '@chakra-ui/react'
import { Problem, ProblemDifficulty, ProblemResultStatus } from '../model'
import { fetchProblems } from '../../server/fetch-problems'
import { fetchChallengeResults } from '../../server/fetch-challenge-results'
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
  const [problems, challengeResults] = await Promise.all([
    fetchProblems(context.env.DB),
    fetchChallengeResults(context.env.DB, context.user?.userId),
  ])

  return json({ problems, challengeResults })
}

export default function IndexPage() {
  const { problems, challengeResults } = useLoaderData<typeof loader>()
  const problemStatusMap = useMemo<ProblemStatusMap>(
    () =>
      challengeResults.reduce((statusMap, result) => {
        if (result.problemId !== undefined) {
          statusMap[result.problemId] = result.status
        }
        return statusMap
      }, {} as ProblemStatusMap),
    [challengeResults]
  )

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
