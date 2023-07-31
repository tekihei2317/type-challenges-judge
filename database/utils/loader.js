import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROBLEMS_PATH = path.resolve(__dirname, '../../problems.json')

/**
 * @return Quiz
 */
export function loadProblems() {
  const content = fs.readFileSync(PROBLEMS_PATH, { encoding: 'utf-8' })
  const problems = JSON.parse(content)

  return problems
}

loadProblems()
