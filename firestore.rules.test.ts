import * as fs from 'fs'
import { collectionName as CN, UnvalidatedSubmission } from './app/model'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { describe, it, beforeEach } from 'vitest'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'

const testEnv = await initializeTestEnvironment({
  projectId: 'demo-type-challenges-judge',
  firestore: {
    rules: fs.readFileSync('firestore.rules', 'utf-8'),
    host: 'localhost',
    port: 8080,
  },
})

const uid = 'test_user'
const authenticatedContext = testEnv.authenticatedContext(uid)
const userDB = authenticatedContext.firestore()

const unauthenticatedContext = testEnv.unauthenticatedContext()
const guestDB = unauthenticatedContext.firestore()

beforeEach(async () => {
  await testEnv.clearFirestore()
})

describe('ユーザー登録', () => {
  it('認証済みでなければ登録できないこと', async () => {
    const docRef = doc(guestDB, CN.users, uid)
    await assertFails(setDoc(docRef, { screenName: 'test' }))
  })

  it('認証済みであれば登録できること', async () => {
    const docRef = doc(userDB, CN.users, uid)
    await assertSucceeds(setDoc(docRef, { screenName: 'test' }))
  })

  it('ユーザー名が39文字であれば登録できること', async () => {
    const docRef = doc(userDB, CN.users, uid)
    await assertSucceeds(setDoc(docRef, { screenName: 'a'.repeat(39) }))
  })

  it('ユーザー名が40文字であれば登録できないこと', async () => {
    const docRef = doc(userDB, CN.users, uid)
    await assertFails(setDoc(docRef, { screenName: 'a'.repeat(40) }))
  })
})

describe('提出の登録', () => {
  const validSubmissionData: UnvalidatedSubmission = {
    status: 'Judging',
    problemId: 'problem_id',
    code: 'code',
    codeLength: 4,
    createdAt: serverTimestamp() as Timestamp,
  }

  it('認証済みでなければ登録できないこと', async () => {
    const collectionRef = collection(guestDB, CN.users, uid, CN.submissions)
    await assertFails(addDoc(collectionRef, validSubmissionData))
  })

  it('自分のユーザードキュメントに提出を追加できること', async () => {
    const collectionRef = collection(userDB, CN.users, uid, CN.submissions)
    await assertSucceeds(addDoc(collectionRef, validSubmissionData))
  })

  it('他の人のユーザードキュメントに提出を追加できないこと', async () => {
    const otherUid = 'test_user_2'
    const collectionRef = collection(userDB, CN.users, otherUid, CN.submissions)
    await assertFails(addDoc(collectionRef, validSubmissionData))
  })
})
