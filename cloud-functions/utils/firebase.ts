// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore'
// eslint-disable-next-line import/no-unresolved
import serviceAccount from '../../firebase-adminsdk.json'

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
})

export const db = getFirestore()
