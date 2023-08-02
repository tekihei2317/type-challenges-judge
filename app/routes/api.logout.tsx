import { ActionArgs, json } from '@remix-run/cloudflare'
import { destroySession, getSession } from '../../server/utils/session'

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return json(
    {},
    {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    }
  )
}
