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

import config from '../config';

const { DOCUMENT_SERVICE, SCHEDULE_SERVICE, EVENTS_SERVICE } = config;

export function addInvoice (invoice, uid, callback) {
  fetch(`${DOCUMENT_SERVICE}/documents`, {
    body: invoice,
    headers: {
      // No content-type should be specified, so that boundary is added automatically
      'X-Lichen-Token': uid,
    },
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function getInvoice(path, callback) {
  fetch(`${DOCUMENT_SERVICE}${path}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function scheduleInvoice(name, payload, callback) {
  fetch(`${SCHEDULE_SERVICE}/actions`, {
    body: JSON.stringify({
      name,
      payload,
    }),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function subscribe(topics, callback) {
  fetch(`${EVENTS_SERVICE}/subscriptions`, {
    body: JSON.stringify({
      topics
    }),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};
