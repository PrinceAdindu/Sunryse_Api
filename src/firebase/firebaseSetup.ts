import {initializeApp, cert} from "firebase-admin/app";
import {Firestore, getFirestore} from "firebase-admin/firestore"; // Use firebase-admin/firestore for Admin SDK

import config from "../config";

const firebaseAdminConfig = {
  type: "service_account",
  projectId: config.fbProjectId,
  privateKeyId: config.fbPrivateKeyId,
  privateKey: config.fbPrivateKey.replace(/\\n/g, "\n"),
  clientEmail: config.fbClientEmail,
  clientId: config.fbClientId,
  authUri: config.fbAuthUri,
  tokenUri: config.fbTokenUri,
  authProviderX509CertUrl: config.fbAuthProviderX509CertUrl,
  clientX509CertUrl: config.fbClientX509CertUrl,
};

const app = initializeApp({
  credential: cert(firebaseAdminConfig),
});

export const db: Firestore = getFirestore(app);
