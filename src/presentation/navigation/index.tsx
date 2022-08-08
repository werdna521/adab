import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp, Theme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Group, Room, User } from '~/domain/model'
import { Member } from '~/domain/model/group'
import { RegisterUseCase } from '~/interactor/auth'
import ChangeNameUseCase from '~/interactor/auth/change-name-use-case'
import ChangePasswordUseCase from '~/interactor/auth/change-password-use-case'
import LoginUseCase from '~/interactor/auth/login-use-case'
import LogOutUseCase from '~/interactor/auth/logout-use-case'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'
import { CreateGroupUseCase } from '~/interactor/group'
import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import JoinGroupUseCase from '~/interactor/group/join-group-use-case'
import RemoveMemberUseCase from '~/interactor/group/remove-member-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'
import {
  SearchRoomUseCase,
  SubscribeToRoomStateUseCase,
} from '~/interactor/room'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'
import EditTranscriptUseCase from '~/interactor/room/edit-transcript-use-case'
import EndMeetingUseCase from '~/interactor/room/end-meeting-use-case'
import GetEndMeetingPermissionUseCase from '~/interactor/room/get-end-meeting-permission-use-case'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import GetScheduledRoomUseCase from '~/interactor/room/get-scheduled-room-list-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import { ChangeNameView } from '~/presentation/ui/change-name'
import { ChangePasswordView } from '~/presentation/ui/change-password'
import { CreateGroupView } from '~/presentation/ui/create-group'
import { CreateRoomView } from '~/presentation/ui/create-room'
import { EditTranscriptView } from '~/presentation/ui/edit-transcript'
import { GroupView } from '~/presentation/ui/group'
import { GroupListView } from '~/presentation/ui/group-list'
import { HomeView } from '~/presentation/ui/home'
import { JoinView } from '~/presentation/ui/join'
import { LoginView } from '~/presentation/ui/login'
import { MemberView } from '~/presentation/ui/member'
import { RegisterView } from '~/presentation/ui/register'
import { RoomView } from '~/presentation/ui/room'
import { ScheduleView } from '~/presentation/ui/schedule'
import { SettingsView } from '~/presentation/ui/settings'
import { TextToSpeechView } from '~/presentation/ui/text-to-speech'

import { COLORS, getColor } from '../colors'
import { useTheme } from '../theme'
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
  JOIN = 'Join',
  EDIT_TRANSCRIPT = 'Edit Transcript',
  SETTINGS = 'Settings',
  TAB = 'Tab',
  GROUP_LIST = 'Group List',
  CHANGE_PASSWORD = 'Change Password',
  CHANGE_NAME = 'Change Name',
  SCHEDULE = 'Schedule',
  TEXT_TO_SPEECH = 'Text To Speech',
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
  removeMember: RemoveMemberUseCase
  createRoom: CreateRoomUseCase
  getGroupDetails: GetGroupDetailsUseCase
  joinGroup: JoinGroupUseCase
  getGroupInviteLink: GetGroupInviteLinkUseCase
  endMeeting: EndMeetingUseCase
  getEndMeetingPermission: GetEndMeetingPermissionUseCase
  editTranscript: EditTranscriptUseCase
  logOut: LogOutUseCase
  searchRoom: SearchRoomUseCase
  changePassword: ChangePasswordUseCase
  changeName: ChangeNameUseCase
  getScheduledRoomList: GetScheduledRoomUseCase
}

type RootStackParamList = {
  [Screens.LOGIN]: undefined
  [Screens.REGISTER]: undefined
  [Screens.CREATE_GROUP]: undefined
  [Screens.TAB]: undefined
  [Screens.GROUP]: {
    groupID: string
  }
  [Screens.ROOM]: {
    room: Room
    group: Group
  }
  [Screens.MEMBER]: {
    members: Record<string, Member>
    groupID: string
  }
  [Screens.CREATE_ROOM]: {
    group: Group
  }
  [Screens.JOIN]: {
    groupID: string
  }
  [Screens.EDIT_TRANSCRIPT]: {
    group: Group
    room: Room
  }
  [Screens.CHANGE_PASSWORD]: undefined
  [Screens.CHANGE_NAME]: undefined
  [Screens.TEXT_TO_SPEECH]: undefined
}

type BottomTabParamList = {
  [Screens.HOME]: undefined
  [Screens.SCHEDULE]: undefined
  [Screens.GROUP_LIST]: undefined
  [Screens.SETTINGS]: undefined
}

export type Screen<Props, RouteName extends keyof RootStackParamList> = FC<
  Props & {
    route: RouteProp<RootStackParamList, RouteName>
    navigation: NativeStackNavigationProp<ParamListBase, RouteName>
    user?: User
  }
>
export type TabScreen<Props, RouteName extends keyof BottomTabParamList> = FC<
  Props & {
    route: RouteProp<BottomTabParamList, RouteName>
    navigation: BottomTabNavigationProp<ParamListBase, RouteName>
    user?: User
  }
>

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
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
  const { isLowVisionMode } = useTheme()
  const filteredTheme: Theme = {
    ...theme,
    colors: Object.entries(theme.colors).reduce(
      (acc, [key, color]) => ({
        ...acc,
        [key]: getColor(color, isLowVisionMode),
      }),
      {},
    ),
  } as Theme

  if (isAuthLoading) return null

  return (
    <NavigationProvider theme={filteredTheme}>
      <Stack.Navigator
        initialRouteName={Screens.LOGIN}
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn && (
          <>
            <Stack.Screen name={Screens.TAB}>
              {() => (
                <Tab.Navigator
                  initialRouteName={Screens.HOME}
                  backBehavior="initialRoute"
                  screenOptions={{
                    tabBarActiveTintColor: getColor('#9bb1fe', isLowVisionMode),
                    tabBarInactiveTintColor: getColor(
                      '#dfdfdf',
                      isLowVisionMode,
                    ),
                    tabBarStyle: {
                      backgroundColor: getColor('white', isLowVisionMode),
                    },
                    headerShown: false,
                  }}
                >
                  <Tab.Screen
                    name={Screens.HOME}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                      ),
                      title: 'Home',
                    }}
                  >
                    {(props: any) => <HomeView user={user} {...props} />}
                  </Tab.Screen>
                  <Tab.Screen
                    name={Screens.SCHEDULE}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar" size={size} color={color} />
                      ),
                      title: 'Schedule',
                    }}
                  >
                    {(props: any) => (
                      <ScheduleView
                        getScheduledRoomList={useCases.getScheduledRoomList}
                        user={user}
                        {...props}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name={Screens.GROUP_LIST}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon
                          name="account-multiple"
                          size={size}
                          color={color}
                        />
                      ),
                      title: 'Group',
                    }}
                  >
                    {(props: any) => (
                      <GroupListView
                        getGroupListUseCase={useCases.getGroupList}
                        user={user}
                        {...props}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name={Screens.SETTINGS}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="cog" size={size} color={color} />
                      ),
                      title: 'Settings',
                    }}
                  >
                    {(props: any) => (
                      <SettingsView
                        logOutUseCase={useCases.logOut}
                        user={user}
                        {...props}
                      />
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CREATE_GROUP}>
              {(props: any) => (
                <CreateGroupView
                  createGroupUseCase={useCases.createGroup}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.GROUP}>
              {(props: any) => (
                <GroupView
                  getRoomListUseCase={useCases.getRoomList}
                  getGroupInviteLinkUseCase={useCases.getGroupInviteLink}
                  getGroupDetailsUseCase={useCases.getGroupDetails}
                  searchRoomUseCase={useCases.searchRoom}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.ROOM}>
              {(props: any) => (
                <RoomView
                  subscribeToRoomStateUseCase={useCases.subscribeToRoomState}
                  publishNewContentUseCase={useCases.publishNewContent}
                  endMeetingUseCase={useCases.endMeeting}
                  getEndMeetingPermissionUseCase={
                    useCases.getEndMeetingPermission
                  }
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.MEMBER}>
              {(props: any) => (
                <MemberView
                  formatMemberWithAccessPropertiesUseCase={
                    useCases.formatMemberWithAccessProperties
                  }
                  updateMemberRoleUseCase={useCases.updateMemberRole}
                  removeMemberUseCase={useCases.removeMember}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CREATE_ROOM}>
              {(props: any) => (
                <CreateRoomView
                  createRoomUseCase={useCases.createRoom}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.JOIN}>
              {(props: any) => (
                <JoinView
                  joinGroupUseCase={useCases.joinGroup}
                  getGroupDetailsUseCase={useCases.getGroupDetails}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.EDIT_TRANSCRIPT}>
              {(props: any) => (
                <EditTranscriptView
                  editTranscriptUseCase={useCases.editTranscript}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CHANGE_PASSWORD}>
              {(props: any) => (
                <ChangePasswordView
                  changePasswordUseCase={useCases.changePassword}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.CHANGE_NAME}>
              {(props: any) => (
                <ChangeNameView
                  changeNameUseCase={useCases.changeName}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.TEXT_TO_SPEECH}>
              {(props: any) => <TextToSpeechView user={user} {...props} />}
            </Stack.Screen>
          </>
        )}
        {isLoggedOut && (
          <>
            <Stack.Screen name={Screens.LOGIN}>
              {(props: any) => (
                <LoginView
                  loginUseCase={useCases.login}
                  validateLoginDTOUseCase={useCases.validateLoginDTO}
                  user={user}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name={Screens.REGISTER}>
              {(props: any) => (
                <RegisterView
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
