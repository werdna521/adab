import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { Screen } from '../constants/enums'
import { signInWithEmail } from '../lib/firebase/auth'

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Screen.LOGIN
>

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation<LoginScreenNavigationProp>()

  const handleLogin = async () => {
    await signInWithEmail({ email, password })
    alert('Successfully signed in')
  }

  const handleToRegister = () => navigation.navigate(Screen.REGISTER)

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin} title="Login" />
      <Button onPress={handleToRegister} title="Go to Register" />
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
