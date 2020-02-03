import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCp5paroBM4bRAa6bj3FUjyc2gRpl-fDqo',
  authDomain: 'crown-db-ff3c7.firebaseapp.com',
  databaseURL: 'https://crown-db-ff3c7.firebaseio.com',
  projectId: 'crown-db-ff3c7',
  storageBucket: 'crown-db-ff3c7.appspot.com',
  messagingSenderId: '593917527836',
  appId: '1:593917527836:web:2159c79d4321b621a81cd9',
  measurementId: 'G-4KHDLJ021X',
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
