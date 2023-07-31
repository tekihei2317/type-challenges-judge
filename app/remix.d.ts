export {}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: {
      DB: D1Database
    }
  }
}
