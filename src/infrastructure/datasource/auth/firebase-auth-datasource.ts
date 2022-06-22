import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  UserCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import { AuthDataSource } from '~/data/auth'
import {
  UserAlreadyRegisteredError,
  UserNotRegistered,
  ValidationError,
  WrongCredentialError,
} from '~/domain/error'
import { User } from '~/domain/model'
import {
  AuthStateCallback,
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  Unsubscribe,
} from '~/domain/repository/auth-repository'
import Firebase from '~/infrastructure/firebase'
import { FirebaseAuthErrorCode } from '~/infrastructure/firebase/error-codes'

export default class FirebaseAuthDataSource implements AuthDataSource {
  public constructor(private firebase: Firebase) {}

  public async login(loginDTO: LoginDTO): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.firebase.auth,
        loginDTO.email,
        loginDTO.password,
      )
      return {
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case FirebaseAuthErrorCode.WRONG_PASSWORD:
            throw new WrongCredentialError()
          case FirebaseAuthErrorCode.USER_NOT_FOUND:
            throw new UserNotRegistered()
        }
      }

      throw new UnknownError(error)
    }
  }

  public async signUp(registerDTO: RegisterDTO): Promise<User> {
    const userCredential = await this.createUser(registerDTO)
    return await this.storeUser(userCredential)
  }

  public async logout(): Promise<void> {
    try {
      await signOut(this.firebase.auth)
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  public async changePassword(dto: ChangePasswordDTO): Promise<void> {
    const { oldPassword, newPassword } = dto
    try {
      const user = this.firebase.auth.currentUser
      if (!user) throw new Error('Unauthenticated')

      const credential = EmailAuthProvider.credential(
        this.firebase.auth.currentUser!.email!,
        oldPassword,
      )
      const userCredential = await reauthenticateWithCredential(
        user,
        credential,
      )
      await updatePassword(userCredential.user, newPassword)
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  public async changeName(newName: string): Promise<void> {
    try {
      const currentUser = this.firebase.auth.currentUser
      if (!currentUser) throw new Error('Unauthenticated')

      await updateProfile(currentUser, {
        displayName: newName,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  public subscribeToAuthState(callback: AuthStateCallback): Unsubscribe {
    const unsubscribe = onAuthStateChanged(this.firebase.auth, (user) => {
      if (user) {
        callback({
          user: {
            uid: user.uid,
            displayName: user.displayName!,
            email: user.email!,
          },
          isLoggedIn: true,
        })
        return
      }

      callback({ isLoggedIn: false })
    })
    return unsubscribe
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
    const user = {
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
