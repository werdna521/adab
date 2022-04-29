import React, { FC } from 'react'

import { RegisterScreen } from './register'
import {
  NavigationProvider,
  createStackNavigator,
  createTheme,
} from '../infrastructure/navigation'
import { COLORS } from './colors'
import { RegisterUseCase } from '../domain/usecase/auth'

export enum Screens {
  REGISTER = 'Register',
}

const Stack = createStackNavigator()
const theme = createTheme((defaultTheme) => ({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: COLORS.BACKGROUND,
  },
}))

const registerUseCase = new RegisterUseCase()

const AppNavigation: FC = () => {
  return (
    <NavigationProvider theme={theme}>
      <Stack.Navigator
        initialRouteName={Screens.REGISTER}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Screens.REGISTER}>
          {() => <RegisterScreen registerUseCase={registerUseCase} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationProvider>
  )
}

export default AppNavigation
