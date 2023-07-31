import {
  D1Database,
  ExecutionContext,
} from '@cloudflare/workers-types/2022-11-30'
import { updateProblems } from './update-problems'
import { Quiz } from './utils/type-challenges'

type Env = {
  DB: D1Database
}

async function seed(db: D1Database, quizez: Quiz[]) {
  await updateProblems(db, quizez)
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const quizez: Quiz[] = await request.json()
    try {
      await seed(env.DB, quizez)
      return new Response(quizez.length.toString())
    } catch (e) {
      return new Response(e.message)
    }
  },
}
