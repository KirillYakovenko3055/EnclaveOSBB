const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

let firebaseApp;
let db;

const connectFirebase = () => {
  if (!firebaseApp) {
    try {
      firebaseApp = initializeApp({
        credential: cert(require('../key.json'))
      });
      db = getFirestore();
      console.log("Connected to Firebase");
    } catch (error) {
      console.error("Firebase connection failed:", error);
      process.exit(1);
    }
  }
  return db;
};

const getFirestoreDB = () => db;

module.exports = { connectFirebase, getFirestoreDB };