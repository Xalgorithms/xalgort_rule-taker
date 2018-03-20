import * as api from '../api';
import * as types from '../constants/types';
import composeInvoiceUBL from '../api/ubl';

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

export function getInvoice(i) {
  return (dispatch) => {
    api.getInvoice(i.url, (data) => {
      dispatch({
        type: types.INVOICE_FETCHED,
        data: JSON.parse(data.content),
      });
    })
  };
};