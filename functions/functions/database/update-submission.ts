type JudgeStatus = 'Accepted' | 'Wrong Answer'
type Diagnostic = string

async function updateUserSubmission(
  submissionId: string,
  judgeStatus: JudgeStatus,
  diagnostics: Diagnostic[]
): Promise<void> {
  // TODO:
}

async function updateProblemSubmission(
  submissionId: string,
  judgeStatus: JudgeStatus
): Promise<void> {
  // TODO:
}

/**
 * 提出のステータスを更新する(ユーザー側、問題側)
 */
export async function updateSubmission(
  submissionId: string,
  diagnostics: Diagnostic[]
): Promise<[void, void]> {
  const judgeStatus: JudgeStatus =
    diagnostics.length > 0 ? 'Wrong Answer' : 'Accepted'

  return await Promise.all([
    updateUserSubmission(submissionId, judgeStatus, diagnostics),
    updateProblemSubmission(submissionId, judgeStatus),
  ])
}
