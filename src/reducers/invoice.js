import * as types from '../constants/types';

const INITIAL_STATE = {
  invoices: [],
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INVOICE_FETCHED: {
      return {
        ...state,
        invoices: [...state.invoices, action.data]
      }
    }
    default: return state;
  }
}

export default sessionReducer;