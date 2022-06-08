import {
  Stack,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProblemSubmissionDocument } from '../../../../model'
import { fetchProblemSubmissions } from '../../../../use-cases/fetch-problem-submissions'
import { Link as ReactLink, useOutletContext } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../../components/ProblemLayout'
import { SubmissionStatusBadge } from '../../../../components/SubmissionStatusBadge'

export const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ProblemSubmissionDocument[]>(
    []
  )

  const { problem } = useOutletContext<ProblemLayoutContext>()

  useEffect(() => {
    const fetchData = async () => {
      const documents = await fetchProblemSubmissions(problem.id)
      setSubmissions(documents)
    }

    fetchData()
  }, [problem.id])

  return (
    <Stack>
      <TableContainer>
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
    </Stack>
  )
}
