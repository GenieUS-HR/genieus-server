import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const firebaseCredentials = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

export default admin;
