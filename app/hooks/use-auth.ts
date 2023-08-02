import { createUseAuthHook } from '../lib/authentication'

async function login(body: { idToken: string; screenName: string }) {
  await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

async function logout() {
  await fetch('/api/logout', {
    method: 'POST',
  })
}

export const useAuth = createUseAuthHook({
  login,
  logout,
})
