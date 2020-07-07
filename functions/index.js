const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.createNewTractor = functions.firestore
  .document("/queue/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Cloud Firestore.
    var updateTimestamp = snap.ref.update({
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    const type = snap.data().type;
    const telegram = snap.data().telegram;
    const size = snap.data().number;
    if (type === "tractor") {
      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log(
        "Create New Tractor",
        context.params.documentId,
        telegram
      );

      var startTruck = snap.ref.update({
        number: 0
      });

      return db
        .collection("queue")
        .where("type", "==", "trailer")
        .where("number", "==", 1)
        .orderBy("timestamp")
        .limit(size)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach((item, i) => {
            db.collection("queue")
              .doc(item.id)
              .update({
                number: 0
              });
          });
          let con = querySnapshot.docs.map(doc => doc.data());
          return db
            .collection("truck")
            .doc()
            .create({
              telegram: telegram,
              trailers: con.map(el => el.telegram),
              number: size - con.length,
              timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        });
    } else {
      return db
        .collection("truck")
        .where("number", ">", 0)
        .orderBy("number")
        .orderBy("timestamp")
        .limit(1)
        .get()
        .then(querySnapshot => {
          snap.ref.update({
            number: 0
          });
          return querySnapshot.docs.map(doc =>
            doc.ref.update({
              trailers: [...doc.data().trailers, telegram],
              number: doc.data().size - 1
            })
          );
        });
    }
  });
