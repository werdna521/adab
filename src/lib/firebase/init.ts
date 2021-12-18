// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_EIW2jmng3mWUYHNCCWMcGLnyCnlVNHc',
  authDomain: 'adab-30ef6.firebaseapp.com',
  projectId: 'adab-30ef6',
  storageBucket: 'adab-30ef6.appspot.com',
  messagingSenderId: '170549622377',
  appId: '1:170549622377:web:9b71b953b60f2fd5b514f8',
}

// having to do a singleton here because what we did before will cause the
// firebase app to be initialized every time we import this file.
let firebaseApp: FirebaseApp

const getFirebaseApp = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig)
  }
  return firebaseApp
}

const db = () => {
  const app = getFirebaseApp()
  return initializeFirestore(app, {
    ignoreUndefinedProperties: true,
  })
}

const auth = () => {
  const app = getFirebaseApp()
  return getAuth(app)
}

export { db, auth }
