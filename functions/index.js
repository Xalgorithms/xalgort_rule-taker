const _ = require('lodash');
const functions = require('firebase-functions');
const firebase = require('firebase');
require('firebase/firestore');

let cfg = {
  apiKey: "AIzaSyDJg6JlnlyfNnQXt6byrVXYOEm_5MJ6m-Y",
  authDomain: "lichen-ui.firebaseapp.com",
  projectId: "lichen-ui"
};

let app = firebase.initializeApp(cfg);
let db = firebase.firestore();

exports.document = functions.https.onRequest((req, res) => {
  let token = _.get(req.body, 'token');
  return db.collection('users').where("token", "==", token).limit(1).get().then((snap) => {
    if (!snap.empty) {
      let doc = _.first(snap.docs);
      let invoices = _.concat(_.get(doc.data(), 'invoices', []), [_.omit(req.body, 'token')]);

      doc.ref.update({ invoices });

      return res.status(200).send({ status: 'ok' });
    } else {
      return res.status(403).send({ status: 'invalid'});
    }
  });
});
