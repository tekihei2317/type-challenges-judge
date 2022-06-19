import { Box, Container, SimpleGrid, Text, Stack } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useAuth } from '../hooks/useAuth'
import { ProblemDifficulty, ProblemResultDocument } from '../model'
import { fetchProblemResults } from '../use-cases/fetch-problem-results'

ChartJS.register(ArcElement, Tooltip, Legend)

type Progress = {
  difficulty: string
  acceptedCount: number
  wrongAnswerCount: number
  totalCount: number
}

function progressToPieChartData(progress: Progress) {
  return {
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

function defaultProgress(difficulty: string): Progress {
  return { difficulty, acceptedCount: 0, wrongAnswerCount: 0, totalCount: 10 }
}

function difficultyToIndex(difficulty: ProblemDifficulty) {
  if (difficulty === 'warm') return 0
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  if (difficulty === 'hard') return 2
  return 3
}

function convertToProgress(results: ProblemResultDocument[]): Progress[] {
  const progressList = [
    defaultProgress('easy'),
    defaultProgress('medium'),
    defaultProgress('hard'),
    defaultProgress('extreme'),
  ]

  results.forEach((result) => {
    const index = difficultyToIndex(result.problem_difficulty)
    const prop =
      result.status === 'Accepted' ? 'acceptedCount' : 'wrongAnswerCount'
    progressList[index][prop]++
  })

  return progressList
}

export const ProgressPage = () => {
  const { user } = useAuth()
  const [progressList, setProgressList] = useState<Progress[]>([])

  useEffect(() => {
    if (user !== undefined) {
      fetchProblemResults(user.userId).then((documents) =>
        setProgressList(convertToProgress(documents))
      )
    }
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
            <Pie data={progressToPieChartData(progressList[0])} />
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
            <Pie data={progressToPieChartData(progressList[1])} />
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
            <Pie data={progressToPieChartData(progressList[2])} />
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
            <Pie data={progressToPieChartData(progressList[3])} />
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
