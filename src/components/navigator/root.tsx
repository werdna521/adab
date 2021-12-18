import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import LoginScreen from '../../screens/login'
import RegisterScreen from '../../screens/register'

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  Login: undefined
  Register: undefined
}

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default RootNavigator
