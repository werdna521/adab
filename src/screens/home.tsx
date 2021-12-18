import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>

const LoginScreen: FC = () => {
  const handleCreate = () => alert('create')
  const handleJoin = () => alert('join')

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={handleCreate} title="Create room" />
      <Button onPress={handleJoin} title="Join room" />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    width: '80%',
  },
})
