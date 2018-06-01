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

import * as api from '../api';
import * as types from '../constants/types';
import composeInvoiceUBL from '../api/ubl';

import config from '../config';
import * as topics from '../constants/topics';

let ws;

export function addInvoice(invoice, uid) {
  const formData = new FormData();
  const payload = composeInvoiceUBL(invoice) ;
  formData.append('content', new Blob([payload], { type: 'application/xml' }), "ubl.xml");

  return (dispatch) => {
    api.addInvoice(formData, uid, (data) => {
      dispatch({
        type: types.INVOICE_ADDED,
        data,
      });
    })
  };
};

export function getInvoice(url) {
  return (dispatch) => {
    const id = url.split('/').pop();
    api.getInvoice(url, (data) => {
      dispatch({
        type: types.INVOICE_FETCHED,
        data: {
          id,
          content: JSON.parse(data.content),
        },
      });
    })
  };
};

export function scheduleInvoice(firestore_id, payload) {
  return (dispatch) => {
    const name = 'document-add';
    api.scheduleInvoice(name, payload, (data) => {
      const schedule_id = data.id;
      // Store the mapping of public id in mongo to id in firestore
      // for future reference
      localStorage.setItem(schedule_id, firestore_id);

      dispatch({
        type: types.INVOICE_SCHEDULED,
        data,
      });
    })
  };
};

export function subscribeToTopics() {
  const all_topics = [topics.DOCUMENTS, topics.EFFECTIVE, topics.APPLICABLE];
  return (dispatch) => {
    api.subscribe(all_topics, (data) => {
      subscribe(data.url, dispatch);
      dispatch({
        type: types.TOPICS_SUBSCRIBED,
        data,
      });
    })
  };
};

export function subscribe(url, dispatch) {
  const ws_url = `${config.WS_PATH}${url}`;
  ws = new WebSocket(ws_url);

  ws.onopen = function()
  {
    console.log('< opened connection');
    ws.send(JSON.stringify({ name: 'confirm', payload: {} }));
  };

  ws.onmessage = function (m)
  {
    console.log(`> received`, m);
    // TODO: Rethink this
    // Id of scheduled document arrives later,
    // so we need timeout here
    setTimeout(() => {
      const data = JSON.parse(m.data);
      const { topic, payload } = data;
      const id = extractId(topic, payload);

      if (topic === 'service' || !id) {
        return;
      }

      dispatch({
        type: types.INVOICE_STATUS_CHANGED,
        id,
        topic
      });
    }, 1000);
  };

  ws.onclose = function()
  {
    // websocket is closed.
    console.log("Connection is closed...");
  };

  function extractId(topic, payload) {
    let id = null;
    if (topic === topics.DOCUMENTS) {
      id = payload;
    }

    if (topic === topics.EFFECTIVE) {
      id = payload.split(':')[0];
    }

    if (topic === topics.APPLICABLE) {
      id = payload.split(':')[0];
    }

    // Transform schedule id to firestore id
    return localStorage.getItem(id);
  }
};

export function disconnect() {
  ws.close();

  return ()=>{}
}

