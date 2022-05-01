import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import CoreAuthRepository from '~/data/auth/auth-repository'
import RemoteAuthDataSource from '~/infrastructure/datasource/auth/remote-auth-datasource'
import FirebaseAuthService from '~/infrastructure/datasource/auth/service/firebase-auth-service'
import Firebase from '~/infrastructure/firebase'
import { RegisterUseCase } from '~/interactor/auth'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import AppNavigation, { UseCases } from '~/presentation/navigation'

const firebase = new Firebase()

const authService = new FirebaseAuthService(firebase)
const remoteAuthDataStore = new RemoteAuthDataSource(authService)
const authRepository = new CoreAuthRepository(remoteAuthDataStore)
const registerUseCase = new RegisterUseCase(authRepository)
const validateRegisterDTOUseCase = new ValidateRegisterDTOUseCase()

const useCases: UseCases = {
  register: registerUseCase,
  validateRegisterDTO: validateRegisterDTOUseCase,
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
