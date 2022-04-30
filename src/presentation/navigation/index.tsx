import React, { FC } from 'react'

import { RegisterScreen } from '~/presentation/ui/register'
import NavigationProvider from './provider'
import { createStackNavigator } from './stack'
import { createTheme } from './theme'
import { COLORS } from '../colors'
import { RegisterUseCase } from '~/interactor/auth'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export enum Screens {
  REGISTER = 'Register',
}

export type UseCases = {
  register: RegisterUseCase
}

type RootStackParamList = {
  [Screens.REGISTER]: undefined
}

export type Screen<Props, RouteName extends keyof RootStackParamList> = FC<
  Props & {
    route: RouteProp<RootStackParamList>
    navigation: NativeStackNavigationProp<ParamListBase, RouteName>
  }
>

const Stack = createStackNavigator()
const theme = createTheme((defaultTheme) => ({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: COLORS.BACKGROUND,
  },
}))

type Props = {
  useCases: UseCases
}

const AppNavigation: FC<Props> = ({ useCases }) => {
  return (
    <NavigationProvider theme={theme}>
      <Stack.Navigator
        initialRouteName={Screens.REGISTER}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Screens.REGISTER}>
          {(props: any) => (
            <RegisterScreen
              registerUseCase={useCases.register}
              route={props.route}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationProvider>
  )
}

export default AppNavigation
