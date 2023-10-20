const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
const config = require('../config');

const firebaseConfig = {
  apiKey: config.fbApiKey,
  authDomain: config.fbAuthDomain,
  projectId: config.fbProjectId,
  storageBucket: config.fbStorageBucket,
  messagingSenderId: config.fbMessagingSenderId,
  appId: config.fbAppId,
  measurementId: config.fbMeasurementId,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db;
