import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useAuth } from '../../lib/auth/auth-context'
import CreateRoomScreen from '../../screens/create-room'
import HomeScreen from '../../screens/home'
import LoginScreen from '../../screens/login'
import RegisterScreen from '../../screens/register'
import RoomScreen from '../../screens/room'

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Home: undefined
  CreateRoom: undefined
  Room: {
    roomId: string
  }
}

const RootNavigator: FC = () => {
  const { isAuthUnknown, isLoggedIn, isLoggedOut } = useAuth()

  if (isAuthUnknown) return null

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {isLoggedOut && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
      {isLoggedIn && (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
          <Stack.Screen name="Room" component={RoomScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
