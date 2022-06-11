import admin from 'firebase-admin'

admin.initializeApp()

module.exports.addMessage = require('./functions/add-message')
module.exports.makeUppercase = require('./functions/make-uppercase')
module.exports.addSubmissionProblem = require('./functions/add-submission-problem')
