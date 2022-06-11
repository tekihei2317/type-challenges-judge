// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../firebase-adminsdk.json'

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
})

export const db = getFirestore()
