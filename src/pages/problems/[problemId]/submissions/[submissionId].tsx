import { Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CodeBlock } from '../../../../components/CodeBlock'
import { useAuth } from '../../../../hooks/useAuth'
import { UserSubmissionDocument } from '../../../../model'
import { fetchSubmission } from '../../../../use-cases/fetch-submission'

export const SubmissionPage = () => {
  const [submission, setSubmission] = useState<UserSubmissionDocument>()
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

  return (
    <Stack>
      <CodeBlock code={submission?.code} />
    </Stack>
  )
}
