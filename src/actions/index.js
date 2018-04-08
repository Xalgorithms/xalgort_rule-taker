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
      subscribe(data.url);
      dispatch({
        type: types.TOPICS_SUBSCRIBED,
        data,
      });
    })
  };
};

export function subscribe(url) {
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
    const data = JSON.parse(m.data);
    const { topic, payload } = data;
    if (topic === 'xadf.compute.documents') {
      const id = payload;
      console.log(id);
    }

    if (topic === 'xadf.compute.effective') {
      const id = payload.split(':')[0];
      console.log(id);
    }
  };

  ws.onclose = function()
  {
    // websocket is closed.
    console.log("Connection is closed...");
  };
};

export function disconnect() {
  ws.close();

  return ()=>{}
}

