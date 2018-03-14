// TODO: Move this to config
const DOCUMENT_SERVICE = 'https://lichen-ui.appspot.com/v1/documents';

export function invoiceAdd (invoice, uid, callback) {
  fetch(DOCUMENT_SERVICE, {
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
}