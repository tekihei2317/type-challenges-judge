import {
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
