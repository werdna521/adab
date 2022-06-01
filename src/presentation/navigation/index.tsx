import { ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'

import { Group, User } from '~/domain/model'
import { Member } from '~/domain/model/group'
import { RegisterUseCase } from '~/interactor/auth'
import LoginUseCase from '~/interactor/auth/login-use-case'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'
import { CreateGroupUseCase } from '~/interactor/group'
import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'
import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import { CreateGroupScreen } from '~/presentation/ui/create-group'
import { GroupScreen } from '~/presentation/ui/group'
import { HomeScreen } from '~/presentation/ui/home'
import { LoginScreen } from '~/presentation/ui/login'
import { RegisterScreen } from '~/presentation/ui/register'

import { COLORS } from '../colors'
import { CreateRoomScreen } from '../ui/create-room'
import { MemberScreen } from '../ui/member'
import { RoomScreen } from '../ui/room'
import { useAuthSessionViewModel } from './auth-session-view-model'
import NavigationProvider from './provider'
import { createStackNavigator } from './stack'
import { createTheme } from './theme'

export enum Screens {
  LOGIN = 'Login',
  REGISTER = 'Register',
  HOME = 'Home',
  CREATE_GROUP = 'Create Group',
  GROUP = 'Group',
  ROOM = 'Room',
  MEMBER = 'Member',
  CREATE_ROOM = 'Create Room',
}

export type UseCases = {
  register: RegisterUseCase
  validateRegisterDTO: ValidateRegisterDTOUseCase
  login: LoginUseCase
  validateLoginDTO: ValidateLoginDTOUseCase
  subscribeAuthStatus: SubscribeAuthStateUseCase
  createGroup: CreateGroupUseCase
  getGroupList: GetGroupListUseCase
  subscribeToRoomState: SubscribeToRoomStateUseCase
  publishNewContent: PublishNewContentUseCase
  getRoomList: GetRoomListUseCase
  formatMemberWithAccessProperties: FormatMemberWithAccessPropertiesUseCase
  updateMemberRole: UpdateMemberRoleUseCase
}

type RootStackParamList = {
  [Screens.LOGIN]: undefined
  [Screens.REGISTER]: undefined
  [Screens.HOME]: undefined
  [Screens.CREATE_GROUP]: undefined
  [Screens.GROUP]: {
    group: Group
  }
  [Screens.ROOM]: {
    roomID: string
    groupID: string
  }
  [Screens.MEMBER]: {
    members: Record<string, Member>
    groupID: string
  }
  [Screens.CREATE_ROOM]: {
    groupID: string
  }
}

export type Screen<Props, RouteName extends keyof RootStackParamList> = FC<
  Props & {
    route: RouteProp<RootStackParamList, RouteName>
    navigation: NativeStackNavigationProp<ParamListBase, RouteName>
    user?: User
  }
>

const Stack = createStackNavigator()
const theme = createTheme((defaultTheme) => ({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: COLORS.BACKGROUND,
  },
}))

type Props = {
  useCases: UseCases
}

const AppNavigation: FC<Props> = ({ useCases }) => {
  const { user, isAuthLoading, isLoggedIn, isLoggedOut } =
    useAuthSessionViewModel({
      subscribeAuthStateUseCase: useCases.subscribeAuthStatus,
    })

  // TODO: show a cheeky loader animation
  if (isAuthLoading) return null

  return (
    <NavigationProvider theme={theme}>
      <Stack.Navigator
        initialRouteName={Screens.LOGIN}
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn && (
          <>
            <Stack.Screen name={Screens.HOME}>
              {(props: any) => (
                <HomeScreen
                  getGroupListUseCase={useCases.getGroupList}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CREATE_GROUP}>
              {(props: any) => (
                <CreateGroupScreen
                  createGroupUseCase={useCases.createGroup}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.GROUP}>
              {(props: any) => (
                <GroupScreen
                  getRoomListUseCase={useCases.getRoomList}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.ROOM}>
              {(props: any) => (
                <RoomScreen
                  subscribeToRoomStateUseCase={useCases.subscribeToRoomState}
                  publishNewContentUseCase={useCases.publishNewContent}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.MEMBER}>
              {(props: any) => (
                <MemberScreen
                  formatMemberWithAccessPropertiesUseCase={
                    useCases.formatMemberWithAccessProperties
                  }
                  updateMemberRoleUseCase={useCases.updateMemberRole}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CREATE_ROOM}>
              {(props: any) => <CreateRoomScreen user={user} {...props} />}
            </Stack.Screen>
          </>
        )}
        {isLoggedOut && (
          <>
            <Stack.Screen name={Screens.LOGIN}>
              {(props: any) => (
                <LoginScreen
                  loginUseCase={useCases.login}
                  validateLoginDTOUseCase={useCases.validateLoginDTO}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.REGISTER}>
              {(props: any) => (
                <RegisterScreen
                  registerUseCase={useCases.register}
                  validateRegisterDTOUseCase={useCases.validateRegisterDTO}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationProvider>
  )
}

export default AppNavigation
