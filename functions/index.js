// Copyright 2018 Hayk Pilosyan <hayk.pilos@gmail.com>
// Copyright 2018 Don Kelly <karfai@gmail.com>

// This file is part of Lichen, a functional component of an
// Internet of Rules (IoR).

// ACKNOWLEDGEMENTS
// Funds: Xalgorithms Foundation
// Collaborators: Don Kelly, Joseph Potvin and Bill Olders.

// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License. You may
// obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

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
