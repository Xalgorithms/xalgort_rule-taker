import { invoiceAdd } from '../api';
import * as types from '../constants/types';

export function addInvoice(invoice, uid) {
  const formData = new FormData();
  const payload = `<?xml version="1.0" encoding="UTF-8"?>
  <Invoice>
  </Invoice>
  `;
  formData.append('content', new Blob([payload], { type: 'application/xml' }), "ubl.xml");

  return (dispatch) => {
    invoiceAdd(formData, uid, (data) => {
      dispatch({
        type: types.INVOICE_ADDED,
        data,
      });
    })
  };
};