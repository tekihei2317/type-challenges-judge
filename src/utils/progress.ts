import { ProblemDifficulty, ProblemResultDocument } from '../model'

export type Progress = {
  difficulty: string
  acceptedCount: number
  wrongAnswerCount: number
  totalCount: number
}

function defaultProgress(difficulty: string): Progress {
  return { difficulty, acceptedCount: 0, wrongAnswerCount: 0, totalCount: 10 }
}

function difficultyToIndex(difficulty: ProblemDifficulty) {
  if (difficulty === 'warm') return 0
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  if (difficulty === 'hard') return 2
  return 3
}

export function convertToProgress(
  results: ProblemResultDocument[]
): Progress[] {
  const progressList = [
    defaultProgress('easy'),
    defaultProgress('medium'),
    defaultProgress('hard'),
    defaultProgress('extreme'),
  ]

  results.forEach((result) => {
    const index = difficultyToIndex(result.problem_difficulty)
    const prop =
      result.status === 'Accepted' ? 'acceptedCount' : 'wrongAnswerCount'
    progressList[index][prop]++
  })

  return progressList
}
