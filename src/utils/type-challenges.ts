import { Problem } from '../model'

export const REPO = 'https://github.com/type-challenges/type-challenges'

export function toGitHubUrl(problem: Problem) {
  const prefix = `${REPO}/blob/main`
  return `${prefix}/questions/${problem.id}/README.md`
}
