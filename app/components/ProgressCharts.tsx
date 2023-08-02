import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Pie } from 'react-chartjs-2'
import { mergeProgress, Progress, ProgressMap } from '../utils/progress'

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
  progressMap,
}: {
  progressMap: ProgressMap
}) => {
  const warmAndEasy = mergeProgress(progressMap.warm, progressMap.easy)
  return (
    <SimpleGrid minChildWidth={'160px'} spacing={12} mt="8">
      <Box>
        <Pie
          data={progressToPieChartData(warmAndEasy)}
          options={chartOptions}
        />
        <Stack mt="4">
          <Text align="center" fontWeight={'bold'} fontSize="lg">
            Warmup & Easy
          </Text>
          <Text align="center">
            {warmAndEasy.acceptedCount} / {warmAndEasy.totalCount}
          </Text>
        </Stack>
      </Box>
      <Box>
        <Pie
          data={progressToPieChartData(progressMap.medium)}
          options={chartOptions}
        />
        <Stack mt="4">
          <Text align="center" fontWeight={'bold'} fontSize="lg">
            Medium
          </Text>
          <Text align="center">
            {progressMap.medium.acceptedCount} / {progressMap.medium.totalCount}
          </Text>
        </Stack>
      </Box>
      <Box>
        <Pie
          data={progressToPieChartData(progressMap.hard)}
          options={chartOptions}
        />
        <Stack mt="4">
          <Text align="center" fontWeight={'bold'} fontSize="lg">
            Hard
          </Text>
          <Text align="center">
            {progressMap.hard.acceptedCount} / {progressMap.hard.totalCount}
          </Text>
        </Stack>
      </Box>
      <Box>
        <Pie
          data={progressToPieChartData(progressMap.extreme)}
          options={chartOptions}
        />
        <Stack mt="4">
          <Text align="center" fontWeight={'bold'} fontSize="lg">
            Extreme
          </Text>
          <Text align="center">
            {progressMap.extreme.acceptedCount} /{' '}
            {progressMap.extreme.totalCount}
          </Text>
        </Stack>
      </Box>
    </SimpleGrid>
  )
}
