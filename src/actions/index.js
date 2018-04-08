import * as api from '../api';
import * as types from '../constants/types';
import composeInvoiceUBL from '../api/ubl';

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

export function subscribeToTopics(topics) {
  return (dispatch) => {
    api.subscribe(topics, (data) => {
      subscribe(data.url, dispatch);
      dispatch({
        type: types.TOPICS_SUBSCRIBED,
        data,
      });
    })
  };
};

export function subscribe(url, dispatch) {
  const ws_url = `ws://localhost:8888${url}`;
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

      if (topic === 'service') {
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
    if (topic === 'xadf.compute.documents') {
      id = payload;
    }

    if (topic === 'xadf.compute.effective') {
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

