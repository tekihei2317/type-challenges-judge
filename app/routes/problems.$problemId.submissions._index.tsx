import {
  Stack,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Wrap,
  Button,
  Box,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import {
  Link as ReactLink,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react'
import { SubmissionStatus } from '../model'
import { fetchProblemSubmissions } from '../use-cases/fetch-problem-submissions'
import { ProblemLayoutContext } from './problems.$problemId'
import { SubmissionStatusBadge } from '../components/SubmissionStatusBadge'
import { generatePages, PageType } from '../utils/pagination'
import { Pagination } from '../components/Pagination'
import { useAuth } from '../hooks/useAuth'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'

export async function loader({ context, params }: LoaderArgs) {
  invariant(
    typeof params.problemId == 'string',
    'params.problemId must be a string'
  )
  const page = 1
  // TODO: ログインしているユーザーのIDを取得する
  const userId = undefined

  const { count, submissions } = await fetchProblemSubmissions(
    context.env.DB,
    params.problemId,
    page,
    20,
    userId
  )
  const scope = 'all'
  const currentPage = 1
  const totalPage = 10
  return json({ submissions, scope, totalPage, currentPage })
}

export default function SubmissionsPage() {
  const { user } = useAuth()
  const { scope, submissions, totalPage, currentPage } =
    useLoaderData<typeof loader>()
  const { problem } = useOutletContext<ProblemLayoutContext>()

  const pages = useMemo(
    () => generatePages(currentPage, totalPage),
    [currentPage, totalPage]
  )

  const handlePageClick = (page: PageType) => {
    if (page === 'LEFT') {
      // setCurrentPage(currentPage - 2)
    } else if (page === 'RIGHT') {
      // setCurrentPage(currentPage + 2)
    } else {
      // setCurrentPage(page)
    }
  }
  return (
    <Stack pb={24}>
      {user && (
        <Wrap p={1}>
          <Button
            colorScheme={scope === 'me' ? 'blue' : undefined}
            onClick={() => {
              // setUserType('me')
            }}
          >
            自分の提出
          </Button>
          <Button
            colorScheme={scope === 'all' ? 'blue' : undefined}
            onClick={() => {
              // setUserType('all')
            }}
          >
            全ての提出
          </Button>
        </Wrap>
      )}
      <TableContainer mb={8}>
        <Table>
          <Thead>
            <Tr>
              <Th>提出日時</Th>
              <Th>問題</Th>
              <Th>ユーザー</Th>
              <Th>結果</Th>
              <Th>詳細</Th>
            </Tr>
            {submissions.map((submission) => {
              return (
                <Tr key={submission.id}>
                  <Td>{submission.createdAt}</Td>
                  <Td>
                    <Link
                      as={ReactLink}
                      to={`/problems/${problem.id}`}
                      color={'blue.600'}
                    >
                      {problem.title}
                    </Link>
                  </Td>
                  <Td>{submission.user.screenName}</Td>
                  <Td>
                    <SubmissionStatusBadge>
                      {submission.status as SubmissionStatus}
                    </SubmissionStatusBadge>
                  </Td>
                  <Td>
                    <Link
                      as={ReactLink}
                      to={`/problems/${problem.id}/submissions/${submission.id}`}
                      color={'blue.600'}
                    >
                      詳細
                    </Link>
                  </Td>
                </Tr>
              )
            })}
          </Thead>
        </Table>
      </TableContainer>
      {submissions.length > 0 && scope === 'all' && (
        <Box pt={6}>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        </Box>
      )}
    </Stack>
  )
}
