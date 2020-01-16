const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.calcRecBudget = functions.firestore
  .document('{user}/Budget')
  .onWrite((change, context) => { 
  		const budget = change.after.exists ? change.after.data() : null;
  		console.log(budget.overallBudget);
  });