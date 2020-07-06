const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.createNewTractor = functions.firestore.document('/queue/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const type = snap.data().type;
      if (type == "tractor") {
      // Access the parameter `{documentId}` with `context.params`
      const telegram = snap.data().telegram
      functions.logger.log('Create New Tractor', context.params.documentId, telegram);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
      functions.firestore.collection('tractor').doc().create({telegram: telegram, containers: []})
    }
    });
