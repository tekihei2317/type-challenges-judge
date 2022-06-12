import admin from 'firebase-admin'

admin.initializeApp()

module.exports.addSubmissionProblem = require('./functions/add-submission-problem')
module.exports.judgeSolution = require('./functions/judge-solution')
