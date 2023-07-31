import { ActionArgs, json } from '@remix-run/cloudflare'
import { writeUser } from '../use-cases/write-user'

export async function action({ request, context }: ActionArgs) {
  // TODO: バリデーション
  const body = (await request.json()) as { userId: string; screenName: string }

  const user = await writeUser(context.env.DB, {
    userId: body.userId,
    screenName: body.screenName,
  })
  return json({ user })
}
