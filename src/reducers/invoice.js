import * as types from '../constants/types';

const INITIAL_STATE = {};

function invoiceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INVOICE_FETCHED: {
      return {
        ...state,
        [action.data.id]: action.data.content,
      }
    }
    case types.INVOICE_STATUS_CHANGED: {
      const { id, topic } = action;
      console.log(action);
      return {
        ...state,
        [id]: {
          ...state[id],
          topic,
        },
      }
    }
    default: return state;
  }
}

export default invoiceReducer;