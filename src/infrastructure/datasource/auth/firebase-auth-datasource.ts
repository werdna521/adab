import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import { AuthDataSource } from '~/data/auth'
import { UserAlreadyRegisteredError, ValidationError } from '~/domain/error'
import { User } from '~/domain/model'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import Firebase from '~/infrastructure/firebase'
import { FirebaseAuthErrorCode } from '~/infrastructure/firebase/error-codes'

export default class FirebaseAuthDataSource implements AuthDataSource {
  private firebase: Firebase

  public constructor(firebase: Firebase) {
    this.firebase = firebase
  }

  public async signUp(registerDTO: RegisterDTO): Promise<User> {
    const userCredential = await this.createUser(registerDTO)
    return await this.storeUser(userCredential)
  }

  private async createUser(registerDTO: RegisterDTO): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebase.auth,
        registerDTO.email,
        registerDTO.password,
      )

      await updateProfile(userCredential.user, {
        displayName: registerDTO.displayName,
      })

      return userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE:
            throw new UserAlreadyRegisteredError()
          case FirebaseAuthErrorCode.WEAK_PASSWORD:
            throw new ValidationError({
              password: 'Password needs to be at least 6 characters long',
            })
        }
      }

      throw new UnknownError(error)
    }
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
