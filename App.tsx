import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import CoreAuthRepository from '~/data/auth/auth-repository'
import { CoreGroupRepository } from '~/data/group'
import { FirebaseAuthDataSource } from '~/infrastructure/datasource/auth'
import { FirebaseGroupDataSource } from '~/infrastructure/datasource/group'
import Firebase from '~/infrastructure/firebase'
import { RegisterUseCase } from '~/interactor/auth'
import LoginUseCase from '~/interactor/auth/login-use-case'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'
import { CreateGroupUseCase } from '~/interactor/group'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import { COLORS } from '~/presentation/colors'
import AppNavigation, { UseCases } from '~/presentation/navigation'

const firebase = new Firebase()

const firebaseAuthDataStore = new FirebaseAuthDataSource(firebase)
const firebaseGroupDataStore = new FirebaseGroupDataSource(firebase)

const authRepository = new CoreAuthRepository(firebaseAuthDataStore)
const groupRepository = new CoreGroupRepository(firebaseGroupDataStore)

const registerUseCase = new RegisterUseCase(authRepository)
const validateRegisterDTOUseCase = new ValidateRegisterDTOUseCase()
const loginUseCase = new LoginUseCase(authRepository)
const validateLoginDTOUseCase = new ValidateLoginDTOUseCase()
const subscribeAuthStateUseCase = new SubscribeAuthStateUseCase(authRepository)
const createGroupUseCase = new CreateGroupUseCase(groupRepository)
const getGroupListUseCase = new GetGroupListUseCase(groupRepository)

const useCases: UseCases = {
  register: registerUseCase,
  validateRegisterDTO: validateRegisterDTOUseCase,
  login: loginUseCase,
  validateLoginDTO: validateLoginDTOUseCase,
  subscribeAuthStatus: subscribeAuthStateUseCase,
  createGroup: createGroupUseCase,
  getGroupList: getGroupListUseCase,
}

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.BACKGROUND}
        barStyle="dark-content"
        translucent
        animated
      />
      <AppNavigation useCases={useCases} />
    </>
  )
}

export default App
