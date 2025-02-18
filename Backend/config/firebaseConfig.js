const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../key.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function deleteExpiredCodes() {
  try {
    const authCodesCollection = db.collection('authCodes');
    const now = new Date();

    const authCodesSnapshot = await authCodesCollection.get();

    authCodesSnapshot.forEach(async (doc) => {
      const { timestamp } = doc.data();
      
      if (!timestamp) return;
      const codeTimestamp = new Date(timestamp);
      const minutesDifference = (now - codeTimestamp) / (1000 * 60);

      if (minutesDifference > 5) {
        await authCodesCollection.doc(doc.id).delete();
        console.log(`Deleted expired auth code with ID: ${doc.id}`);
      }
    });
  } catch (error) {
    console.error('Error deleting expired auth codes:', error);
  }
}

module.exports = { db, deleteExpiredCodes };