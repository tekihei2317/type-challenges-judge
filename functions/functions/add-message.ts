import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

module.exports = functions.https.onRequest(async (req, res) => {
  const original = req.query.text
  const writeResult = await admin
    .firestore()
    .collection('messages')
    .add({ original: original })

  res.json({ result: `Message with ID: ${writeResult.id} added.` })
})
