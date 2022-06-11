import { updateProblems } from '../update-problems'
import { db } from '../utils/firebase'
import { ProblemSubmissionDocument } from '../../src/model'
import { FieldValue } from '@google-cloud/firestore'
import { Timestamp } from 'firebase/firestore'

// 問題データを作成する
function problemSeeder(): Promise<void> {
  return updateProblems()
}

async function problemSubmissionSeeder(): Promise<void> {
  const dummySubmission: Omit<ProblemSubmissionDocument, 'order'> = {
    id: '1',
    code: 'type HelloWorld = string',
    codeLength: 24,
    status: 'Judging',
    user: { userId: 'test', screenName: 'test' },
    createdAt: FieldValue.serverTimestamp() as Timestamp, // TODO:
  }

  await Promise.all(
    [...Array(100)].map((_, index) => {
      return db
        .collection('problems')
        .doc('00013-warm-hello-world')
        .collection('submissions')
        .add({ ...dummySubmission, order: index })
    })
  )
  console.log('提出シーダーを実行しました')
}

async function mainSeeder() {
  await Promise.all([problemSeeder(), problemSubmissionSeeder()])
}

mainSeeder()
