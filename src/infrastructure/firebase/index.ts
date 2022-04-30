import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, initializeFirestore } from 'firebase/firestore'

import { firebaseConfig } from './config'

export default class Firebase {
  private app: FirebaseApp
  public db: Firestore
  public auth: Auth

  public constructor(options: FirebaseOptions = firebaseConfig) {
    this.app = initializeApp(options)
    this.db = initializeFirestore(this.app, {
      experimentalForceLongPolling: true,
    })
    this.auth = getAuth(this.app)
  }
}
