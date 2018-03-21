import * as types from '../constants/types';

const INITIAL_STATE = {};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INVOICE_FETCHED: {
      return {
        ...state,
        [action.data.id]: action.data.content,
      }
    }
    default: return state;
  }
}

export default sessionReducer;