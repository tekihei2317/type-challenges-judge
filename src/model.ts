import { Timestamp } from 'firebase/firestore'

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
  playground_url: string
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
  createdAt: Timestamp
}

export type UnvalidatedSubmission = {
  problemId: string
  code: string
  status: 'Judging'
  codeLength: number
  createdAt: Timestamp
}

export const collectionName = {
  users: 'users',
  problems: 'problems',
  submissions: 'submissions',
}

// firestore document
export type UserDocument = {
  screenName: string
}

export type UserSubmissionDocument = {
  id?: string
  code: string
  codeLength: number
  problemId: string
  status: SubmissionStatus
  diagnostics?: string[]
  createdAt: Timestamp
}

export type ProblemSubmissionDocument = {
  id?: string
  code: string
  codeLength: number
  status: SubmissionStatus
  user: User
  order: number
  createdAt: Timestamp
}

export type ProblemResultStatus = 'Accepted' | 'Wrong Answer'

export type ProblemResultDocument = {
  problem_id?: string
  status: ProblemResultStatus
  problem_difficulty: ProblemDifficulty
}

export type ProblemDocument = {
  id?: string
  title: string
  content: string
  difficulty: ProblemDifficulty
  tests: string
}

export type ConvertToProbleSubmission = (
  userSubmission: UserSubmissionDocument
) => ProblemSubmissionDocument

export type ProblemSubmissionResource = {
  id?: string
  status: SubmissionStatus
  user: UserDocument
  createdAt: Timestamp
}
