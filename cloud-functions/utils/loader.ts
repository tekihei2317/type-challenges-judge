import path from 'path'
import fs from 'fs'
import { Quiz } from './type-challenges'

const PROBLEMS_PATH = path.resolve(__dirname, '../../problems.json')

export function loadProblems() {
  const content = fs.readFileSync(PROBLEMS_PATH, { encoding: 'utf-8' })
  const problems = JSON.parse(content) as Quiz[]

  return problems
}

loadProblems()
