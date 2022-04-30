import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

import { User } from '~/domain/model'
import type { RegisterDTO } from '~/domain/repository/auth-repository'
import Firebase from '~/infrastructure/firebase'
import AuthService from './auth-service'

export default class FirebaseAuthService implements AuthService {
  private firebase: Firebase

  public constructor(firebase: Firebase) {
    this.firebase = firebase
  }

  public async signUp(registerDTO: RegisterDTO): Promise<User> {
    const userCredential = await this.createUser(registerDTO)
    return await this.storeUser(userCredential)
  }

  private async createUser(registerDTO: RegisterDTO): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this.firebase.auth,
      registerDTO.email,
      registerDTO.password,
    )
    await updateProfile(userCredential.user, {
      displayName: registerDTO.displayName,
    })
    return userCredential
  }

  private async storeUser(userCredential: UserCredential): Promise<User> {
    const currentUser = userCredential.user
    const currentTimestamp = Timestamp.now()
    const user: User = {
      uid: currentUser.uid,
      displayName: currentUser.displayName!,
      email: currentUser.email!,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    }
    await setDoc(doc(this.firebase.db, 'user', user.uid), user)
    return user
  }
}
