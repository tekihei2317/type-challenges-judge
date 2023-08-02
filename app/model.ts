export type User = {
  userId: string
  screenName: string
}

export type ProblemDifficulty = 'warm' | 'easy' | 'medium' | 'hard' | 'extreme'

export type Problem = {
  id: string
  title: string
  content: string
  difficulty: ProblemDifficulty
  tests: string
  playgroundUrl: string
}

export type SubmissionStatus = 'Judging' | 'Accepted' | 'Wrong Answer'

export type Submission = {
  id: string
  user: User
  problem: Problem
  code: string
  status: SubmissionStatus
  codeLength: number
  diagnostics?: string[]
  commentary?: string
  createdAt: string
}

export type ProblemResultStatus = 'Accepted' | 'Wrong Answer'
