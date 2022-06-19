import { Box, Container, SimpleGrid, Text, Stack } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

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

export const ProgressPage = () => {
  const progressList: Progress[] = [
    {
      difficulty: 'easy',
      acceptedCount: 2,
      wrongAnswerCount: 1,
      totalCount: 20,
    },
  ]

  return (
    <Container maxW="container.xl">
      <Text fontSize="xl" fontWeight="bold">
        挑戦結果
      </Text>
      <SimpleGrid minChildWidth={'160px'} spacing={12} mt="8">
        <Box>
          <Pie data={progressToPieChartData(progressList[0])} />
          <Stack mt="4">
            <Text align="center" fontWeight={'bold'} fontSize="lg">
              Warmup & Easy
            </Text>
            <Text align="center">3 / 10</Text>
          </Stack>
        </Box>
        <Box>
          <Pie data={progressToPieChartData(progressList[0])} />
        </Box>
        <Box>
          <Pie data={progressToPieChartData(progressList[0])} />
        </Box>
        <Box>
          <Pie data={progressToPieChartData(progressList[0])} />
        </Box>
      </SimpleGrid>
    </Container>
  )
}
