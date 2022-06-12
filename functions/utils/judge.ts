import * as ts from 'typescript'
import * as fs from 'fs'

type Diagnostic = string
type JudgeStatus = 'Accepted' | 'Wrong Answer'

/**
 * 回答とテストケースをコンパイルして、メッセージを返却する
 */
export async function compileSolution(
  solution: string,
  testCase: string
): Promise<Diagnostic[]> {
  const tempFilePath = `temp/${Math.random().toString(32).slice(2)}.ts`
  fs.writeFileSync(tempFilePath, [solution, testCase].join('\n'))

  const options: ts.CompilerOptions = {
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    noEmit: true,
  }
  const program = ts.createProgram([tempFilePath], options)
  const diagnostics = ts.getPreEmitDiagnostics(program)

  fs.unlinkSync(tempFilePath)

  return diagnostics.map((diagnostic) =>
    ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  )
}

export function calculateStatus(diagnostics: Diagnostic[]): JudgeStatus {
  return diagnostics.length > 0 ? 'Accepted' : 'Wrong Answer'
}
