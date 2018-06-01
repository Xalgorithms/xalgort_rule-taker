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

const dev = {
  SCHEDULE_SERVICE: 'http://localhost:9000',
  EVENTS_SERVICE: 'http://localhost:4200',
  WS_PATH: 'ws://localhost:8888',
  FIRESTORE: {
    apiKey: 'AIzaSyDJg6JlnlyfNnQXt6byrVXYOEm_5MJ6m-Y',
    authDomain: 'lichen-ui.firebaseapp.com',
    databaseURL: 'https://lichen-ui.firebaseio.com',
    projectId: 'lichen-ui',
    storageBucket: 'lichen-ui.appspot.com',
    messagingSenderId: '211290057486',
  }
};

const prod = {
  SCHEDULE_SERVICE: 'https://35.186.240.217',
  EVENTS_SERVICE: 'https://35.190.19.161',
  WS_PATH: 'wss://35.190.13.201',
  FIRESTORE: {
    apiKey: 'AIzaSyDJg6JlnlyfNnQXt6byrVXYOEm_5MJ6m-Y',
    authDomain: 'lichen-ui.firebaseapp.com',
    databaseURL: 'https://lichen-ui.firebaseio.com',
    projectId: 'lichen-ui',
    storageBucket: 'lichen-ui.appspot.com',
    messagingSenderId: '211290057486',
  }
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  DOCUMENT_SERVICE: 'https://lichen-ui.appspot.com/v1',
  ...config
};