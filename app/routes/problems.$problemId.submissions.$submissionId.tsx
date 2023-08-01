import {
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Link,
  Box,
  UnorderedList,
  ListItem,
  Container,
  Text,
} from '@chakra-ui/react'
import {
  Link as ReactLink,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react'
import { CodeBlock } from '../components/CodeBlock'
import { ProblemLayoutContext } from './problems.$problemId'
import { SubmissionStatusBadge } from '../components/SubmissionStatusBadge'
import { fetchSubmission } from '../../server/fetch-submission'
import { changeToCodeMarkdown } from '../utils/code-block'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'

export async function loader({ context, params }: LoaderArgs) {
  invariant(
    typeof params.submissionId == 'string',
    'params.submissionId must be a string'
  )
  const submission = await fetchSubmission(context.env.DB, params.submissionId)

  return json({ submission })
}

export default function SubmissionPage() {
  const { problem } = useOutletContext<ProblemLayoutContext>()
  const { submission } = useLoaderData<typeof loader>()

  const tableBorderColor = 'gray.200'

  return (
    <Container maxW={'container.xl'} mt={8}>
      {submission !== undefined && (
        <Text fontSize="xl" fontWeight={'bold'}>
          提出詳細
        </Text>
      )}
      <Stack mt={4}>
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
                      {submission.createdAt}
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
            <Box>
              <details>
                <summary
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  テストケース
                </summary>
                <CodeBlock code={changeToCodeMarkdown(problem.tests, 'ts')} />
              </details>
              {submission.diagnostics !== undefined &&
                submission.diagnostics.length > 0 && (
                  <Box bg={'gray.100'} p={4} borderRadius={4} mt={2}>
                    {
                      <UnorderedList>
                        {submission.diagnostics.map((diagnostic, index) => (
                          <ListItem key={index}>{diagnostic}</ListItem>
                        ))}
                      </UnorderedList>
                    }
                  </Box>
                )}
            </Box>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
