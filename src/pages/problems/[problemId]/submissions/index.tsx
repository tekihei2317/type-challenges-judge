import {
  Stack,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProblemSubmissionDocument } from '../../../../model'
import { fetchProblemSubmissions } from '../../../../use-cases/fetch-problem-submissions'
import { useOutletContext } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../../components/ProblemLayout'
import { SubmissionStatusBadge } from '../../../../components/SubmissionStatusBadge'

export const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ProblemSubmissionDocument[]>(
    []
  )

  const { problem } = useOutletContext<ProblemLayoutContext>()

  useEffect(() => {
    const fetchData = async () => {
      const submissionsData = await fetchProblemSubmissions(problem.id)
      setSubmissions(submissionsData.slice(0, 20))
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
                <Tr key={submission.id}>
                  <Td>{submission.createdAt.toDate().toLocaleString()}</Td>
                  <Td>{problem.title}</Td>
                  <Td>{submission.user.screenName}</Td>
                  <Td>
                    <SubmissionStatusBadge>
                      {submission.status}
                    </SubmissionStatusBadge>
                  </Td>
                  <Td>{submission.id}</Td>
                </Tr>
              )
            })}
          </Thead>
        </Table>
      </TableContainer>
    </Stack>
  )
}
