import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
// import 'firebase/firestore' // <- needed if using firestore

import rootReducer from '../reducers';

const firebaseConfig = {
  apiKey: 'AIzaSyDJg6JlnlyfNnQXt6byrVXYOEm_5MJ6m-Y',
  authDomain: 'lichen-ui.firebaseapp.com',
  databaseURL: 'https://lichen-ui.firebaseio.com',
  projectId: 'lichen-ui',
  storageBucket: 'lichen-ui.appspot.com',
  messagingSenderId: '211290057486',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  enableLogging: true,
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// initialize firestore
// firebase.firestore() // <- needed if using firestore

export const configureStore = () => {
  const middleWare = [];
  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });
  middleWare.push(loggerMiddleware);

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    // reduxFirestore(firebase) // <- needed if using firestore
    applyMiddleware(...middleWare),
  )(createStore);

  const initialState = {};
  const store = createStoreWithFirebase(rootReducer, initialState);

  return store;
};
