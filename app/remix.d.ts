export {}

type User = { userId: string; screenName: string }

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: {
      DB: D1Database
      FIREBASE_PROJECT_ID: string
      PUBLIC_JWK_CACHE_KEY: string
      PUBLIC_JWK_CACHE_KV: KVNamespace
      FIREBASE_AUTH_EMULATOR_HOST: string | undefined
    }
    user: User | undefined
  }
}
