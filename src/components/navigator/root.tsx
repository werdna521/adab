import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Screen } from '../../constants/enums'
import { useAuth } from '../../lib/auth/auth-context'
import CreateRoomScreen from '../../screens/create-room'
import JoinRoomScreen from '../../screens/join-room'
import LoginScreen from '../../screens/login'
import RegisterScreen from '../../screens/register'
import RoomScreen from '../../screens/room'
import BottomTabs from './bottom-tabs'

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  [Screen.LOGIN]: undefined
  [Screen.REGISTER]: undefined
  [Screen.BOTTOM_TABS]: undefined
  [Screen.CREATE_ROOM]: undefined
  [Screen.JOIN_ROOM]: undefined
  [Screen.ROOM]: {
    roomId: string
  }
}

const RootNavigator: FC = () => {
  const { isAuthUnknown, isLoggedIn, isLoggedOut } = useAuth()

  if (isAuthUnknown) return null

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Screen.LOGIN}
    >
      {isLoggedOut && (
        <>
          <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Screen.REGISTER} component={RegisterScreen} />
        </>
      )}
      {isLoggedIn && (
        <>
          <Stack.Screen name={Screen.BOTTOM_TABS} component={BottomTabs} />
          <Stack.Screen
            name={Screen.CREATE_ROOM}
            component={CreateRoomScreen}
          />
          <Stack.Screen name={Screen.JOIN_ROOM} component={JoinRoomScreen} />
          <Stack.Screen name={Screen.ROOM} component={RoomScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
