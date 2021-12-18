import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { useAuth } from '../lib/auth/auth-context'

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>

const HomeScreen: FC = () => {
  const { user } = useAuth()
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const handleJoin = () => navigation.navigate('JoinRoom')
  const handleCreate = () => navigation.navigate('CreateRoom')

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
