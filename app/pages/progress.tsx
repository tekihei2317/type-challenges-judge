import { Container, Text } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { ProgressCharts } from '../components/ProgressCharts'
import { useAuth } from '../hooks/useAuth'
import { countProblemsByDifficulty } from '../use-cases/count-problems-by-difficulty'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'
import { Progress, convertToProgress } from '../utils/progress'

ChartJS.register(ArcElement, Tooltip, Legend)

export const ProgressPage = () => {
  const { user } = useAuth()
  const [progressList, setProgressList] = useState<Progress[]>([])

  useEffect(() => {
    const setData = async () => {
      const problemCounts = await countProblemsByDifficulty()
      const documents =
        user === undefined ? [] : await fetchProblemResults(user.userId)

      setProgressList(convertToProgress(problemCounts, documents))
    }
    setData()
  }, [user])

  return (
    <Container maxW="container.xl" pt={8}>
      <Text fontSize="xl" fontWeight="bold">
        挑戦結果
      </Text>
      {progressList.length === 0 ? (
        <></>
      ) : (
        <ProgressCharts progressList={progressList} />
      )}
    </Container>
  )
}
