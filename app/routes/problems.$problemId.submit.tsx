import { Alert, AlertIcon, Button, Stack, Textarea } from '@chakra-ui/react'
import { createSubmission } from '../../server/create-submission'
import { useAuth } from '../hooks/useAuth'
import { useOutletContext, Form } from '@remix-run/react'
import { ProblemLayoutContext } from './problems.$problemId'
import { ActionArgs, redirect } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'

export async function action({ request, context }: ActionArgs) {
  const body = await request.formData()
  invariant(context.user, 'ログインが必要です')

  const userId = context.user.userId
  const problemId = await body.get('problemId')
  const code = await body.get('code')

  invariant(typeof problemId === 'string', 'problemId must be a string')
  invariant(typeof code === 'string', 'code must be a string')

  const submission = await createSubmission(context.env.DB, {
    userId,
    problemId,
    code,
  })

  return redirect(
    // TODO: remove any
    `/problems/${(submission as any).problemId}/submissions/${submission.id}`
  )
}

export default function SubmitPage() {
  const { user } = useAuth()
  const { problem } = useOutletContext<ProblemLayoutContext>()
  const canSubmit = user !== undefined

  return (
    <Stack gap={2}>
      {!user && (
        <Alert status="warning" borderRadius={4}>
          <AlertIcon />
          提出するにはログインしてください
        </Alert>
      )}
      <Form method="POST">
        <input type="hidden" name="problemId" value={problem.id} />
        <Textarea name="code" height={'xs'} />
        <Button type="submit" disabled={!canSubmit} colorScheme={'blue'} mt={4}>
          提出する
        </Button>
      </Form>
    </Stack>
  )
}
