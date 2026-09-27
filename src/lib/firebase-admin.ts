import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getDatabase, Database } from "firebase-admin/database";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey) {
  // Replace escaped newlines if passed in via env string
  privateKey = privateKey.replace(/\\n/g, "\n");
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
}

const databaseURL =
  process.env.FIREBASE_DATABASE_URL ||
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
  "https://portfolio-35cfd-default-rtdb.asia-southeast1.firebasedatabase.app";

let app: App | undefined;

if (!getApps().length && projectId && clientEmail && privateKey) {
  try {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      databaseURL,
    });
  } catch (e) {
    console.error("Firebase admin init error:", e);
  }
} else if (getApps().length) {
  app = getApps()[0];
}

export const adminDb: Database | null = app ? getDatabase(app) : null;
