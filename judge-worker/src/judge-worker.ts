import { findChallengeResult } from '../../server/query/querier'
import { compileSolution } from './judge'

export type JudgeQueueMessage = {
  problemId: string
  userId: string
  submissionId: string
  code: string
  tests: string
}

type MaybeJudgeQueueMessage = {
  [K in keyof JudgeQueueMessage]?: unknown
}

export type JudgeQueue = Queue<JudgeQueueMessage>

function isValidMessage(
  body: MaybeJudgeQueueMessage
): body is JudgeQueueMessage {
  if (typeof body.problemId !== 'string') return false
  if (typeof body.userId !== 'string') return false
  if (typeof body.submissionId !== 'string') return false
  if (typeof body.code !== 'string') return false
  if (typeof body.tests !== 'string') return false
  return true
}

type JudgeStatus = 'Accepted' | 'Wrong Answer'

async function judgeAndSaveResult({
  db,
  message,
}: {
  db: D1Database
  message: JudgeQueueMessage
}) {
  const diagnostics = compileSolution(message.code, message.tests)
  const status: JudgeStatus =
    diagnostics.length === 0 ? 'Accepted' : 'Wrong Answer'

  // 判定の登録
  const createJudgement = db
    .prepare(
      'insert into judgement (submission_id, status, diagnostics) values (?, ?, ?) returning *;'
    )
    .bind(message.submissionId, status, JSON.stringify(diagnostics))

  // 提出のステータス更新
  const updateSubmission = db
    .prepare('update submission set status = ? where id = ?')
    .bind(status, message.submissionId)

  // 挑戦結果の登録・更新
  const challengeResult = await findChallengeResult(db, {
    problemId: message.problemId,
    userId: message.userId,
  })
  const createOrUpdateChallengeResult =
    // 初挑戦の場合は登録する
    challengeResult === null
      ? db
          .prepare(
            'insert into challenge_result (problem_id, user_id, status) values (?, ?, ?)'
          )
          .bind(message.problemId, message.userId, status)
      : // 初挑戦でない場合は、初正解の場合は更新する
      challengeResult.status === 'Wrong Answer' && status === 'Accepted'
      ? db
          .prepare(
            'update challenge_result set status = ? where problem_id = ? and user_id = ?'
          )
          .bind(status, message.problemId, message.userId)
      : null

  await db.batch([
    createJudgement,
    updateSubmission,
    ...(createOrUpdateChallengeResult === null
      ? []
      : [createOrUpdateChallengeResult]),
  ])
}

export interface Env {
  JUDGE_QUEUE: JudgeQueue
  DB: D1Database
}

export const judgeWorker: ExportedHandler<Env, JudgeQueueMessage> = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const body: object = await request.json()

    if (isValidMessage(body)) {
      await env.JUDGE_QUEUE.send(body)
      return new Response('Ok')
    } else {
      return new Response('Invalid body', { status: 200 })
    }
  },

  async queue(batch, env) {
    for (const message of batch.messages) {
      await judgeAndSaveResult({ db: env.DB, message: message.body })
    }
  },
}
