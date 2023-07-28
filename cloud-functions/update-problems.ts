import lzs from 'lz-string'
import { collectionName, Problem } from './../src/model'
import { db } from './utils/firebase'
import { loadProblems } from './utils/loader'
import { formatToCode } from './utils/type-challenges'

const TYPESCRIPT_PLAYGROUND = 'https://www.typescriptlang.org/play'

function toPlaygroundUrl(code: string, site = TYPESCRIPT_PLAYGROUND): string {
  return `${site}#code/${lzs.compressToEncodedURIComponent(code)}`
}

export async function updateProblems() {
  const quizez = loadProblems()

  quizez.forEach((quiz) => {
    if (quiz.difficulty === 'pending') return

    const title = quiz.info?.en?.title
    if (title === undefined) return
    if (quiz.tests === undefined) {
      console.log(`問題${quiz.path}のテストがありません`)
      return
    }
    if (quiz.info.en === undefined) {
      console.log(`問題${quiz.path}のinfoがありません`)
      return
    }

    const problem: Problem = {
      id: quiz.path,
      title,
      content: quiz.readme.en,
      difficulty: quiz.difficulty,
      tests: quiz.tests,
      playground_url: toPlaygroundUrl(formatToCode(quiz)),
    }

    db.collection(collectionName.problems).doc(problem.id).set(problem)
  })

  console.log('問題を更新しました')
}
