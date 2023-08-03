import { DeepPartial } from 'utility-types'

// https://github.com/type-challenges/type-challenges/blob/main/scripts/types.ts
export interface QuizMetaInfo {
  title: string
  author: {
    name: string
    email: string
    github: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tsconfig?: Record<string, any>
  original_issues: number[]
  recommended_solutions: number[]
  tags: string[]
  related?: string[]
}

export type Difficulty =
  | 'warm'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'extreme'
  | 'pending'

export interface Quiz {
  no: number
  difficulty: Difficulty
  path: string
  readme: Record<string, string>
  template: string
  info: Record<string, DeepPartial<QuizMetaInfo> | undefined>
  tests?: string
  solutions?: {
    code?: string
    readme?: Record<string, string>
  }
}

// type-challenges/type-challengesより引用
function toDivider(text: string) {
  return `/* _____________ ${text} _____________ */\n`
}

export function formatToCode(quiz: Quiz) {
  const codes = [
    toDivider('Your Code Here'),
    `${quiz.template.trim()}\n`,
    toDivider('Test Cases'),
    quiz.tests || '',
  ]

  return codes.join('\n')
}
