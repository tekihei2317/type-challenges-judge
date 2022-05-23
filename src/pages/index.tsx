import { useState, useEffect, useMemo } from 'react'
import { Container } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { Problem, ProblemDifficulty } from '../model'
import { fetchProblems } from '../use-cases/fetch-problems'

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

  const easyProblems = useMemo(
    () => problems.filter(difficultyFilter('easy')),
    [problems]
  )

  return (
    <DefaultLayout>
      {JSON.stringify(easyProblems.length)}
      <Container maxW={'container.xl'}>トップページ</Container>
    </DefaultLayout>
  )
}
