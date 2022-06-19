import { ProblemDifficulty } from '../model'
import { fetchProblems } from './fetch-problems'

export type ProblemCounts = {
  [difficulty in ProblemDifficulty]: number
}

const defaultProblemCounts: ProblemCounts = {
  warm: 0,
  easy: 0,
  medium: 0,
  hard: 0,
  extreme: 0,
}

export async function countProblemsByDifficulty(): Promise<ProblemCounts> {
  const problems = await fetchProblems()

  const counts = { ...defaultProblemCounts }
  problems.forEach((problem) => counts[problem.difficulty]++)

  return counts
}
