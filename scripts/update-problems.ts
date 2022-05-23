import { collectionName, Problem } from './../src/model'
import { db } from './utils/firebase'
import { loadProblems } from './utils/loader'

export async function updateProblems() {
  // TODO:
  const quizez = loadProblems()

  quizez.map((quiz) => {
    if (quiz.difficulty === 'pending') return

    const problem: Problem = {
      id: quiz.path,
      title: quiz.path,
      content: quiz.readme.en,
      difficulty: quiz.difficulty,
    }

    db.collection(collectionName.problems).doc(problem.id).set(problem)
  })
}

updateProblems()
