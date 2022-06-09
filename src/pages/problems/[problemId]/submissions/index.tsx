import {
  Stack,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Flex,
  Button,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ProblemSubmissionDocument } from '../../../../model'
import { fetchProblemSubmissions } from '../../../../use-cases/fetch-problem-submissions'
import { Link as ReactLink, useOutletContext } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../../components/ProblemLayout'
import { SubmissionStatusBadge } from '../../../../components/SubmissionStatusBadge'
import { generatePages, PageType } from '../../../../utils/pagination'
import { countProblemSubmissions } from '../../../../use-cases/count-problem-submissions'

export const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ProblemSubmissionDocument[]>(
    []
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
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
    const fetchData = async () => {
      const [submissionsCount, documents] = await Promise.all([
        countProblemSubmissions(problem.id),
        fetchProblemSubmissions(problem.id, currentPage),
      ])
      setSubmissions(documents)
      setTotalPage(Math.ceil(submissionsCount / 20))

      console.log(submissionsCount)
    }

    fetchData()
  }, [problem.id, currentPage])

  return (
    <Stack pb={24}>
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
                <Tr key={submission.order}>
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
                      to={`/problems/${problem.id}/submissions/${submission.id}}`}
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
      <Flex gap="1">
        {pages.map((page) => (
          <Button
            key={page}
            colorScheme={'blue'}
            variant={page === currentPage ? 'solid' : 'outline'}
            onClick={() => handlePageClick(page)}
          >
            {page === 'LEFT' ? '«' : page === 'RIGHT' ? '»' : page}
          </Button>
        ))}
      </Flex>
    </Stack>
  )
}
