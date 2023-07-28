import { ProblemResultDocument } from '../../../src/model'
import { userProblemResult } from '../../utils/firestore-reference'

/**
 * 問題ごとの判定結果を更新する
 */
export async function updateProblemResult(
  userId: string,
  result: ProblemResultDocument
) {
  if (result.problem_id === undefined) return

  const resultRef = userProblemResult(userId, result.problem_id)
  const currentResult = await resultRef.get()

  // 登録されてないとき→登録する、登録されているとき→正解ならば登録する
  if (!currentResult.exists || result.status === 'Accepted') {
    await resultRef.set(result)
  }
}
