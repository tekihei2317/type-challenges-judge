import admin from 'firebase-admin'

admin.initializeApp()

module.exports.addMessage = require('./functions/add-message')
module.exports.makeUppercase = require('./functions/make-uppercase')
