import { Box, Container, SimpleGrid, Text, Stack } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useAuth } from '../hooks/useAuth'
import { countProblemsByDifficulty } from '../use-cases/count-problems-by-difficulty'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'
import { Progress, convertToProgress } from '../utils/progress'

ChartJS.register(ArcElement, Tooltip, Legend)

function progressToPieChartData(progress: Progress) {
  return {
    labels: ['Accepted', 'Wrong Answer', 'Unchallenged'],
    datasets: [
      {
        data: [
          progress.acceptedCount,
          progress.wrongAnswerCount,
          progress.totalCount -
            (progress.acceptedCount + progress.wrongAnswerCount),
        ],
        backgroundColor: [
          '#9ae6b4', // green.200
          '#fefcbf', // yellow.100
          '#edf2f7', // gray.100
        ],
      },
    ],
  }
}

const chartOptions = { plugins: { legend: { display: false } } }

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
    <Container maxW="container.xl">
      <Text fontSize="xl" fontWeight="bold">
        挑戦結果
      </Text>
      {progressList.length === 0 ? (
        <></>
      ) : (
        <SimpleGrid minChildWidth={'160px'} spacing={12} mt="8">
          <Box>
            <Pie
              data={progressToPieChartData(progressList[0])}
              options={chartOptions}
            />
            <Stack mt="4">
              <Text align="center" fontWeight={'bold'} fontSize="lg">
                Warmup & Easy
              </Text>
              <Text align="center">
                {progressList[0].acceptedCount} / {progressList[0].totalCount}
              </Text>
            </Stack>
          </Box>
          <Box>
            <Pie
              data={progressToPieChartData(progressList[1])}
              options={chartOptions}
            />
            <Stack mt="4">
              <Text align="center" fontWeight={'bold'} fontSize="lg">
                Medium
              </Text>
              <Text align="center">
                {progressList[1].acceptedCount} / {progressList[1].totalCount}
              </Text>
            </Stack>
          </Box>
          <Box>
            <Pie
              data={progressToPieChartData(progressList[2])}
              options={chartOptions}
            />
            <Stack mt="4">
              <Text align="center" fontWeight={'bold'} fontSize="lg">
                Hard
              </Text>
              <Text align="center">
                {progressList[2].acceptedCount} / {progressList[2].totalCount}
              </Text>
            </Stack>
          </Box>
          <Box>
            <Pie
              data={progressToPieChartData(progressList[3])}
              options={chartOptions}
            />
            <Stack mt="4">
              <Text align="center" fontWeight={'bold'} fontSize="lg">
                Extreme
              </Text>
              <Text align="center">
                {progressList[3].acceptedCount} / {progressList[3].totalCount}
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>
      )}
    </Container>
  )
}
