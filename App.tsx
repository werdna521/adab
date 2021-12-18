import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import RootNavigator from './src/components/navigator/root'
import { AuthProvider } from './src/lib/auth/auth-context'
import './src/lib/firebase/init'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
