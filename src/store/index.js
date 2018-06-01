// Copyright 2018 Hayk Pilosyan <hayk.pilos@gmail.com>
// Copyright 2018 Don Kelly <karfai@gmail.com>

// This file is part of Lichen, a functional component of an
// Internet of Rules (IoR).

// ACKNOWLEDGEMENTS
// Funds: Xalgorithms Foundation
// Collaborators: Don Kelly, Joseph Potvin and Bill Olders.

// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License. You may
// obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

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
