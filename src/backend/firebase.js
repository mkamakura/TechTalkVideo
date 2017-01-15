import firebase from 'firebase';
import CONFIG from './config';

const config = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  databaseURL: CONFIG.DATABASE_URL,
  storageBucket: CONFIG.STORAGE_BUCKET,
};
firebase.initializeApp(config);

export default firebase;