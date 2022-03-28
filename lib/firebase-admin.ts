import {
    AppOptions,
    cert,
    getApp,
    getApps,
    initializeApp,
    ServiceAccount,
  } from "firebase-admin/app";
  import { getAuth } from "firebase-admin/auth";
  
  const credentials: ServiceAccount = {
    privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  
  const options: AppOptions = {
    credential: cert(credentials),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };
  
  function createFirebaseAdminApp(config: AppOptions) {
    if (getApps().length === 0) {
      return initializeApp(config);
    } else {
      return getApp();
    }
  }
  
  const firebaseAdmin = createFirebaseAdminApp(options);
  export const adminAuth = getAuth(firebaseAdmin);