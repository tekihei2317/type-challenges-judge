import * as fs from 'fs'
import { collectionName } from './src/model'
import { doc, setDoc } from 'firebase/firestore'
import { describe, it } from 'vitest'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'

const testEnv = await initializeTestEnvironment({
  projectId: 'test-project-type-challenges-judge',
  firestore: {
    rules: fs.readFileSync('firestore.rules', 'utf-8'),
  },
})

const uid = 'test_user'
const authenticatedContext = testEnv.authenticatedContext(uid)
const userDB = authenticatedContext.firestore()

const unauthenticatedContext = testEnv.unauthenticatedContext()
const guestDB = unauthenticatedContext.firestore()

describe('ユーザー登録', () => {
  it('認証済みでなければ登録できないこと', () => {
    const docRef = doc(guestDB, collectionName.users, uid)
    assertFails(setDoc(docRef, { screenName: 'test' }))
  })

  it('認証済みであれば登録できること', () => {
    const docRef = doc(userDB, collectionName.users, uid)
    assertSucceeds(setDoc(docRef, { screenName: 'test' }))
  })

  it('ユーザー名が39文字であれば登録できること', () => {
    const docRef = doc(userDB, collectionName.users, uid)
    assertSucceeds(setDoc(docRef, { screenName: 'a'.repeat(39) }))
  })

  it('ユーザー名が40文字であれば登録できないこと', () => {
    const docRef = doc(userDB, collectionName.users, uid)
    assertFails(setDoc(docRef, { screenName: 'a'.repeat(40) }))
  })
})
