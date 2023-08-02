import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyAl93UHoFUQb1wfPhifDNPX1UDZpheWfxI',
  authDomain: 'type-challenges-judge.firebaseapp.com',
  projectId: 'type-challenges-judge',
  storageBucket: 'type-challenges-judge.appspot.com',
  messagingSenderId: '934271547976',
  appId: '1:934271547976:web:9408246fa529a60eb9367d',
  measurementId: 'G-9PK16MDC1L',
})

export const auth = getAuth(app)
export const db = getFirestore(app)

const enableEmulator = ['development', 'test'].includes(
  process.env.NODE_ENV ?? 'development'
)

if (enableEmulator) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
}
