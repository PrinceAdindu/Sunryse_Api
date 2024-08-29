import {initializeApp, firestore} from "firebase/compat/app";
import config from "../config";

const firebaseConfig = {
  apiKey: config.fbApiKey,
  authDomain: config.fbAuthDomain,
  projectId: config.fbProjectId,
  storageBucket: config.fbStorageBucket,
  messagingSenderId: config.fbMessagingSenderId,
  appId: config.fbAppId,
  measurementId: config.fbMeasurementId,
};

initializeApp(firebaseConfig);

const db = firestore();

export default db;
