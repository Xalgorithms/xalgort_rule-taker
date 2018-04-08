import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';

import config from '../config';
import rootReducer from '../reducers';

const { FIRESTORE: firebaseConfig } = config;

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: true,
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// initialize firestore
firebase.firestore()

export const configureStore = () => {
  const middleWare = [];
  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });
  middleWare.push(thunk);
  middleWare.push(loggerMiddleware);

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(...middleWare),
  )(createStore);

  const initialState = {};
  const store = createStoreWithFirebase(rootReducer, initialState);

  return store;
};
