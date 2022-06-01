export type UserDocument = {
  screenName: string
}

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
}

export type SubmissionStatus = 'Judging' | 'Accepted' | 'Wrong Answer'

export type UserSubmissionDocument = {
  id?: string
  code: string
  codeLength: number
  problemId: string
  status: SubmissionStatus
}

export type Submission = {
  id: string
  user: User
  problem: Problem
  code: string
  status: SubmissionStatus
  codeLength: number
  commentary?: string
  // createdAt: Date
}

export type UnvalidatedSubmission = {
  problemId: string
  code: string
  status: 'Judging'
  codeLength: number
  // createdAt: Date
}

export const collectionName = {
  users: 'users',
  problems: 'problems',
  submissions: 'submissions',
}
