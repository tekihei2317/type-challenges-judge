export type User = {
  screenName: string
}

export type ProblemDifficulty = 'warm' | 'easy' | 'medium' | 'hard' | 'extreme'

export type Problem = {
  id: string
  title: string
  content: string
  difficulty: ProblemDifficulty
  githubUrl?: string
  playgroundUrl?: string
}

export type SubmissionStatus = 'Judging' | 'Accepted' | 'Wrong Answer'

export type Submission = {
  id: string
  problemId: string
  user: User
  status: SubmissionStatus
  codeSize: number
  commentary?: string
  createdAt: Date
}

export const collectionName = {
  users: 'users',
  problems: 'problems',
}
