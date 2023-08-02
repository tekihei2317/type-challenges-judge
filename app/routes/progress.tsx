import { Container, Text } from '@chakra-ui/react'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { fetchUserProgress } from '../../server/fetch-user-progress'
import { ProgressCharts } from '../components/ProgressCharts'

ChartJS.register(ArcElement, Tooltip, Legend)

export async function loader({ context }: LoaderArgs) {
  const progressMap = await fetchUserProgress(context.env.DB, context.user)

  return json({ progressMap })
}

export default function ProgressPage() {
  const { progressMap } = useLoaderData<typeof loader>()

  return (
    <Container maxW="container.xl" pt={8}>
      <Text fontSize="xl" fontWeight="bold">
        挑戦結果
      </Text>
      <ProgressCharts progressMap={progressMap} />
    </Container>
  )
}
