import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Screen } from '../../constants/enums'
import HomeScreen from '../../screens/home'

const Tab = createBottomTabNavigator()

export type BottomTabsParamList = {
  [Screen.HOME]: undefined
}

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Screen.HOME} component={HomeScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabs
