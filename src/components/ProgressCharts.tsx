import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Pie } from 'react-chartjs-2'
import { Progress } from '../utils/progress'

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

export const ProgressCharts = ({
  progressList,
}: {
  progressList: Progress[]
}) => {
  return (
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
  )
}
