import { createCookieSessionStorage } from '@remix-run/cloudflare' // or cloudflare/deno

type SessionData = {
  userId: string
  screenName: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      sameSite: 'lax',
      // TODO:
      secrets: ['s3cret1'],
      secure: true,
    },
  })

export { getSession, commitSession, destroySession }
