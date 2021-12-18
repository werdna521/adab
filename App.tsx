import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import RootNavigator from './src/components/navigator/root'
import './src/lib/firebase/init'

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
