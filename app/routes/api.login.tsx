import { ActionArgs, json } from '@remix-run/cloudflare'
import {
  Auth,
  FirebaseIdToken,
  WorkersKVStoreSingle,
} from 'firebase-auth-cloudflare-workers'
import { commitSession, getSession } from '../server/session'

async function verifyJWT(
  jwt: string,
  env: {
    projectId: string
    cacheKey: string
    cacheKV: KVNamespace
    emulatorHost: string | undefined
  }
): Promise<FirebaseIdToken> {
  const auth = Auth.getOrInitialize(
    env.projectId,
    WorkersKVStoreSingle.getOrInitialize(env.cacheKey, env.cacheKV)
  )
  const token = await auth.verifyIdToken(jwt, {
    FIREBASE_AUTH_EMULATOR_HOST: env.emulatorHost,
  })

  return token
}

type User = {
  userId: string
  screenName: string
}

export async function action({ request, context: { env } }: ActionArgs) {
  // Firebase AuthのIDトークンから、uidを取得する
  const body = (await request.json()) as { idToken: string; screenName: string }
  const firebaseToken = await verifyJWT(body.idToken, {
    projectId: env.FIREBASE_PROJECT_ID,
    cacheKey: env.PUBLIC_JWK_CACHE_KEY,
    cacheKV: env.PUBLIC_JWK_CACHE_KV,
    emulatorHost: env.FIREBASE_AUTH_EMULATOR_HOST,
  })

  // ユーザーをデータベースに登録する
  const user: User = { userId: firebaseToken.uid, screenName: body.screenName }
  const userInDb = await env.DB.prepare('select * from user where userId = ?')
    .bind(user.userId)
    .first<User>()
  if (userInDb === null) {
    await env.DB.prepare('insert into User (userId, screenName) values (?, ?)')
      .bind(user.userId, user.screenName)
      .run()
  }

  // ユーザーをセッションに保存する
  const session = await getSession(request.headers.get('Cookie'))
  session.set('userId', user.userId)
  session.set('screenName', user.screenName)

  return json(
    { user },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  )
}
