import { ProblemDifficulty, ProblemResultDocument } from '../model'
import { ProblemCounts } from '../use-cases/count-problems-by-difficulty'

export type Progress = {
  difficulty: string
  acceptedCount: number
  wrongAnswerCount: number
  totalCount: number
}

function defaultProgress(difficulty: string, totalCount: number): Progress {
  return { difficulty, totalCount, acceptedCount: 0, wrongAnswerCount: 0 }
}

function difficultyToIndex(difficulty: ProblemDifficulty) {
  if (difficulty === 'warm') return 0
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  if (difficulty === 'hard') return 2
  return 3
}

export function convertToProgress(
  counts: ProblemCounts,
  results: ProblemResultDocument[]
): Progress[] {
  const progressList = [
    defaultProgress('easy', counts.warm + counts.easy),
    defaultProgress('medium', counts.medium),
    defaultProgress('hard', counts.hard),
    defaultProgress('extreme', counts.extreme),
  ]

  results.forEach((result) => {
    const index = difficultyToIndex(result.problem_difficulty)
    const prop =
      result.status === 'Accepted' ? 'acceptedCount' : 'wrongAnswerCount'
    progressList[index][prop]++
  })

  return progressList
}
