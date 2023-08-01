import { json, LoaderArgs } from '@remix-run/cloudflare'
import { LiveReload, Outlet, Scripts, useLoaderData } from '@remix-run/react'
import { AppProvider } from './components/AppProvider'
import { DefaultLayout } from './components/DefaultLayout'

export function loader({ context }: LoaderArgs) {
  return json({ user: context.user })
}

export default function Root() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/src/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>type-challenges-judge</title>
        <meta property="og:site" content="website" />
        <meta
          property="og:url"
          content="https://type-challenges-judge.web.app"
        />
        <meta property="og:title" content="type-challenges-judge" />
        <meta
          property="og:description"
          content="type-challenges-judgeは、TypeScriptの型を楽しく学ぶためのオンラインジャッジです"
        />
        <meta
          property="og:image"
          content="https://i.gyazo.com/8c2faea152e1beb7a5612a632ed5d948.png"
        />
      </head>
      <body>
        <div id="root">
          <AppProvider user={user}>
            <DefaultLayout>
              <Outlet />
            </DefaultLayout>
          </AppProvider>
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  )
}
