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