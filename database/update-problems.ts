import { D1Database } from '@cloudflare/workers-types/2022-11-30'
import lzs from 'lz-string'
import { Problem } from '../app/model'
import { formatToCode, Quiz } from './utils/type-challenges'

const TYPESCRIPT_PLAYGROUND = 'https://www.typescriptlang.org/play'

function toPlaygroundUrl(code: string, site = TYPESCRIPT_PLAYGROUND): string {
  return `${site}#code/${lzs.compressToEncodedURIComponent(code)}`
}

export async function updateProblems(db: D1Database, quizes: Quiz[]) {
  const statements = quizes
    .filter((quiz) => quiz.difficulty !== 'pending')
    .map((quiz) => {
      if (quiz.difficulty === 'pending') throw new Error()
      const title = quiz.info?.en?.title
      if (title === undefined) {
        throw new Error(`問題${quiz.path}のタイトルがありません`)
      }
      if (quiz.tests === undefined) {
        throw new Error(`問題${quiz.path}のテストがありません`)
      }
      if (quiz.info.en === undefined) {
        throw new Error(`問題${quiz.path}のinfoがありません`)
      }

      const problem: Problem = {
        id: quiz.path,
        title,
        content: quiz.readme.en,
        difficulty: quiz.difficulty,
        tests: quiz.tests,
        playground_url: toPlaygroundUrl(formatToCode(quiz)),
      }

      // TODO: upsertする
      return db
        .prepare(
          'insert into Problem (id, title, content, difficulty, tests, playgroundUrl) values (?, ?, ?, ?, ?, ?);'
        )
        .bind(
          problem.id,
          problem.title,
          problem.content,
          problem.difficulty,
          problem.tests,
          problem.playground_url
        )
    })
  await db.batch(statements)
}
