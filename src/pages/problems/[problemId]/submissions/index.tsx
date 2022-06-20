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
import { useEffect, useMemo, useState } from 'react'
import { ProblemSubmissionDocument } from '../../../../model'
import { fetchProblemSubmissions } from '../../../../use-cases/fetch-problem-submissions'
import { Link as ReactLink, useOutletContext } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../../components/ProblemLayout'
import { SubmissionStatusBadge } from '../../../../components/SubmissionStatusBadge'
import { generatePages, PageType } from '../../../../utils/pagination'
import { countProblemSubmissions } from '../../../../use-cases/count-problem-submissions'
import { Pagination } from '../../../../components/Pagination'
import { useAuth } from '../../../../hooks/useAuth'

export const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ProblemSubmissionDocument[]>(
    []
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)

  // 誰の提出を表示するか
  const [userType, setUserType] = useState<'all' | 'me'>('all')
  const { user } = useAuth()

  const pages = useMemo(
    () => generatePages(currentPage, totalPage),
    [currentPage, totalPage]
  )
  const handlePageClick = (page: PageType) => {
    if (page === 'LEFT') {
      setCurrentPage(currentPage - 2)
    } else if (page === 'RIGHT') {
      setCurrentPage(currentPage + 2)
    } else {
      setCurrentPage(page)
    }
  }

  const { problem } = useOutletContext<ProblemLayoutContext>()

  useEffect(() => {
    const userNameFilter =
      userType === 'me' && user ? user.screenName : undefined
    const fetchData = async () => {
      const [submissionsCount, documents] = await Promise.all([
        countProblemSubmissions(problem.id),
        fetchProblemSubmissions(
          problem.id,
          currentPage,
          20,
          totalPage,
          userNameFilter
        ),
      ])
      setSubmissions(documents)
      setTotalPage(Math.ceil(submissionsCount / 20))
    }

    fetchData()
  }, [problem.id, currentPage, totalPage, userType, user])

  return (
    <Stack pb={24}>
      {user && (
        <Wrap p={1}>
          <Button
            colorScheme={userType === 'all' ? 'blue' : undefined}
            onClick={() => setUserType('all')}
          >
            全ての提出
          </Button>
          <Button
            colorScheme={userType === 'me' ? 'blue' : undefined}
            onClick={() => setUserType('me')}
          >
            自分の提出
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
                  <Td>{submission.createdAt.toDate().toLocaleString()}</Td>
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
                      {submission.status}
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
      {submissions.length > 0 && userType === 'all' && (
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
