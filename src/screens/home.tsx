import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { BottomTabsParamList } from '../components/navigator/bottom-tabs'
import { RootStackParamList } from '../components/navigator/root'
import { Screen } from '../constants/enums'
import { useAuth } from '../lib/auth/auth-context'

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, Screen.HOME>,
  NativeStackNavigationProp<RootStackParamList>
>

const HomeScreen: FC = () => {
  const { user } = useAuth()
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const handleJoin = () => navigation.navigate(Screen.JOIN_ROOM)
  const handleCreate = () => navigation.navigate(Screen.CREATE_ROOM)

  return (
    <View style={styles.container}>
      <Text>Hello, {user.displayName}</Text>
      <Button onPress={handleCreate} title="Create room" />
      <Button onPress={handleJoin} title="Join room" />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
