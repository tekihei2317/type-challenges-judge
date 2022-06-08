import { collectionName, Problem } from './../src/model'
import { db } from './utils/firebase'
import { loadProblems } from './utils/loader'

export async function updateProblems() {
  const quizez = loadProblems()

  quizez.forEach((quiz) => {
    if (quiz.difficulty === 'pending') return

    const title = quiz.info?.en?.title
    if (title === undefined) return

    const problem: Problem = {
      id: quiz.path,
      title,
      content: quiz.readme.en,
      difficulty: quiz.difficulty,
    }

    db.collection(collectionName.problems).doc(problem.id).set(problem)
  })

  console.log('問題を更新しました')
}
