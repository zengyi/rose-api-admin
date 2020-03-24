import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyA8MCRoLJFZS77VMqhze9W4jCZ2M9gAYR0",
  authDomain: "rose-api.firebaseapp.com",
  databaseURL: "https://rose-api.firebaseio.com",
  projectId: "rose-api",
  storageBucket: "rose-api.appspot.com",
  messagingSenderId: "657427823275",
  appId: "1:657427823275:web:bbb78f69b0d6a962e9d5ee"
};

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
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const getUserDocumentRef = async uid => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export default firebase;
