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
  useLocation,
  useNavigate,
  useOutletContext,
} from '@remix-run/react'
import { SubmissionStatus } from '../model'
import { fetchProblemSubmissions } from '../../server/fetch-problem-submissions'
import { ProblemLayoutContext } from './problems.$problemId'
import { SubmissionStatusBadge } from '../components/SubmissionStatusBadge'
import { generatePages, PageType } from '../utils/pagination'
import { Pagination } from '../components/Pagination'
import { useAuth } from '../hooks/use-auth'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'

export async function loader({ context, params, request }: LoaderArgs) {
  const query = new URL(request.url).searchParams
  invariant(
    typeof params.problemId == 'string',
    'params.problemId must be a string'
  )
  const scope = context.user
    ? query.get('scope') === 'all'
      ? 'all'
      : 'me'
    : 'all'
  const page = query.get('page') !== null ? Number(query.get('page')) : 1
  const pageLimit = 15
  const userId = scope === 'me' ? context.user?.userId : undefined

  const { count, submissions } = await fetchProblemSubmissions(
    context.env.DB,
    params.problemId,
    page,
    pageLimit,
    userId
  )
  const totalPage = Math.ceil(count / pageLimit)

  return json({ submissions, scope, totalPage, currentPage: page })
}

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export default function SubmissionsPage() {
  const { user } = useAuth()
  const { submissions, totalPage, scope } = useLoaderData<typeof loader>()
  const { problem } = useOutletContext<ProblemLayoutContext>()
  const location = useLocation()
  const query = useQuery()
  const queryParams = {
    scope: query.get('scope'),
    page: query.get('page'),
  }
  const currentPage = queryParams.page !== null ? Number(queryParams.page) : 1

  const pages = useMemo(
    () => generatePages(currentPage, totalPage),
    [currentPage, totalPage]
  )

  const currentPath = location.pathname
  const navigate = useNavigate()

  const handlePageClick = (page: PageType) => {
    if (page === 'LEFT') {
      navigate(
        `${currentPath}?${new URLSearchParams({
          scope: 'all',
          page: (currentPage - 2).toString(),
        }).toString()}`
      )
    } else if (page === 'RIGHT') {
      navigate(
        `${currentPath}?${new URLSearchParams({
          scope: 'all',
          page: (currentPage + 2).toString(),
        }).toString()}`
      )
    } else {
      navigate(
        `${currentPath}?${new URLSearchParams({
          scope: 'all',
          page: page.toString(),
        }).toString()}`
      )
    }
  }
  return (
    <Stack pb={24}>
      {user && (
        <Wrap p={1}>
          <Button
            colorScheme={queryParams.scope !== 'all' ? 'blue' : undefined}
            onClick={() =>
              navigate(`${currentPath}?${new URLSearchParams({}).toString()}`)
            }
          >
            自分の提出
          </Button>
          <Button
            colorScheme={queryParams.scope === 'all' ? 'blue' : undefined}
            onClick={() => {
              navigate(
                `${currentPath}?${new URLSearchParams({
                  scope: 'all',
                }).toString()}`
              )
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
        <Box mt={4}>
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
