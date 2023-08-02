import { Progress, ProblemDifficulty } from './core/type-challenges-judge'
import { calculateUserProgress, findProblemCounts } from './query/querier'

type ProblemCount = {
  difficulty: string
  problemCount: number
}

type ChallengeResult = {
  difficulty: string
  acceptedCount: number
  wrongAnswerCount: number
}

type ProgressMap = { [D in ProblemDifficulty]: Progress }

function convertToProgressMap(
  problemCounts: ProblemCount[],
  challengeResults: ChallengeResult[]
): ProgressMap {
  const countMap = problemCounts.reduce(
    (sum, item) => ({ ...sum, [item.difficulty]: item }),
    {} as { [D in ProblemDifficulty]?: ProblemCount }
  )
  const resultMap = challengeResults.reduce(
    (sum, item) => ({ ...sum, [item.difficulty]: item }),
    {} as { [D in ProblemDifficulty]?: ChallengeResult }
  )

  const progressMap: ProgressMap = {
    warm: {
      difficulty: 'warm',
      totalCount: countMap['warm']?.problemCount ?? 0,
      acceptedCount: resultMap['warm']?.acceptedCount ?? 0,
      wrongAnswerCount: resultMap['warm']?.wrongAnswerCount ?? 0,
    },
    easy: {
      difficulty: 'easy',
      totalCount: countMap['easy']?.problemCount ?? 0,
      acceptedCount: resultMap['easy']?.acceptedCount ?? 0,
      wrongAnswerCount: resultMap['easy']?.wrongAnswerCount ?? 0,
    },
    medium: {
      difficulty: 'medium',
      totalCount: countMap['medium']?.problemCount ?? 0,
      acceptedCount: resultMap['medium']?.acceptedCount ?? 0,
      wrongAnswerCount: resultMap['medium']?.wrongAnswerCount ?? 0,
    },
    hard: {
      difficulty: 'hard',
      totalCount: countMap['hard']?.problemCount ?? 0,
      acceptedCount: resultMap['hard']?.acceptedCount ?? 0,
      wrongAnswerCount: resultMap['hard']?.wrongAnswerCount ?? 0,
    },
    extreme: {
      difficulty: 'extreme',
      totalCount: countMap['extreme']?.problemCount ?? 0,
      acceptedCount: resultMap['extreme']?.acceptedCount ?? 0,
      wrongAnswerCount: resultMap['extreme']?.wrongAnswerCount ?? 0,
    },
  }

  return progressMap
}

export async function fetchUserProgress(
  db: D1Database,
  user: { userId: string } | undefined
): Promise<ProgressMap> {
  const [{ results: problemCounts }, { results: progressList }] =
    await Promise.all([
      findProblemCounts(db),
      user
        ? calculateUserProgress(db, { userId: user.userId })
        : { results: [] as ChallengeResult[] },
    ])
  const progressMap = convertToProgressMap(
    problemCounts,
    progressList.map((progress) => ({
      ...progress,
      // SQLでsumを使っている影響でnumber | string | nullになっている気がする（実際に返ってくるのはnumber）
      acceptedCount: Number(progress.acceptedCount),
      wrongAnswerCount: Number(progress.wrongAnswerCount),
    }))
  )

  return progressMap
}
