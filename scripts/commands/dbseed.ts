import { updateProblems } from '../update-problems'
import { db } from '../utils/firebase'
import { ProblemSubmissionDocument } from '../../src/model'
import { FieldValue } from '@google-cloud/firestore'
import { Timestamp } from 'firebase/firestore'

// 問題データを作成する
function problemSeeder(): Promise<void> {
  return updateProblems()
}

function problemSubmissionSeeder() {
  const dummySubmission: Omit<ProblemSubmissionDocument, 'order'> = {
    id: '1',
    status: 'Judging',
    user: { userId: 'test', screenName: 'test' },
    createdAt: FieldValue.serverTimestamp() as Timestamp, // TODO:
  }

  return Promise.all(
    [...Array(100)].map((_, index) => {
      return db
        .collection('problems')
        .doc('00013-warm-hello-world')
        .collection('submissions')
        .add({ ...dummySubmission, order: index })
    })
  )
}

async function mainSeeder() {
  await Promise.all([problemSeeder(), problemSubmissionSeeder()])
}

mainSeeder()
