import { User } from '../model'
import { assertNonNullable } from '../utils/assertion'
import {
  countSubmissionsToProblem,
  findMySubmissionsToProblem,
  findSubmissionsToProblem,
} from './query/querier'

type SubmissionWithUser = {
  id: string
  code: string
  codeLength: number
  status: string
  user: User
  createdAt: String
}

type FetchProblemSubmissionsReturn = {
  count: number
  submissions: SubmissionWithUser[]
}

export async function fetchProblemSubmissions(
  db: D1Database,
  problemId: string,
  page: number,
  pageLimit: number,
  userId: string | undefined
): Promise<FetchProblemSubmissionsReturn> {
  if (userId !== undefined) {
    const { results: submissions } = await findMySubmissionsToProblem(db, {
      problemId,
      userId,
    })

    return {
      count: submissions.length,
      submissions: submissions.map((submission) => ({
        ...submission,
        codeLength: Number(submission.codeLength),
        user: {
          screenName: submission.userScreenName,
          userId: submission.userUserId,
        },
      })),
    }
  }

  const [count, { results: submissions }] = await Promise.all([
    countSubmissionsToProblem(db, { problemId }),
    findSubmissionsToProblem(db, {
      problemId,
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    }),
  ])
  assertNonNullable(count)

  return {
    count: count.submissionCount,
    submissions: submissions.map((submission) => ({
      ...submission,
      codeLength: Number(submission.codeLength),
      user: {
        screenName: submission.userScreenName,
        userId: submission.userUserId,
      },
    })),
  }
}
