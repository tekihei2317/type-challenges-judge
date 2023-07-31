import path from 'node:path'
import { unstable_dev } from 'wrangler'
import { fileURLToPath } from 'url'
import { loadProblems } from './utils/loader.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const workerPath = path.resolve(__dirname, './seed-worker.ts')
  const worker = await unstable_dev(workerPath, {
    local: true,
    nodeCompat: true,
    config: path.resolve(__dirname, '../wrangler.toml'),
  })

  const quizez = await loadProblems()
  const response = await worker.fetch('/', {
    method: 'POST',
    body: JSON.stringify(quizez),
  })
  console.log(await response.text())
  await worker.stop()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
