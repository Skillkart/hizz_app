import {initializeApp} from 'firebase/app';

import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBpWhpWODEZA2Ma5AZpmKIo64UCxbW9kKQ',
  authDomain: 'skillkartapp-72885.firebaseapp.com',
  projectId: 'skillkartapp-72885',
  storageBucket: 'skillkartapp-72885.appspot.com',
  messagingSenderId: '628177481976',
  appId: '1:628177481976:web:1cb4be4d0626696d30cb0d',
  measurementId: 'G-KFVW20RM2H',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const analytics = getAnalytics(app);
