import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import sessionReducer from './session';


const rootReducer = combineReducers({
  firebase,
  sessionState: sessionReducer,
  // firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
