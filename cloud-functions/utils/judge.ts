import * as ts from 'typescript'
import * as tmp from 'tmp'
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
  const tempDir = tmp.dirSync()
  const tempFile = tmp.fileSync({ dir: tempDir.name, postfix: '.ts' })

  // FIXME: いい方法があれば修正する
  // @typ-challenges/utilsが必要なので、tempディレクトリにsymbolic linkを置く
  fs.symlinkSync(
    `${process.cwd()}/node_modules`,
    `${tempDir.name}/node_modules`
  )

  fs.writeFileSync(tempFile.name, [solution, testCase].join('\n'))

  const options: ts.CompilerOptions = {
    noImplicitAny: true,
    strictNullChecks: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    noEmit: true,
  }
  const program = ts.createProgram([tempFile.name], options)
  const diagnostics = ts.getPreEmitDiagnostics(program)

  return diagnostics.map((diagnostic) =>
    ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  )
}

export function calculateStatus(diagnostics: Diagnostic[]): JudgeStatus {
  return diagnostics.length > 0 ? 'Wrong Answer' : 'Accepted'
}
