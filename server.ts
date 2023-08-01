import { logDevReady } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
import { getSession } from './server/utils/session'

if (process.env.NODE_ENV === 'development') {
  logDevReady(build)
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: async (context) => {
    const session = await getSession(context.request.headers.get('Cookie'))
    const userId = session.get('userId')
    const screenName = session.get('screenName')
    const user =
      userId !== undefined && screenName !== undefined
        ? { userId, screenName }
        : undefined

    return {
      env: context.env,
      user,
    }
  },
  mode: process.env.NODE_ENV,
})
