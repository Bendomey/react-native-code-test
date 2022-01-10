import { createContext } from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDsy4YkFMdIwu8KxTxY3_vSgj0q0TyqSgc",
  authDomain: "stayr-test-c9a19.firebaseapp.com",
  projectId: "stayr-test-c9a19",
  storageBucket: "stayr-test-c9a19.appspot.com",
  messagingSenderId: "952463379129",
  appId: "1:952463379129:web:e8e07a01fd6c00a3e26968",
  measurementId: "G-TSQNKTLNFX",
};

export const FirebaseContext = createContext<any>(null);

class Firebase {
  constructor() {
    //check if firebase app is not created and then create it
    if (app.apps.length === 0) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.storage = app.storage();
  }

  /**
   * Auth api for logging in
   * @param {email} email
   * @param {password} password
   */
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  /**
   * Auth api for signing out
   */
  doSignOut = () => this.auth.signOut();
}

export default Firebase;
