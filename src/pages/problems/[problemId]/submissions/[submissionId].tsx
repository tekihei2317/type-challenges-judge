import {
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link as ReactLink, useParams } from 'react-router-dom'
import { CodeBlock } from '../../../../components/CodeBlock'
import { SubmissionStatusBadge } from '../../../../components/SubmissionStatusBadge'
import { useAuth } from '../../../../hooks/useAuth'
import { Submission } from '../../../../model'
import { fetchSubmission } from '../../../../use-cases/fetch-submission'
import { changeToCodeMarkdown } from '../../../../utils/code-block'

export const SubmissionPage = () => {
  const [submission, setSubmission] = useState<Submission>()
  const { submissionId } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const userSubmission = await fetchSubmission(
        user?.userId as string,
        submissionId as string
      )

      if (userSubmission !== undefined) {
        setSubmission(userSubmission)
      }
    }

    fetchData()
  }, [submissionId, user?.userId])

  const tableBorderColor = 'gray.200'

  return (
    <Stack>
      {submission?.code === undefined ? (
        <></>
      ) : (
        <Stack gap={4}>
          <CodeBlock code={changeToCodeMarkdown(submission.code, 'ts')} />
          <TableContainer>
            <Table sx={{ border: '1px solid blak' }}>
              <Tbody>
                <Tr borderTop="1px" borderTopColor={tableBorderColor}>
                  <Th
                    w="48"
                    fontSize={'sm'}
                    borderRight="1px"
                    borderRightColor={tableBorderColor}
                    borderColor={tableBorderColor}
                  >
                    提出日時
                  </Th>
                  <Td textAlign={'center'} borderColor={tableBorderColor}>
                    {/* 2022-06-01 19:58:31 */}
                    TODO
                  </Td>
                </Tr>
                <Tr>
                  <Th
                    fontSize={'sm'}
                    borderRight="1px"
                    borderRightColor={tableBorderColor}
                    borderColor={tableBorderColor}
                  >
                    問題
                  </Th>
                  <Td textAlign={'center'} borderColor={tableBorderColor}>
                    <Link
                      as={ReactLink}
                      to={`/problems/${submission.problem.id}`}
                      color={'blue.600'}
                    >
                      {submission.problem.title}
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Th
                    fontSize={'sm'}
                    borderRight="1px"
                    borderRightColor={tableBorderColor}
                    borderColor={tableBorderColor}
                  >
                    ユーザー
                  </Th>
                  <Td textAlign={'center'} borderColor={tableBorderColor}>
                    {submission.user.screenName}
                  </Td>
                </Tr>
                <Tr>
                  <Th
                    fontSize={'sm'}
                    borderRight="1px"
                    borderRightColor={tableBorderColor}
                    borderColor={tableBorderColor}
                  >
                    ステータス
                  </Th>
                  <Td textAlign={'center'} borderColor={tableBorderColor}>
                    <SubmissionStatusBadge>
                      {submission.status}
                    </SubmissionStatusBadge>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  )
}
