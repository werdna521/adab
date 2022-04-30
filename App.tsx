import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import CoreAuthRepository from './src/data/auth/auth-repository'
import RemoteAuthDataSource from './src/infrastructure/datasource/auth/remote-auth-datasource'
import FirebaseAuthService from './src/infrastructure/datasource/auth/service/firebase-auth-service'
import Firebase from './src/infrastructure/firebase'
import { RegisterUseCase } from './src/interactor/auth'
import AppNavigation, { UseCases } from './src/presentation/navigation'

const firebase = new Firebase()

const authService = new FirebaseAuthService(firebase)
const remoteAuthDataStore = new RemoteAuthDataSource(authService)
const authRepository = new CoreAuthRepository(remoteAuthDataStore)
const registerUseCase = new RegisterUseCase(authRepository)
const useCases: UseCases = {
  register: registerUseCase,
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
