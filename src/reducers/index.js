import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';

import sessionReducer from './session';
import invoiceReducer from './invoice';


const rootReducer = combineReducers({
  firebase,
  sessionState: sessionReducer,
  firestore,
  invoices: invoiceReducer,
});

export default rootReducer;
