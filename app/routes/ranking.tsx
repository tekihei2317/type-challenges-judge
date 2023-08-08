import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { fetchRankings } from '../../server/fetch-rankings'
import { useAuth } from '../hooks/use-auth'

export async function loader({ context }: LoaderArgs) {
  const rankings = await fetchRankings(context.env.DB, context.env.KV)

  return json({ rankings })
}

export default function Ranking() {
  const { rankings } = useLoaderData<typeof loader>()
  const { user } = useAuth()

  return (
    <Container maxW="container.xl" pt={8} pb={16}>
      <Text fontSize="xl" fontWeight="bold">
        ランキング
      </Text>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>ユーザー名</Th>
              <Th>正解数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rankings.map((ranking) => (
              <Tr
                key={ranking.userId}
                backgroundColor={
                  ranking.userId === user?.userId ? 'green.100' : undefined
                }
              >
                <Td>{ranking.userRank}</Td>
                <Td>{ranking.screenName}</Td>
                <Td>{ranking.acceptedCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}
