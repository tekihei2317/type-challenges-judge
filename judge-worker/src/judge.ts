import {
  CompilerOptions,
  ScriptTarget,
  ModuleKind,
  CompilerHost,
  createSourceFile,
  createProgram,
  getPreEmitDiagnostics,
  flattenDiagnosticMessageText,
} from 'typescript'
import { es5Lib } from './typescript-lib'

type Diagnostic = string

// https://github.com/type-challenges/type-challenges/blob/main/utils/index.d.ts
const typeChallengeUtils = `export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends (1 & T) ? true : false
export type NotAny<T> = true extends IsAny<T> ? false : true

export type Debug<T> = { [K in keyof T]: T[K] }
export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false
export type ExpectValidArgs<FUNC extends (...args: any[]) => any, ARGS extends any[]> = ARGS extends Parameters<FUNC>
  ? true
  : false

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never`

/**
 * 回答とテストケースをコンパイルして、メッセージを返却する
 */
export function compileSolution(
  solution: string,
  testCase: string
): Diagnostic[] {
  const sourceFileName = 'solution.ts'
  const libFileName = 'lib.es5.d.ts'
  const tcUtilsFileName = 'type-challenge-utils.ts'

  const options: CompilerOptions = {
    noImplicitAny: true,
    strictNullChecks: true,
    target: ScriptTarget.ES5,
    module: ModuleKind.CommonJS,
    noEmit: true,
  }
  const compilerHost: CompilerHost = {
    getSourceFile: (fileName: string) => {
      if (fileName === sourceFileName) {
        return createSourceFile(
          fileName,
          [solution, testCase].join('\n'),
          ScriptTarget.ES5
        )
      }
      if (fileName === libFileName) {
        return createSourceFile(fileName, es5Lib, ScriptTarget.ES5)
      }
      if (fileName === tcUtilsFileName) {
        return createSourceFile(fileName, typeChallengeUtils, ScriptTarget.ES5)
      }
      return undefined
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeFile: () => {},
    getCurrentDirectory: () => '',
    getCanonicalFileName: (fileName: string) => fileName,
    useCaseSensitiveFileNames: () => false,
    getNewLine: () => '\n',
    fileExists: (fileName: string) => {
      return fileName === sourceFileName
    },
    readFile: () => '',
    getDefaultLibFileName: () => libFileName,
    resolveModuleNames: () => {
      return [{ resolvedFileName: tcUtilsFileName }]
    },
  }

  const program = createProgram([sourceFileName], options, compilerHost)
  const diagnostics = getPreEmitDiagnostics(program)

  return diagnostics.map((diagnostic) =>
    flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  )
}
