export type Progress = {
  difficulty: string
  acceptedCount: number
  wrongAnswerCount: number
  totalCount: number
}

export type ProgressMap = {
  warm: Progress
  easy: Progress
  medium: Progress
  hard: Progress
  extreme: Progress
}

export function mergeProgress(a: Progress, b: Progress): Progress {
  return {
    difficulty: a.difficulty,
    totalCount: a.totalCount + b.totalCount,
    acceptedCount: a.acceptedCount + b.acceptedCount,
    wrongAnswerCount: a.wrongAnswerCount + b.wrongAnswerCount,
  }
}
