import {
  JudgeStatus,
  ProblemDifficulty,
  SubmissionStatus,
} from '../core/type-challenges-judge'

type HasProblemDifficulty = {
  difficulty: string
}

export function parseProblem<T extends HasProblemDifficulty>(
  problem: T
): T & { difficulty: ProblemDifficulty } {
  return { ...problem, difficulty: problem.difficulty as ProblemDifficulty }
}

type HasSubmissionStatus = { status: string }

export function parseSubmission<T extends HasSubmissionStatus>(
  submission: T
): T & { status: SubmissionStatus } {
  return {
    ...submission,
    status: submission.status as SubmissionStatus,
  }
}

type HasJudgeStatus = { status: string }

export function parseChallengeResult<T extends HasJudgeStatus>(
  challengeResult: T
): T & { status: JudgeStatus } {
  return {
    ...challengeResult,
    status: challengeResult.status as JudgeStatus,
  }
}

/**
 * 20桁の英数字のID（Firestoreの自動生成IDと同じ形式）を作成する
 */
export function generateAutoId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let autoId = ''
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return autoId
}
