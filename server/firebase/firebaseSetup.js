const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
const config = require('../config/config');

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectID,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderID,
  appId: config.firebaseAppID,
  measurementId: config.firebaseMeasurementID,
};

const db = () => {
  firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
};

module.exports = db;
