import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import CoreAuthRepository from '~/data/auth/auth-repository'
import { FirebaseAuthDataSource } from '~/infrastructure/datasource/auth'
import Firebase from '~/infrastructure/firebase'
import { RegisterUseCase } from '~/interactor/auth'
import LoginUseCase from '~/interactor/auth/login-use-case'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import AppNavigation, { UseCases } from '~/presentation/navigation'

const firebase = new Firebase()

const remoteAuthDataStore = new FirebaseAuthDataSource(firebase)

const authRepository = new CoreAuthRepository(remoteAuthDataStore)

const registerUseCase = new RegisterUseCase(authRepository)
const validateRegisterDTOUseCase = new ValidateRegisterDTOUseCase()
const loginUseCase = new LoginUseCase(authRepository)
const validateLoginDTOUseCase = new ValidateLoginDTOUseCase()
const subscribeAuthStateUseCase = new SubscribeAuthStateUseCase(authRepository)

const useCases: UseCases = {
  register: registerUseCase,
  validateRegisterDTO: validateRegisterDTOUseCase,
  login: loginUseCase,
  validateLoginDTO: validateLoginDTOUseCase,
  subscribeAuthStatus: subscribeAuthStateUseCase,
}

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <AppNavigation useCases={useCases} />
    </>
  )
}

export default App
